import { useState, useEffect} from 'react'
import { Container, Button } from '../components/index'
import { useSelector } from 'react-redux'
import { useNavigate, Link, useParams } from 'react-router-dom'
import databaseServices from '../appwrite/database'
import parse from 'html-react-parser';

function Post() {
    const [post, setPost] = useState([])
    const navigate = useNavigate()
    const {slug} = useParams()
    const userData = useSelector((state) => state.auth.userData);
    const [isAuthor, setIsAuthor] = useState(false);

    useEffect(() => {
        if (slug) {
            databaseServices
                .getPost(slug)
                .then((post) => {
                    if (post){
                        setPost(post);
                        if (userData && post.userId === userData.$id) {
                            setIsAuthor(true);
                        } else {
                            setIsAuthor(false)
                        }
                    } else navigate('/');
                })
                .catch((err) => {
                    console.error("Error fetching post:", err);
                    navigate('/');
                });
        } else {
            console.warn("No slug provided, redirecting to homepage.");
            navigate('/');
        }
    }, [slug, navigate, userData]);    
    

    const deletePost = () => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            if (slug) {
                databaseServices.deletePost(slug).then((status) => {
                    if (status) {
                        databaseServices.deleteFile(post.image);
                        navigate('/');
                    }
                });
            }
        }
    };

  return post ? (
    <div className="py-8">
        <Container>
            <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                <img 
                    src={post.image ? databaseServices.getFilePreview(String(post.image)) : null}
                    alt={post.title || 'Post Image'}
                    className="rounded-xl"
                />
                {isAuthor && (
                    <div className="absolute top-2 right-2 flex space-x-2 z-10">
                        <Link to={`/edit-post/${post.$id}`}>
                            <Button bgColor="bg-green-500" className="px-4 py-2">
                                Edit
                            </Button>
                        </Link>
                        <Button bgColor="bg-red-500" className="px-4 py-2" onClick={deletePost}>
                            Delete
                        </Button>
                    </div>
                )}
            </div>
            <div className="w-full mb-6">
                <h1 className="text-2xl font-bold">{post.title}</h1>
            </div>
            <div className="browser-css">
                {post.content ? parse(post.content) : <p>No content available.</p>}
            </div>
        </Container>
    </div>
  ) : null;
}

export default Post
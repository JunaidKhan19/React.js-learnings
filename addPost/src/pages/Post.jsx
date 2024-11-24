import { useState, useEffect} from 'react'
import { Container, Button } from '../components/index'
import { useSelector } from 'react-redux'
import { useNavigate, Link, useParams } from 'react-router-dom'
import databaseServices from '../appwrite/database'
import parse from 'html-react-parser';

function Post() {
    const [post, setPost] = useState([])
    const navigate = useNavigate()
    const {slug} =useParams()
    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;  

    useEffect(() => {
        if (slug){
            databaseServices.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate('/')
            })
        } else navigate ('/')
    },[slug, navigate]);

    const deletePost = () => {
        if (slug){
            databaseServices.deletePost(slug).then((status) => {
                if (status){
                    databaseServices.deleteFile(post.image);
                    navigate('/');
                }
            })
        }
    }

  return (
    <div className="py-8">
        <Container>
            <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                <image 
                    src={databaseServices.getFilePreview(post.image)}
                    alt={post.title}
                    className='rounded-xl'
                />
                {isAuthor && (
                    <div className="absolute right-6 top-6"> 
                        <Link to={`/edit-post/${post.$id}`}>
                            <Button bgColor="bg-green-500" className="mr-3">
                                Edit
                            </Button>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
            <div className="w-full mb-6">
                <h1 className="text-2xl font-bold">{post.title}</h1>
            </div>
            <div className="browser-css">
                {parse(post.content)}
            </div>
        </Container>
    </div>
  )
}

export default Post
import { useState, useEffect } from 'react'
import databaseServices from '../appwrite/database';
import { Container, PostForm } from '../components/index';
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPost] = useState([])
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug){
            databaseServices.getPost(slug).then((post) => {
                if (post){
                    setPost(post)
                }
            })
        } else {
            navigate('/')
        }
    },[slug, navigate])

  return post? (
    <div className='py-8'>
        <Container>
            <PostForm post={post}/>
        </Container>
    </div>
  ) : null
}

export default EditPost
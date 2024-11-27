import { useState, useEffect } from 'react'
import databaseServices from '../appwrite/database';
import { Container, PostCard } from '../components/index';

function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        databaseServices.getPosts([]).then((posts) => {
            if (posts){
                setPosts(posts.documents)
            }
        })
    },[])

  return (
    <div className='w-full py-8'>
        <Container>
                <div className='flex flex-wrap'>
                    {posts.length > 0 ? (posts.map((post) => (
                            <div key={post.$id}>
                                <PostCard {...post} />
                            </div>
                        ))
                    ) : (
                        <div className="p-2 w-full">
                            <p>No posts found</p>
                        </div>
                    )}
                </div>
            </Container>
    </div>
  )
}

export default AllPosts;
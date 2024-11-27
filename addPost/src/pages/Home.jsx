import { useState, useEffect } from 'react'
import databaseServices from '../appwrite/database';
import { Container, PostCard } from '../components/index';

function Home() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        databaseServices.getPosts().then((posts) => {
            if (posts){
                setPosts(posts.documents)
            }
        })
    },[]) // Empty dependency array ensures this runs only once on mount

    return (
        <div className="w-full py-8 mt-4 text-center">
            <Container>
                <div className='flex flex-wrap'>
                    {posts.length > 0 ? (posts.map((post) => (
                            <div key={post.$id}>
                                <PostCard {...post} />
                            </div>
                        ))
                    ) : (
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Signup or Login to use the app
                            </h1>
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
}

export default Home
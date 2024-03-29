import Post from "../components/Post";
import {useEffect, useState} from "react";

export const HomePage = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/post').then(response => {
            response.json().then(post => {
                setPosts(post);
            });
        });
    }, []);


    return (
        <>
            {
                posts.length > 0 && posts.map(post => (
                    // @ts-ignore
                    <Post title={post.title} summary={post.summary} cover={post.cover} content={post.content} createdAt={post.createdAt} author={post.author.username} _id={post._id} />
                ))
            }
        </>
    );
};

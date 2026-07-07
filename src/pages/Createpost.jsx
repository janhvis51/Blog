import { useState, useEffect } from "react";
import axios from "axios";

function CreatePost({ onPublish, editPost, setEditPost }) {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {

        if (editPost) {

            setTitle(editPost.title);
            setContent(editPost.content);

        }

    }, [editPost]);

    async function publishBlog() {

    

            if (editPost) {

                await axios.put(

    `https://blog-udlp.onrender.com/blogs/${editPost._id}`,

    {
        title,
        content
    },

    {
        headers: {
            authorization:
                localStorage.getItem(
                    "token"
                )
        }
    }

);
                setEditPost(null);

            } else {

               await axios.post(

    "https://blog-udlp.onrender.com/blogs",

    {
        title,
        content
    },

    {
        headers: {
            authorization:
                localStorage.getItem(
                    "token"
                )
        }
    }

);

            }

            setTitle("");
            setContent("");

            if (typeof onPublish === "function") {

                onPublish();

            }

        

    }

    return (

        <div className="create-post">

            <h2>
                {editPost ? "Edit Blog" : "Create Blog"}
            </h2>
           {/* e stands for event */}
            <input
                type="text"
                placeholder="Enter Blog Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
                placeholder="Write your blog..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />

            <button onClick={publishBlog}>
                {editPost ? "Update Blog" : "Publish"}
            </button>

        </div>

    );

}

export default CreatePost;
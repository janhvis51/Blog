import { useState } from "react";
import axios from "axios";

function CreatePost({ onPublish }) {

    // Stores title typed by user
    const [title, setTitle] = useState("");

    // Stores content typed by user
    const [content, setContent] = useState("");

    // Runs when Publish button is clicked
    async function publishBlog() {

        try {

            const response = await axios.post(
                "http://localhost:5000/blogs",
                {
                    title: title,
                    content: content
                }
            );

            console.log(response.data);

            alert("Blog Published Successfully!");

            // Clear the form
            setTitle("");
            setContent("");

            if (typeof onPublish === "function") {
                onPublish();
            }

        } catch (error) {

            console.log(error);

            alert("Something went wrong!");

        }

    }

    return (

        <div className="create-post">

            <h2>Create Blog</h2>

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
                Publish
            </button>

        </div>

    );

}

export default CreatePost;
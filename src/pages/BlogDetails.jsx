import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function BlogDetails() {

    const { id } = useParams();

    const [blog, setBlog] = useState(null);

    useEffect(() => {

        getBlogDetails();

    }, []);

    async function getBlogDetails() {

        try {

            const response =
                await axios.get(
                    `http://localhost:5000/blogs/${id}`
                );

            setBlog(response.data);

        }
        catch (error) {

            console.log(error);

        }

    }

    if (!blog) {

        return <h2>Loading...</h2>;

    }

    return (

        <div className="blog-details">

            <h2>{blog.title}</h2>

            <p>{blog.content}</p>

        </div>

    );

}

export default BlogDetails;
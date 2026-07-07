import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreatePost from "./pages/Createpost";
import { Routes, Route } from "react-router-dom";
import BlogDetails from "./pages/BlogDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { jwtDecode } from "jwt-decode";
function App() {

  const token = localStorage.getItem("token");

  const [blogs, setBlogs] = useState([]);
  const [editPost, setEditPost] = useState(null);
  const [searchBlog, setSearchBlog] = useState("");

  useEffect(() => {
    getBlogs();
  }, []);


let currentUserId =  null;

if (token) {

    const decoded =
        jwtDecode(token);

    currentUserId =
        decoded.userId;

}
  async function getBlogs() {
    try {

      const response =
        await axios.get(
          "https://blog-udlp.onrender.com/blogs"
        );

      setBlogs(response.data);

    } catch (error) {

      console.log(error);

    }
  }

  const filteredBlogs = blogs.filter(

    (blog) =>

      blog.title
        .toLowerCase()
        .includes(
          searchBlog.toLowerCase()
        )

      ||

      blog.content
        .toLowerCase()
        .includes(
          searchBlog.toLowerCase()
        )

  );

  function editBlog(blog) {

    setEditPost(blog);

  }

  async function deleteBlog(id) {

    try {

     await axios.delete(

    `https://blog-udlp.onrender.com/blogs/${id}`,

    {
        headers: {
            authorization:
                localStorage.getItem(
                    "token"
                )
        }
    }

);
      getBlogs();

    } catch (error) {

      console.log(error);

    }

  }

  return (

    <Routes>

      <Route
        path="/signup"
        element={<Signup />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/blogs/:id"
        element={<BlogDetails />}
      />

      <Route
        path="/"
        element={
          <>

            <Navbar
              searchBlog={searchBlog}
              setSearchBlog={setSearchBlog}
            />

            <Home
              blogs={filteredBlogs}
              onDelete={deleteBlog}
              onEdit={editBlog}
               currentUserId={currentUserId}
            />

            {
              token ? (

                <CreatePost
                  onPublish={getBlogs}
                  editPost={editPost}
                  setEditPost={setEditPost}
                  
                />

              ) : (

                <h3>
                  Please Login To Create Blogs
                </h3>

              )
            }

          </>
        }
      />

    </Routes>

  );

}

export default App;
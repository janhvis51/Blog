import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreatePost from "./pages/Createpost";

function App() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getBlogs();
  }, []);

  async function getBlogs() {
    try {
      const response = await axios.get("http://localhost:5000/blogs");
      setBlogs(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteBlog(id) {
    console.log("Attempting to delete blog with ID:", id);
    try {
      if (!id) {
        console.log("deleteBlog called without id");
        return;
      }

      await axios.delete(`http://localhost:5000/blogs/${id}`);
      getBlogs();
    } catch (error) {
      console.log("Delete failed:", error);
      alert("Unable to delete blog. Check the console for details.");
    }
  }

  console.log("Blogs:", blogs);
  return (
    <>
      <Navbar />
      <Home blogs={blogs} onDelete={deleteBlog} />
      <CreatePost onPublish={getBlogs} />
    </>
  );
}

export default App;
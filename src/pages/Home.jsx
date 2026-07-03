import BlogCard from "../components/BlogCard";

function Home({ blogs , onDelete }) {
    return (
        <div>
            {
                blogs.map((blog) => (
                    <BlogCard
                        key={blog._id}
                        title={blog.title}
                        description={blog.content}
                        onDelete={() => onDelete(blog._id)}
                    />
                ))
            }
        </div>
    );
}


export default Home;
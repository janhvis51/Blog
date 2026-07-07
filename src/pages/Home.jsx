import BlogCard from "../components/BlogCard";

function Home({
    blogs,
    onDelete,
    onEdit,
    currentUserId
}) {

    return (

        <div>

            {
                blogs.map((blog) => (

                    <BlogCard
                        key={blog._id}
                        id={blog._id}
                        title={blog.title}
                        description={blog.content}

                        onDelete={() =>
                            onDelete(blog._id)
                        }

                        onEdit={() =>
                            onEdit(blog)
                        }

                        isOwner={
                            blog.userId &&
                            blog.userId.toString() ===
                            currentUserId
                        }

                    />

                ))
            }

        </div>

    );

}

export default Home;
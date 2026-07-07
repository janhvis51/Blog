import { Link } from "react-router-dom";

function BlogCard({
    id,
    title,
    description,
    onDelete,
    onEdit,
    isOwner
}) {

    return (

        <div className="card">

            <h3>{title}</h3>

            <p>{description}</p>

            <Link to={`/blogs/${id}`}>
                Read More
            </Link>

            {
                isOwner && (

                    <>

                        <button
                            type="button"
                            onClick={onDelete}
                        >
                            Delete
                        </button>

                        <button
                            type="button"
                            onClick={onEdit}
                        >
                            Edit
                        </button>

                    </>

                )
            }

        </div>

    );

}

export default BlogCard;
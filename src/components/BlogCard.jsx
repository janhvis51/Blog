function BlogCard({ title, description,onDelete }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{description}</p>
      {/* <button type="button">Read More</button> */}
      <button type = "button" onClick={onDelete} >
        Delete
      </button>
    </div>
  );
}


export default BlogCard;
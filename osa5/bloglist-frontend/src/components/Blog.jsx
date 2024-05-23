import { useState } from "react";

const Blog = ({ blog, updateBlog, removeBlog, user }) => {
  const [shown, setShown] = useState(false);
  const style = {
    border: "solid",
    borderWidth: 1,
    padding: 5,
    margin: 5,
  };

  const handleLike = async (event) => {
    event.preventDefault();
    const likedBlog = { ...blog };
    likedBlog.likes += 1;
    updateBlog(likedBlog);
  };

  const handleRemove = async (event) => {
    event.preventDefault();
    if (window.confirm(`Really remove ${blog.title} by ${blog.author}?`))
      removeBlog(blog);
  };
  return shown ? (
    <div style={style}>
      <div>
        {blog.title}
        <button type="button" onClick={() => setShown(false)}>
          hide
        </button>
      </div>
      <div>url: {blog.url}</div>
      <div>
        likes: {blog.likes}
        <button type="button" onClick={handleLike}>
          like
        </button>
      </div>
      <div>author: {blog.author}</div>
      <div>
        {user && user.id === blog.user.id ? (
          <button type="button" onClick={handleRemove}>
            remove
          </button>
        ) : null}
      </div>
    </div>
  ) : (
    <div style={style}>
      {blog.title} by {blog.author}
      <button type="button" onClick={() => setShown(true)}>
        view
      </button>
    </div>
  );
};

export default Blog;

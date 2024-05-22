import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.toSorted((a, b) => b.likes - a.likes)));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log(exception);
      setMessage("wrong credentials");
      setError(true);
      setTimeout(() => {
        setMessage(null);
        setError(false);
      }, 5000);
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedUser", JSON.stringify(user));
    setUser(null);
  };

  const createBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(returnedBlog));
      setMessage(
        `New blog added: ${returnedBlog.title} by ${returnedBlog.author}`,
      );
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (exception) {
      console.log(exception);
      setMessage("Title, author or url missing");
      setError(true);
      setTimeout(() => {
        setMessage(null);
        setError(false);
      }, 5000);
    }
  };

  const updateBlog = async (blogObject) => {
    const returnedBlog = await blogService.update(blogObject);
    const updatedBlogs = [...blogs];
    const index = updatedBlogs.findIndex((blog) => blog.id === returnedBlog.id);
    updatedBlogs[index] = returnedBlog;
    setBlogs(updatedBlogs.toSorted((a, b) => b.likes - a.likes));
  };

  const removeBlog = async (blogObject) => {
    await blogService.remove(blogObject);
    const removedBlogs = [...blogs].filter((x) => x.id !== blogObject.id);
    setBlogs(removedBlogs);
  };
  return (
    <div>
      <Notification message={message} error={error} />

      {!user && (
        <LoginForm
          username={username}
          password={password}
          handleLogin={handleLogin}
          setUsername={setUsername}
          setPassword={setPassword}
        ></LoginForm>
      )}

      {user && (
        <div>
          <div>
            {user.name} has logged in{" "}
            <button onClick={handleLogout}>logout</button>
          </div>
          <BlogForm createBlog={createBlog} />
        </div>
      )}
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          removeBlog={removeBlog}
          user={user}
        />
      ))}
    </div>
  );
};

export default App;

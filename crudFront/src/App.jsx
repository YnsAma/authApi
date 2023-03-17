import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/posts")
      .then((response) => {
        setPosts(response.data.posts);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleAddPost = (e) => {
    e.preventDefault();
    axios.defaults.xsrfHeaderName = "X-CSRFToken";
    axios.defaults.xsrfCookieName = "csrftoken";
    const newPost = {
      title: title,
      body: body,
    };

    axios
      .post("http://127.0.0.1:8000/api/store", newPost)
      .then((response) => {
        setPosts([...posts, response.data.post]);
        setTimeout(() => {
          setSuccess(response.data.success)
        }, 20);
        setTitle("");
        setBody("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEditPost = (id) => {
    // handle edit logic
  };

  const handleDeletePost = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/posts/${id}`)
      .then((response) => {
        setPosts(posts.filter((post) => post.id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="glassmorphism">
      {success && <div className="success-message">
        <p>{success}</p>
      </div>}
      <form onSubmit={(e) => handleAddPost(e)} className="inline-form">
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button type="submit">Add Post</button>
      </form>
      <table className="posts-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {posts &&
            posts.map((post) => (
              <tr key={post.id ? post.id : "nothing"}>
                <td>{post.title}</td>
                <td>{post.body}</td>
                <td>
                  <button onClick={() => handleEditPost(post.id)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => handleDeletePost(post.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

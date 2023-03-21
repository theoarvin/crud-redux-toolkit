import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createPost, getPosts } from "../feature/post.slice";

function NewPost() {
  const [message, setMessage] = useState();
  const userId = useSelector((state) => state.user.userId);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      message: message,
      author: userId,
      // Créer un id provisoire en attendant le retour de la BDD
      _id: Date.now(),
    };

    axios.post("http://localhost:5000/post/", data).then(() => {
      dispatch(createPost(data));
      // getPost car il faut aller chercher l'id créé par MongoDB
      dispatch(getPosts(data));
    });

    setMessage("");
  };

  return (
    <form className="new-post-container" onSubmit={(e) => handleSubmit(e)}>
      <textarea
        placeholder="Quoi de neuf"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      ></textarea>
      <input type="submit" value="Envoyer" />
    </form>
  );
}

export default NewPost;

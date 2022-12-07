import React, { useContext, useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import { GlobalStoreContext } from "../store";
import AuthContext from "../auth";
import TextField from "@mui/material/TextField";

function Comments() {
  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);

  useEffect(async () => {}, [store]);

  async function handleChange(e) {
    if (e.keyCode === 13) {
      console.log(e.target.value);
      await store.addComment(e.target.value);
    }
  }

  return (
    <div>
      <div className="all-comments">
        {store.currentList.comments.map((comment) => (
          <CommentCard comment={comment} />
        ))}
      </div>
      {auth.user !== null && (
        <div className="add-comment">
          <TextField
            id="outlined-basic"
            label="Comment..."
            variant="outlined"
            onKeyDown={handleChange}
          />
        </div>
      )}
    </div>
  );
}

export default Comments;
import CommentsListView from "./CommentsListView";
import { useCallback, useReducer, createContext } from "react";
import uuid from "react-uuid";
import CommentContext from "./CommentContext";
import "./commentsViewer.css";
import InputField from "./InputField";
import Container from "react-bootstrap/Container";

const treeData = [];

function updateComments(state, action, type) {
  if (!action.id) {
    state = [
      ...state,
      {
        key: uuid(),
        label: action.value,
        children: [],
      },
    ];
    return state;
  }
  for (let i = 0; i < state.length; i++) {
    if (state[i].key === action.id) {
      if (type === "add") {
        state[i].children = [
          ...state[i].children,
          {
            key: uuid(),
            label: action.value,
            children: [],
          },
        ];
      }
      if (type === "delete") {
        return [...state.splice(0, i), ...state.splice(i)];
      }
      return state;
    }
    if (state[i].children) {
      updateComments(state[i].children, action, type);
    }
  }

  return state;
}

const CommentsViewer = () => {
  const reducer = useCallback((state, action) => {
    switch (action.type) {
      case "ADD_COMMENT":
        let updatedState = updateComments(state, action, "add");
        return updatedState.map((v) => {
          return v;
        });
      case "DELETE_COMMENT":
        let updateAfterDelete = updateComments(state, action, "delete");
        console.log(updateAfterDelete);
        return updateAfterDelete.map((v) => {
          return v;
        });
      default:
        return state;
    }
  }, []);
  const [commentsList, dispatch] = useReducer(reducer, treeData);
  return (
    <Container>
      <img
        style={{ width: "100%", height: "300px" }}
        alt=""
        src="https://images.unsplash.com/photo-1617854818583-09e7f077a156?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80"
      ></img>
      <h3 style={{ marginTop: "20px" }}>Comments</h3>
      <section className="commentInput">
        <InputField
          addReply={(label) => dispatch({ type: "ADD_COMMENT", value: label })}
        />
      </section>
      <CommentContext.Provider value={{ dispatch }}>
        <section className="comments-list">
          <CommentsListView commentList={commentsList} dispatch={dispatch} />
        </section>
      </CommentContext.Provider>
    </Container>
  );
};

export default CommentsViewer;

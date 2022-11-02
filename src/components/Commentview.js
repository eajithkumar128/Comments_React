import CommentsListView from "./CommentsListView";
import { useContext, useState } from "react";
import CommentContext from "./CommentContext";
import InputField from "./InputField";
import UserIcon from "./icon.png";
const CommentView = ({ comment }) => {
  const { children } = comment;
  const { dispatch } = useContext(CommentContext);
  const [showInput, setShowInput] = useState(false);
  const addReply = (value) => {
    toggleInput();
    dispatch({
      type: "ADD_COMMENT",
      id: comment.key,
      value: value,
    });
  };
  const deleteReply = () => {
    dispatch({
      type: "DELETE_COMMENT",
      id: comment.key,
    });
  };
  const toggleInput = () => {
    setShowInput((prevState) => !prevState);
  };
  return (
    <>
      <section className="comment-label">
        <img src={UserIcon} alt="" />
        <span className="comment-label-field">{comment.label}</span>
        <InputField
          hideInput={true}
          addReply={() => toggleInput()}
          deleteReply={() => deleteReply()}
        />
      </section>
      {showInput && (
        <section className="commentInput" style={{ paddingLeft: "70px" }}>
          <InputField
            addReply={(v) => addReply(v)}
            deleteReply={() => deleteReply()}
          />
        </section>
      )}
      {children && (
        <section style={{ paddingLeft: "40px" }}>
          <CommentsListView commentList={comment.children} />
        </section>
      )}
    </>
  );
};

export default CommentView;

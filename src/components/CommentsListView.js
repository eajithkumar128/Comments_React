import CommentView from "./Commentview";

const CommentsListView = ({ commentList }) => {
  return (
    <>
      {commentList.map((comment) => {
        return <CommentView comment={comment} key={comment.key} />;
      })}
    </>
  );
};

export default CommentsListView;

import { useState } from "react";
import Button from "react-bootstrap/Button";
const InputField = ({ addReply, deleteReply, hideInput }) => {
  const [reply, setReply] = useState("");
  return (
    <>
      <section className="common-input-field">
        {!hideInput && (
          <input
            value={reply}
            onInput={(e) => setReply(e.target.value)}
          ></input>
        )}
        {addReply && (
          <Button
            variant="outline-primary"
            onClick={() => {
              addReply(reply);
              setReply("");
            }}
          >
            {" "}
            Reply
          </Button>
        )}
        {deleteReply && (
          <Button
            className="mx-2"
            variant="outline-danger"
            onClick={() => deleteReply()}
          >
            {" "}
            Delete
          </Button>
        )}
      </section>
    </>
  );
};

export default InputField;

import React from "react";

const CommentContext = React.createContext({ status: null, login: () => {} });

export default CommentContext;

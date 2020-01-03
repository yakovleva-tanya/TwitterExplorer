import React from "react";

const User = ({ user }) => {
  return (
    <div>
      <div
        className="content"
        dangerouslySetInnerHTML={{
          __html: user.html
        }}
      ></div>
    </div>
  );
};

export default User;

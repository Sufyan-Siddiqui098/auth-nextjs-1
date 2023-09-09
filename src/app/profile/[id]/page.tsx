import React from "react";

const UserProfile = ({ params }: any) => {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <div className="p-2 rounded-lg my-3 text-2xl  text-white">
        User Profile:{" "}
        <span className="bg-amber-500 p-2 rounded-md">
          {" "}
          {decodeURI(params.id)}
        </span>
      </div>
      
    </div>
  );
};

export default UserProfile;

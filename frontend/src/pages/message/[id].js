import React, { useEffect, useState } from "react";
import LeftSide from "../../components/message/LeftSide";
import RightSide from "../../components/message/RightSide";

const Conversation = () => {
  const [showChats, setShowChats] = useState(true);

  return (
    <div className="message d-flex row mx-0">
      <div className={`col-4 px-0 chats ${showChats ? "activechats" : ""}`} >
        <LeftSide setShowChats={setShowChats} />
      </div>

      <div className={`col-8 px-0 conversation ${showChats ? "activechats" : ""}`}>
        <RightSide setShowChats={setShowChats} />
      </div>
    </div>
  );
};

export default Conversation;

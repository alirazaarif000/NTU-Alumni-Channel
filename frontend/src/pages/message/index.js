import React, { useState } from 'react'
import LeftSide from '../../components/message/LeftSide'

const Message = () => {
  const [showChats, setShowChats] = useState(true);

  return (
    <div className="message d-flex">
      <div className={`col-4 px-0 chats ${showChats ? "activechats" : ""}`} >
        <LeftSide setShowChats={setShowChats} />
      </div>

      <div className={`col-8 px-0 conversation border ${showChats ? "activechats" : ""}`}>
        <div className="d-flex justify-content-center align-items-center flex-column h-100">
          <div
            className="backbutton text-black fw-bold fs-2 ms-3 mt-2 cursor-pointer"
          ><i class="fa fa-arrow-left" aria-hidden="true" onClick={() => { setShowChats(true) }}></i>
          </div>
          <i className="fa fa-bolt color-c1" style={{ fontSize: '5rem' }} />
          <h4>Messenger</h4>
        </div>
      </div>
    </div>
  );
}

export default Message

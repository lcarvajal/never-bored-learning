import './Chatpanel.css'

interface MessageProps {
  message: string
  sender: string
}

function Message(props: MessageProps) {
  return (
    <>
      {props.sender === "user" ? (
        <div className="text-right">
          <p className="message message__user">{props.message}</p>
        </div>
      ) : (
        <div className="">
          <p className="message message__bot">{props.message}</p>
        </div>
      )}
    </>
  )
}

export default function Chatpanel() {

  return (
    <div className="chatpanel">
      <div className="chatpanel__header">
        <h1>Chat</h1>
      </div>
      <div className="chatpanel__messages">
        <Message message="Hello, how are you?" sender="bot" />
        <Message message="Great, what about you?" sender="user" />
        <Message message="Sweet" sender="bot" />
        <Message message="Great to hear!" sender="user" />
      </div>
      <div className="chatpanel__input">
        <input type="text" placeholder="Type a message..." />
        <button>Send</button>
      </div>
    </div>
  )
}
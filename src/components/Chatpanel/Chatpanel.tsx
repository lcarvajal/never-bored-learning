import './Chatpanel.css'

export default function Chatpanel() {

  return (
    <div className="chatpanel">
      <div className="chatpanel__header">
        <h3>Chat</h3>
      </div>
      <div className="chatpanel__messages">
        <ul>
          <li>sample message 1</li>
          <li>sample message 2</li>
          <li>sample message 3</li>
        </ul>
      </div>
      <div className="chatpanel__input">
        <input type="text" placeholder="Type a message..." />
        <button>Send</button>
      </div>
    </div>
  )
}
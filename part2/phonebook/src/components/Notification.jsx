export function Notification({ message }) {
  if (message.type === null) return null

  return (
    <div className={`message ${message.type}`}>
      {message.text}
    </div>
  )
}

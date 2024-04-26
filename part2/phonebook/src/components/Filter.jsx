export function Filter({ filter, onChange }) {
  return (
    <div>
      Filter shown with <input value={filter} onChange={onChange} />
    </div>
  )
}
export default function Button({
  name,
  type = 'button',
  onClick,
  full = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        bg-emerald-500 text-white py-2 px-4
        rounded-lg font-medium
        hover:bg-emerald-600 transition
        cursor-pointer
        ${full ? 'w-full' : ''}
      `}
    >
      {name}
    </button>
  )
}

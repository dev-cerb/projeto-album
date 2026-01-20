export default function Button({ name, type = 'button' }) {
  return (
    <button
      type={type}
      className="w-full bg-emerald-500 text-white py-2
                 rounded-lg font-medium hover:bg-emerald-600
                 transition"
    >
      {name}
    </button>
  )
}

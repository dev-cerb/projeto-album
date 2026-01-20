export default function Input({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
}) {
  return (
    <div>
      {label && (
        <label className="block text-sm text-gray-600 mb-1">
          {label}
        </label>
      )}

      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border rounded-lg
                   focus:outline-none focus:ring-2
                   focus:ring-emerald-400"
      />
    </div>
  )
}

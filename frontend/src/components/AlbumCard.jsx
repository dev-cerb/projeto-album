const UPLOADS_URL = import.meta.env.VITE_UPLOADS_URL

export default function AlbumCard({ album, onClick, onEdit }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white p-4 rounded-lg shadow hover:shadow-md transition"
    >
      <div className="h-64 rounded mb-2 bg-gray-300 overflow-hidden">
        {album.coverImage && (
          <img
            src={`${UPLOADS_URL}/${album.coverImage}`}
            alt={album.titulo}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-gray-800">{album.titulo}</h2>

        <button
          onClick={(e) => {
            e.stopPropagation()
            onEdit(album)
          }}
          className="text-base text-emerald-600 hover:underline cursor-pointer"
        >
          Editar
        </button>
      </div>

      <p className="text-sm text-gray-500 mt-1">
        {album.descricao || 'Sem descrição'}
      </p>
    </div>
  )
}

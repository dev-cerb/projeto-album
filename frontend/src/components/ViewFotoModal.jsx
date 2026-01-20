import EditFotoModal from './EditFotoModal'

const UPLOADS_URL = import.meta.env.VITE_UPLOADS_URL

export default function ViewFotoModal({ foto, onClose, onEdit, onDelete }) {
  if (!foto) return null

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl max-w-4xl w-full p-4 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold text-gray-800">
            {foto.titulo || 'Sem título'}
          </h2>

          <div className="flex gap-3">
            <button
              onClick={() => onEdit(foto)}
              className="text-sm text-emerald-600 hover:underline"
            >
              Editar
            </button>

            <button
              onClick={() => onDelete(foto)}
              className="text-sm text-emerald-600 hover:underline"
            >
              Excluir
            </button>

            <button
              onClick={onClose}
              className="text-sm text-emerald-600 hover:underline cursor-pointer"
            >
              Fechar
            </button>
          </div>
        </div>

        <div className="flex justify-center bg-gray-100 rounded overflow-hidden">
          <img
            src={`${UPLOADS_URL}/${foto.arquivo}`}
            alt={foto.titulo}
            className="max-h-[70vh] object-contain"
          />
        </div>

        {foto.descricao && (
          <p className="text-sm text-gray-800 mt-3">{foto.descricao}</p>
        )}
      </div>
    </div>
  )
}

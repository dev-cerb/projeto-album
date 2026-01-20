import { useState } from 'react'
import apiRequest from '../services/api'
import Button from './Button'

export default function DeleteAlbumModal({ albumId, onClose, onDeleted }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleDelete() {
    try {
      setLoading(true)
      setError(null)

      await apiRequest(`/albuns/${albumId}`, {
        method: 'DELETE',
      })

      onDeleted()
    } catch (err) {
      setError(err.message || 'Erro ao excluir álbum.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg">
        <h2 className="text-lg font-bold text-gray-800 mb-2">Excluir álbum</h2>

        <p className="text-gray-600 mb-4">
          Tem certeza que deseja excluir este álbum?
          <br />
          <span className="text-sm text-gray-500">
            O álbum só pode ser excluído se não possuir fotos.
          </span>
        </p>

        {error && <p className="text-sm text-red-500 mb-3">{error}</p>}

        <div className="flex justify-end gap-3">
          <Button name="Cancelar" type="button" onClick={onClose} />

          <Button
            name={loading ? 'Excluindo...' : 'Excluir'}
            type="button"
            onClick={handleDelete}
            disabled={loading}
          />
        </div>
      </div>
    </div>
  )
}

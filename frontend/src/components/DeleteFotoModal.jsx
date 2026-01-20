import { useState } from 'react'

import apiRequest from '../services/api'
import Button from './Button'

export default function DeleteFotoModal({
  albumId,
  fotoId,
  onClose,
  onDeleted,
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleDelete() {
    try {
      setLoading(true)
      setError(null)

      await apiRequest(`/albuns/${albumId}/fotos/${fotoId}`, {
        method: 'DELETE',
      })

      onDeleted()
      onClose()
    } catch (err) {
      setError(err.message || 'Erro ao excluir foto.')
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg">
        <h2 className="text-lg font-bold text-gray-800 mb-2">Excluir foto</h2>

        <p className="text-sm text-gray-600 mb-6">
          Tem certeza que deseja excluir esta foto? Essa ação não pode ser
          desfeita.
        </p>

        {error && <p className="text-sm text-red-500 mb-3">{error}</p>}

        <div className="flex justify-end gap-3">
          <Button name="Cancelar" type="button" onClick={onClose} />

          <Button
            name={loading ? 'Excluindo...' : 'Excluir'}
            type="button"
            disabled={loading}
            onClick={handleDelete}
          />
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import apiRequest from '../services/api'
import Button from './Button'

export default function UploadFotosModal({ albumId, onClose, onUploaded }) {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  function handleChange(e) {
    setFiles([...e.target.files])
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (files.length === 0) {
      setError('Selecione ao menos uma foto.')
      return
    }

    try {
      setLoading(true)
      setError(null)

      const formData = new FormData()
      files.forEach((file) => {
        formData.append('files', file)
      })

      await apiRequest(`/albuns/${albumId}/fotos`, {
        method: 'POST',
        body: formData,
        isMultipart: true,
      })

      onUploaded()
      onClose()
    } catch (err) {
      setError(err.message || 'Erro ao fazer upload.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg">
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          Upload de fotos
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="file"
            id="fotos"
            multiple
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />

          <label
            htmlFor="fotos"
            className="
                inline-block cursor-pointer
                bg-emerald-500 text-white
                px-4 py-2 rounded-lg
                hover:bg-emerald-600 transition
            "
          >
            Selecionar fotos
          </label>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex justify-end gap-3">
            <Button name="Cancelar" type="button" onClick={onClose} />

            <Button
              name={loading ? 'Enviando...' : 'Enviar'}
              type="submit"
              disabled={loading}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

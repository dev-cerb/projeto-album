import { useState } from 'react'
import apiRequest from '../services/api'

export default function EditAlbumModal({ album, onClose, onUpdated }) {
  const [form, setForm] = useState({
    titulo: album.titulo,
    descricao: album.descricao || '',
  })

  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (form.titulo === '') {
      return window.alert('O título é obrigatório')
    }

    try {
      setLoading(true)

      await apiRequest(`/albuns/${album.id}`, {
        method: 'PUT',
        body: JSON.stringify(form),
      })

      onUpdated()
      onClose()
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Editar álbum</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            name="titulo"
            value={form.titulo}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Título do álbum"
          />

          <textarea
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Descrição"
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={loading}
              className="
                bg-emerald-500 text-white px-4 py-2 rounded-lg
                hover:bg-emerald-600 transition
                disabled:opacity-50
                cursor-pointer
              "
            >
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

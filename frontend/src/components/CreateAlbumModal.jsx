import { useState } from 'react'
import apiRequest from '../services/api'

export default function CreateAlbumModal({ onClose, onCreated }) {
  const [form, setForm] = useState({
    titulo: '',
    descricao: '',
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
      return window.alert('O título é obrigatório.')
    }

    try {
      setLoading(true)
      await apiRequest('/albuns', {
        method: 'POST',
        body: JSON.stringify(form),
      })

      onCreated()
      onClose()
    } catch (error) {
      window.alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg">
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          Criar novo álbum
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            name="titulo"
            type="text"
            placeholder="Título do álbum"
            value={form.titulo}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />

          <textarea
            name="descricao"
            placeholder="Descrição (opcional)"
            value={form.descricao}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              disabled={loading}
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
              "
            >
              {loading ? 'Criando...' : 'Criar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

import { useState } from 'react'
import apiRequest from '../services/api'
import Button from './Button'

export default function EditFotoModal({ foto, onClose, onUpdated }) {
  const [form, setForm] = useState({
    titulo: foto.titulo || '',
    descricao: foto.descricao || '',
    dataAquisicao: foto.dataAquisicao ? foto.dataAquisicao.split('T')[0] : '',
    cor: foto.cor || '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setLoading(true)
      setError(null)

      await apiRequest(`/albuns/${foto.albumId}/fotos/${foto.id}`, {
        method: 'PUT',
        body: JSON.stringify(form),
      })

      onUpdated()
      onClose()
    } catch (err) {
      setError(err.message || 'Erro ao atualizar foto.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Editar foto</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="titulo"
            value={form.titulo}
            onChange={handleChange}
            placeholder="Título"
            className="w-full px-4 py-2 border rounded-lg"
          />

          <textarea
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
            placeholder="Descrição"
            className="w-full px-4 py-2 border rounded-lg"
          />

          <input
            type="date"
            name="dataAquisicao"
            value={form.dataAquisicao}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />

          <input
            name="cor"
            value={form.cor}
            onChange={handleChange}
            placeholder="Cor predominante"
            className="w-full px-4 py-2 border rounded-lg"
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex justify-end gap-3">
            <Button name="Cancelar" type="button" onClick={onClose} />
            <Button
              name={loading ? 'Salvando...' : 'Salvar'}
              type="submit"
              disabled={loading}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

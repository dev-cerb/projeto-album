import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'

import apiRequest from '../services/api'
import Button from '../components/Button'
import DeleteAlbumModal from '../components/DeleteAlbumModal'
import ViewFotoModal from '../components/ViewFotoModal'
import EditFotoModal from '../components/EditFotoModal'
import UploadFotosModal from '../components/UploadFotosModal'
import DeleteFotoModal from '../components/DeleteFotoModal'

export default function Album() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [album, setAlbum] = useState(null)
  const [loading, setLoading] = useState(true)
  const [fotos, setFotos] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [loadingFotos, setLoadingFotos] = useState(true)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [fotoSelecionada, setFotoSelecionada] = useState(null)
  const [fotoEditing, setFotoEditing] = useState(null)
  const [uploadModalOpen, setUploadModalOpen] = useState(false)
  const [fotoDeleting, setFotoDeleting] = useState(null)

  const [searchParams, setSearchParams] = useSearchParams()
  const page = Number(searchParams.get('page')) || 1

  async function fetchAlbum() {
    try {
      console.log(id)
      const response = await apiRequest(`/albuns/${id}`, {
        method: 'GET',
      })
      setAlbum(response)
    } catch (error) {
      console.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function fetchFotos() {
    try {
      const response = await apiRequest(
        `/albuns/${id}/fotos?page=${page}&limit=12`,
        {
          method: 'GET',
        }
      )

      setFotos(response.data)
      setTotalPages(response.totalPages)
    } catch (error) {
      window.alert(error.message)
    } finally {
      setLoadingFotos(false)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      navigate('/login')
      return
    }

    fetchAlbum()
    fetchFotos()
  }, [id, page, navigate])

  if (loading) {
    return <p className="text-center mt-10">Carregando álbum...</p>
  }

  if (!album) {
    return (
      <p className="text-center mt-10 text-red-500">Álbum não encontrado.</p>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="p-6 bg-white shadow">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-emerald-600 hover:underline mb-2"
        >
          Voltar
        </button>

        <h1 className="text-2xl font-bold text-gray-800">{album.titulo}</h1>

        <p className="text-gray-500 mt-1">
          {album.descricao || 'Sem descrição'}
        </p>

        <div className="flex gap-3 mt-4">
          <Button
            name="Upload fotos"
            onClick={() => setUploadModalOpen(true)}
          />

          <Button
            name="Excluir álbum"
            onClick={() => setDeleteModalOpen(true)}
          />
        </div>
      </header>

      <main className="p-6">
        {loadingFotos ? (
          <p className="text-gray-400">Carregando fotos...</p>
        ) : fotos.length === 0 ? (
          <p className="text-gray-500">Este álbum ainda não possui fotos.</p>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {fotos.map((foto) => (
                <div
                  key={foto.id}
                  className="bg-gray-200 rounded overflow-hidden h-96 cursor-pointer"
                  onClick={() => setFotoSelecionada(foto)}
                >
                  <img
                    src={`${import.meta.env.VITE_UPLOADS_URL}/${foto.arquivo}`}
                    alt={foto.titulo}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={() => setSearchParams({ page: Math.max(page - 1, 1) })}
                disabled={page === 1}
                className="px-4 py-2 rounded bg-emerald-500 cursor-pointer hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white"
              >
                Anterior
              </button>

              <span className="text-sm text-gray-600">
                Página {page} de {totalPages}
              </span>

              <button
                onClick={() =>
                  setSearchParams({ page: Math.min(page + 1, totalPages) })
                }
                disabled={page === totalPages}
                className="px-4 py-2 rounded bg-emerald-500 disabled:opacity-50 cursor-pointer hover:bg-emerald-600 disabled:cursor-not-allowed text-white"
              >
                Próxima
              </button>
            </div>
          </>
        )}
      </main>

      {deleteModalOpen && (
        <DeleteAlbumModal
          albumId={album.id}
          onClose={() => setDeleteModalOpen(false)}
          onDeleted={() => {
            setDeleteModalOpen(false)
            navigate(-1)
          }}
        />
      )}

      {fotoSelecionada && (
        <ViewFotoModal
          foto={fotoSelecionada}
          onClose={() => setFotoSelecionada(null)}
          onEdit={(foto) => {
            setFotoSelecionada(null)
            setFotoEditing(foto)
          }}
          onDelete={(foto) => {
            setFotoSelecionada(null)
            setFotoDeleting(foto)
          }}
        />
      )}

      {fotoEditing && (
        <EditFotoModal
          foto={fotoEditing}
          onClose={() => setFotoEditing(null)}
          onUpdated={fetchFotos}
        />
      )}

      {uploadModalOpen && (
        <UploadFotosModal
          albumId={album.id}
          onClose={() => setUploadModalOpen(false)}
          onUploaded={fetchFotos}
        />
      )}

      {fotoDeleting && (
        <DeleteFotoModal
          albumId={album.id}
          fotoId={fotoDeleting.id}
          onClose={() => setFotoDeleting(null)}
          onDeleted={fetchFotos}
        />
      )}
    </div>
  )
}

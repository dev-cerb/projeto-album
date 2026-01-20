import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import apiRequest from '../services/api'
import Button from '../components/Button'
import CreateAlbumModal from '../components/CreateAlbumModal'
import AlbumCard from '../components/AlbumCard'
import EditAlbumModal from '../components/EditAlbumModal'

export default function Home() {
  const navigate = useNavigate()
  const [albums, setAlbums] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalAlbumOpen, setModalAlbumOpen] = useState(false)
  const [albumEditing, setAlbumEditing] = useState(null)

  async function fetchAlbums() {
    try {
      const response = await apiRequest('/albuns')
      setAlbums(response.data)
    } catch (error) {
      console.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      navigate('/login')
      return
    }

    fetchAlbums()
  }, [navigate])

  function handleLogout() {
    localStorage.removeItem('token')
    navigate('/login')
  }

  if (loading) {
    return <p className="text-center mt-10">Carregando...</p>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex justify-between items-center p-6 bg-white shadow">
        <h1 className="text-xl font-bold text-gray-800">Meus Álbuns</h1>

        <div className="flex gap-3">
          <Button name="+ Novo Álbum" onClick={() => setModalAlbumOpen(true)} />
          <Button name="Sair" onClick={handleLogout} />
        </div>
      </header>

      <main className="p-6">
        {albums.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">
            Você ainda não possui álbuns.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {albums.map((album) => (
              <AlbumCard
                key={album.id}
                album={album}
                onClick={() => navigate(`/albuns/${album.id}`)}
                onEdit={(album) => setAlbumEditing(album)}
              />
            ))}
          </div>
        )}
      </main>

      {modalAlbumOpen && (
        <CreateAlbumModal
          onClose={() => setModalAlbumOpen(false)}
          onCreated={fetchAlbums}
        />
      )}

      {albumEditing && (
        <EditAlbumModal
          album={albumEditing}
          onClose={() => setAlbumEditing(null)}
          onUpdated={fetchAlbums}
        />
      )}
    </div>
  )
}

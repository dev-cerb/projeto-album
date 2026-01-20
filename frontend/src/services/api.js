const API_URL = import.meta.env.VITE_API_URL

export default async function apiRequest(path, options = {}) {
  const token = localStorage.getItem('token')

  const headers = options.isMultipart
    ? {}
    : { 'Content-Type': 'application/json' }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(text)
  }

  return response.json()
}

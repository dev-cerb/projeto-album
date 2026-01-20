import { useState } from 'react'

import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import Button from '../components/Button'
import Input from '../components/Input'
import apiRequest from '../services/api'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      const data = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify(form),
      })

      localStorage.setItem('token', data.token)

      return navigate('/home')
    } catch (error) {
      return window.alert(error.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          Entrar
        </h1>

        <p className="text-gray-500 text-center mb-6">
          Acesse sua galeria de fotos
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Input
              label="Email"
              name="email"
              value={form.email}
              placeholder="seuemail@exemplo.com"
              onChange={handleChange}
            />
          </div>

          <div>
            <Input
              label="Senha"
              name="password"
              value={form.password}
              type="password"
              placeholder="********"
              onChange={handleChange}
            />
          </div>

          <Button name="Entrar" type="submit" />
        </form>

        <p className="text-sm text-center text-gray-500 mt-6">
          Não tem conta?{' '}
          <Link to="/register" className="text-emerald-500 hover:underline">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  )
}

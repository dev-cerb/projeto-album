import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import Button from '../components/Button'
import Input from '../components/Input'
import apiRequest from '../services/api'

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (form.password !== form.confirmPassword) {
      return window.alert('Senhas não coincidem.')
    }

    try {
      const data = await apiRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify(form),
      })

      window.alert(data.message)

      return navigate('/login')
    } catch (error) {
      return window.alert(error.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          Cadastro
        </h1>

        <p className="text-gray-500 text-center mb-6">
          Crie sua conta agora mesmo!
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

          <div>
            <Input
              label="Confirmar senha"
              name="confirmPassword"
              value={form.confirmPassword}
              type="password"
              placeholder="********"
              onChange={handleChange}
            />
          </div>

          <Button name="Registrar" type="submit" full />
        </form>
      </div>
    </div>
  )
}

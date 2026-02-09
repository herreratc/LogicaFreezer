import { useState } from 'react'
import { useAuthStore } from './useAuthStore'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const signIn = useAuthStore((s) => s.signIn)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      await signIn(email, password)
      navigate('/app/dashboard')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br /><br />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br /><br />

        <button type="submit">Entrar</button>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  )
}

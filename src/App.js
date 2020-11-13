import  React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from 'components/AppRouter'
import { AuthProviderContainer } from 'context/AuthContext'
// import "./app.scss"
const App = () => {
  return (
    <AuthProviderContainer >
      <BrowserRouter className="app">
        <AppRouter />
      </BrowserRouter>
    </AuthProviderContainer>
  )
}

export default App
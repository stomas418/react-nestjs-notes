import './App.css'
import { useUser } from './context/Context'
import Home from './components/Home/Home'
import Login from './components/User/Login'


const App = () => {
  const [user,] = useUser()
  return (
    user ?
      <Home />
      :
      <Login />

  )
}

export default App

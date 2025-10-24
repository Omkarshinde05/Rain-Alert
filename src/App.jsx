import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RainAlert from './component/RainAlert'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RainAlert />
    </>
  )
}

export default App

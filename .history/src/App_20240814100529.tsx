import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [foods, setFoods] = useState([])

  useEffect(() => {
    async function getFoods() {
      const response = await fetch('http://localhost:3001/foods')
    }


  })

  return (
    <>

    </>
  )
}

export default App

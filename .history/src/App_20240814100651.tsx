import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [foods, setFoods] = useState([])

  useEffect(() => {
    async function getFoods() {
      const response = await fetch('http://localhost:3001/foods')
      const json = await response.json()
      setFoods(json)
    }
    getFoods()
  }, [])

  return (
    <>
      <ul>
      {foods.map(food => {
        <li>{food.name}</li>
      })}
      </ul>
    </>
  )
}

export default App

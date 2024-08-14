import { useEffect, useState } from 'react'
import './App.css'
import { Food } from './food'

function App() {
  const [foods, setFoods] = useState([] as Food[])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getFoods() {
      const response = await fetch('http://localhost:3001/foods')
      const json = await response.json()
      setFoods(json)
    }
    getFoods()
  }, [])

  function renderFoods() {
    return foods.map(food =>
          <li key={food.id}>{food.name}</li>
        )
  }

  return (
    <>
      <ul>
        {renderFoods()}
      </ul>
    </>
  )
}

export default App

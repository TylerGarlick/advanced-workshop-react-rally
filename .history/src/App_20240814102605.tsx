import { useEffect, useState } from 'react'
import './App.css'
import { Food } from './food'

function App() {
  const [foods, setFoods] = useState([] as Food[])
  const [loading, setLoading] = useState(true)
  const [error, s]

  useEffect(() => {
    async function getFoods() {
      try {
        const response = await fetch('http://localhost:3001/foods')
        const json = await response.json()
        setFoods(json)
      } catch (err) {

      } finally {
        setLoading(false)
      }
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

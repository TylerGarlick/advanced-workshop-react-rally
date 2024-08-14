import { useEffect, useState } from 'react'
import './App.css'
import { Food } from './food'

function App() {
  const [foods, setFoods] = useState([] as Food[])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error|null>(null)

  useEffect(() => {
    async function getFoods() {
      try {
        const response = await fetch('http://localhost:3001/foods')
        const json = await response.json()
        setFoods(json)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }
    getFoods()
  }, [])

  function renderFoods() {
    return (<ul>foods.map(food =>
          <li key={food.id}>{food.name}</li>
          </ul>)
  }

  return (
    <>

        {!loading && renderFoods()}
      </ul>
      {error && "Sorry an error has occurred."}
    </>
  )
}

export default App

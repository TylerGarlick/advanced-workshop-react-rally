import './App.css'
import { useQuery } from '@tanstack/react-query'
import { Food } from './food'


function App() {
  const foodsQuery = useQuery<Food[]>({
    queryFn: async () => {
      const response = await fetch('http://localhost:3001/foods')
        return response.json()
    },
    queryKey: ["foods"]
  })

  function renderFoods() {
    if (!foodsQuery.data) return

    return (
      <ul>
        {foodsQuery.data.map(food => <li key={food.id}>{food.name}</li>)}
      </ul>
    )
  }

  return (
    <>
      {!foodsQuery.isLoading && renderFoods()}
      {foodsQuery.isError && "Sorry an error has occurred."}
    </>
  )
}

export default App

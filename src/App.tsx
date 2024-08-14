import './App.css'
import { useFoods } from './query/useFoods'

function App() {
  const foodsQuery = useFoods()

  function renderFoods() {
    return (
      <ul>
        {foodsQuery.data.map((food) => (
          <li key={food.id}>{food.name}</li>
        ))}
      </ul>
    )
  }

  return (
    <>
      {!foodsQuery.isLoading && renderFoods()}
      {foodsQuery.isError && 'Sorry an error has occurred.'}
    </>
  )
}

export default App

import './App.css'
import { useFoods } from './query/useFoods'
import { useSearchParams } from 'react-router-dom'

/*
This is a custom hook.
 */
function useSearch() {
  const [params, setParams] = useSearchParams()
  return {
    params: params.get('search')?.toString(),
    setParams: (search: string) => setParams(search),
  }
}

function App() {
  const foodsQuery = useFoods()
  const { params, setParams } = useSearch()

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
      <h1>Menu</h1>
      <input
        type="search"
        placeholder="Search..."
        value={params}
        onChange={(e) => {
          setParams(e.target.value)
        }}
      />
      {!foodsQuery.isLoading && renderFoods()}
    </>
  )
}

export default App

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
    setParams: (search: string) => setParams({ search }),
  }
}

function Menu() {
  const foodsQuery = useFoods()
  const { params, setParams } = useSearch()

  const filteredFoods =
    foodsQuery.data.filter((food) =>
      food?.name.toLowerCase().includes((params || '').toLowerCase()),
    ) || []

  const countFoodsFound = filteredFoods.length || 0

  function renderFoods() {
    return (
      <ul>
        {filteredFoods.map((food) => (
          <li key={food.id}>{food.name}</li>
        ))}
      </ul>
    )
  }

  return (
    <>
      <h1>Menu</h1>
      <input
        type='search'
        placeholder='Search...'
        value={params}
        onChange={(e) => {
          setParams(e.target.value)
        }}
      />
      {!foodsQuery.isLoading && renderFoods()}
      {countFoodsFound > 0 && `Foods Found: ${countFoodsFound}`}
    </>
  )
}

export default Menu

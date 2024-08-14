Restaurant Application

Use `food.ts` as the data and information that we will use.

```tsx
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
```


```tsx
function renderFoods() {
  return foods.map(food =>
    <li key={food.id}>{food.name}</li>
  )
}
```

> Try to co-locate related code.



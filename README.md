# Building a sample Restaurant Application

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
  return foods.map((food) => <li key={food.id}>{food.name}</li>)
}
```

> Try to co-locate related code.

Build an enum types out of a primitive string type.

```tsx
export const foodTags = [
  'Breakfast',
  'Lunch',
  'Dinner',
  'Dessert',
  'Drink',
  'Appetizer',
  'Spicy',
  'Vegetarian',
  'Alcoholic',
] as const //if we forget the const it turns into an array of strings

export type FoodTag = (typeof foodTags)[number]
```

Zod is more powerful than TypeScript.

We create more Zod schemas instead of TypeScript types because they are more powerful and we can derive our schemas from
the Zod schema. This avoids repetition of our declarations.

Error boundaries help us bubble up the various kinds of errors. We have to use code like:

```tsx
  if (foodsQuery.error) throw Error
```

Or use the defaultOptions for the `QueryClient`. The `throwOnError` is the key to making the `ErrorBoundary` be triggered. 

```ts
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      throwOnError: true,
    },
  },
})
```

Use `Zod` or something similar to validate: forms, urls, and other parts of our application.

Make sure to `useSearchParams()` to set filters to make the urls shareable and useful to the users.  We can make a custom hook where we can abstract away some of the complexity. 


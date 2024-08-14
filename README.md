# Building a sample Restaurant Application

## Initial Setup

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

### QueryClient

Or use the defaultOptions for the `QueryClient`. The `throwOnError` is the key to making the `ErrorBoundary` be
triggered.

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

### Zod

Zod is more powerful than TypeScript.

We create more Zod schemas instead of TypeScript types because they are more powerful and we can derive our schemas from
the Zod schema. This avoids repetition of our declarations.

Use `Zod` or something similar to validate: forms, urls, and other parts of our application.

Error boundaries help us bubble up the various kinds of errors. We have to use code like:

```tsx
  if (foodsQuery.error) throw Error
```

Make sure to `useSearchParams()` to set filters to make the urls shareable and useful to the users. We can make a custom
hook where we can abstract away some of the complexity.

`useSupsenseQuery` is used to lazy load the asynchronous parts of the codebase.

`RTKQuery` is the competitor to `@tanstack/react-query.`

### Handling State

There are 8 ways to handle state:

1. Url: Shareable app location
2. Web Storage: Persist between sessions, one browser
3. Local State: Only one component needs state
4. Lifted State: A few related components need the state
5. Derived State: State can be derived from existing state
6. Refs: Dome reference, state that isn't rendered
7. Context: Global or subtree state
8. Third Party Library: Global state, Remote State

### 30 Ways to Handle React State

**Built In:**

- useState
- useReducer
- useRef
- useContext
- useOptimistic
- useSyncExternalStore
- useActionState
- React Server component

**Web Platform:**

- URL
- Cookie
- localStorage
- sessionStorage
- indexDB

**General State:**

- Redux
- Zustand
- Jotai
- Valtio
- Mobx
- Recoil
- Xstate

**Remote State**

- Tanstack Query
- swr
- Apollo
- RTK query

**Route State:**

- React Router loader
- Remix Loader
- Tanstack Router Loader

**Form State:**

- Formik
- React Hook Form
- Tanstack Form

#### Picking a React State Approach

- Is Sharable via URL?
  - Use Url
  - Fetched? For Multiple Routes?
    - Remote State
  - No? Route State (React Router loader, Tanstack Router loader)
- For many components?
  - Yes? Shared state, useContext, localStorage, etc. all the options
  - No? Form? Use Form State
  - No? Plain State? useState, useReducer, XState

When is it bad to `pass props`? When there are around 6 or less it is appropriate and sometimes easier.


> You can make the mistake of using too many patterns in too many places

Session Storage versus Local Storage use with not risky and not public information. Not very many uses for
`localStorage` and should we use `Cookie` as a way to limit session like information.

### Routing

Use the `react-router-dom` to create the `/` and the `/about` routes.


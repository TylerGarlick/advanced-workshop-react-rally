# Building a sample Restaurant Application

## Resources

Use this [repo](https://github.com/coryhouse/reactjsconsulting/issues) to see what lessons have been learned over the
past 10 years.

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

Use [zod](https://zod.dev/) for validation. Zod is more powerful than TypeScript. We create more Zod schemas instead of
TypeScript types because they are more powerful and we can derive our schemas from
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

### Memoization

Use the `children` property before we apply the `memo` optimizations across our application. Children won't force a
rerender when the application is.

> Not very good reasons to use context anymore

#### Zustand and Jotai

Context does not have to be global. Use [zustand](https://docs.pmnd.rs/zustand/getting-started/introduction) instead of
context. This is the essence of a basic redux library.  [jotai](https://jotai.org/docs/introduction) is similar to
`zustand`. The setter is not protected state and that is the difference between `zustand`.

### Tests

#### 5 types of tests:

1. Unit: Test 1 thing, alone
2. Integration: TEst a few things , together
3. End-to-end (e2e): Test that everything works together (run the app)
4. Performance: Test that app is fast under load
5. Contract: Test the interaction between 2 separate systems

#### Tools for each testing type

1. Unit: Jest, Vitest, NUnit, JUnit
2. Integration: See #1 / #3
3. End to end: playwright
4. Contract: Pact
5. Performance k6, JMeter

### [react-switchboard](https://github.com/coryhouse/react-switchboard)

Checkout [locatorjs](https://www.locatorjs.com/)

https://overreacted.io/





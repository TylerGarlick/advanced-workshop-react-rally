import { useQuery } from '@tanstack/react-query'
import { Food } from '../food'

export function useFoods() {
  return useQuery<Food[]>({
    queryFn: async () => {
      const response = await fetch('http://localhost:3001/foods')
      return response.json()
    },
    queryKey: ['foods'],
    initialData: [],
  })
}

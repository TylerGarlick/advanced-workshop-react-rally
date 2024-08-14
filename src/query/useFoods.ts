import { useQuery } from '@tanstack/react-query'
import { foodSchema } from '../food'
import { z } from 'zod'

export function useFoods() {
  return useQuery({
    queryFn: async () => {
      const response = await fetch('http://localhost:3001/foods')
      const foodsResponse = await response.json()
      return z.array(foodSchema).parse(foodsResponse)
    },
    queryKey: ['foods'],
    initialData: [],
  })
}

import { z } from 'zod'

export const tagSchema = z.enum([
  'Breakfast',
  'Lunch',
  'Dinner',
  'Dessert',
  'Drink',
  'Appetizer',
  'Spicy',
  'Vegetarian',
  'Alcoholic',
])

export type FoodTag = z.infer<typeof tagSchema>

export const foodSchema = z.object({
  id: z.coerce.number(),
  name: z.string(),
  image: z.string(),
  price: z.number().default(0),
  description: z.string(),
  tags: z.array(tagSchema),
})

export type Food = z.infer<typeof foodSchema>

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

// export type FoodTag = (typeof foodTags)[number]

import { createTheme } from '@mantine/core'
import type { MantineColorsTuple } from '@mantine/core'

const lightColors: MantineColorsTuple = [
  '#e6f3ff',
  '#b3ddf2',
  '#80c6e8',
  '#6bb8e0',
  '#2c3e50',
  '#2c3e50',
  '#2c3e50',
  '#2c3e50',
  '#2c3e50',
  '#2c3e50',
]


const darkColors: MantineColorsTuple = [
  '#1a1a40', 
  '#3f3f70', 
  '#7070a3', 
  '#d3d3e6', 
  '#f5f5ff', 
  '#f5f5ff',
  '#f5f5ff',
  '#f5f5ff',
  '#f5f5ff',
  '#f5f5ff',
]

export const theme = createTheme({
  primaryColor: 'brand',
  colors: {
    brand: lightColors,
    darkBrand: darkColors
  },
})

import { createTheme } from '@mantine/core'
import type { MantineColorsTuple } from '@mantine/core'

const brandColors: MantineColorsTuple = [
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

export const theme = createTheme({
  primaryColor: 'brand',
  colors: {
    brand: brandColors,
  },
})

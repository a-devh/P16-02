// Mantine theme using the same KSU colors as tokens.css.
import { createTheme } from '@mantine/core'
 
export const theme = createTheme({
  primaryColor: 'gold',
  primaryShade: 5,          
  autoContrast: true,       
  black: '#000000',
  white: '#ffffff',
  fontFamily: "'Montserrat', system-ui, sans-serif",
  headings: { fontFamily: "'Montserrat', system-ui, sans-serif", fontWeight: '800' },
  defaultRadius: 'md',
  colors: {
    gold:   ['#fff9ea', '#fff4d4', '#ffe8a9', '#ffdd7f', '#ffd154', '#ffc629', '#e6b225', '#cc9e21', '#b28b1d', '#997719'],
    gray:   ['#f7f7f7', '#eff0f0', '#dfe1e0', '#d0d1d1', '#c0c2c1', '#b0b3b2', '#9ea1a0', '#8d8f8e', '#7b7d7d', '#6a6b6b'],
    green:  ['#e6f3ec', '#cce6d8', '#99ceb1', '#66b58b', '#339d64', '#00843d', '#007737', '#006a31', '#005c2b', '#004f25'],
    purple: ['#f6f2fd', '#ede6fb', '#dbcdf7', '#cab4f3', '#b89bef', '#a682eb', '#9575d4', '#8568bc', '#745ba4', '#644e8d'],
    orange: ['#fef3ec', '#fde7d8', '#fbcfb1', '#f9b78b', '#f79f64', '#f5873d', '#dc7a37', '#c46c31', '#ac5e2b', '#935125'],
    blue:   ['#f0f7ff', '#e0eeff', '#c2ddff', '#a3cdff', '#85bcff', '#66abff', '#5c9ae6', '#5289cc', '#4778b2', '#3d6799'],
    yellow: ['#ffffe6', '#ffffcc', '#ffff99', '#ffff66', '#ffff33', '#ffff00', '#e6e600', '#cccc00', '#b2b200', '#999900'],
  },
})

export default theme
 
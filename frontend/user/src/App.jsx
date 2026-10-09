import Index from './Index.jsx'
import { MantineProvider, createTheme } from '@mantine/core'
import './App.css'

const theme = createTheme({
  primaryColor: 'ksuGold',
  colors: {
    ksuGold: [
      '#fff9e6',
      '#fff0bf',
      '#ffe28a',
      '#ffd95c',
      '#ffc629',
      '#e6aa00',
      '#b88a00',
      '#8b6800',
      '#5c4500',
      '#302400',
    ],
  },
  fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
  headings: {
    fontFamily: "Georgia, 'Times New Roman', serif",
  },
})

function App() {
  return (
    <MantineProvider theme={theme}>
      <Index />
    </MantineProvider>
  )
}

export default App

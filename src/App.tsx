import './styles/App.css'
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import LandingPage from './pages/LandingPage02';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LandingPage />
    </ThemeProvider>
  )
}

export default App

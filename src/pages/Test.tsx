import '../styles/App.css'
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import Home from '../components/appBar/Home';
import Post1 from '../components/appBar/Post1';
import Post2 from '../components/appBar/Post2';
import Active from '../components/landingPage/Active';
import Default from '../components/landingPage/Default';
import Popular from '../components/landingPage/Popular';
import Name from '../components/landingPage/Name';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Home/>
      <Post2/>
      <Post1/>
      <br/>
      <Active playerName="양의지" />
      <Default playerName="양의지" />
      <br />
      <Popular />
      <Name />
      <br />
      <div className="app">
        <h1>KBO Note</h1>
        <p>React + TypeScript + Vite</p>
      </div>
    </ThemeProvider>
  )
}

export default App

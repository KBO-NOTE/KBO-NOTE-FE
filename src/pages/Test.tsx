import HomeAppBar from "../components/appBar/Home";
import Post1AppBar from "../components/appBar/Post1";
import Post2AppBar from "../components/appBar/Post2";
import "../styles/App.css";
// import { ThemeProvider } from "styled-components";
// import { theme } from "../styles/theme";
// import Home from "../components/appBar/Home";
// import Post1 from "../components/appBar/Post1";
// import Post2 from "../components/appBar/Post2";
// import Active from "../components/landingPage/Active";
// import Default from "../components/landingPage/Default";
// import Popular from "../components/landingPage/Popular";
// import Name from "../components/landingPage/Name";

function App() {
  return (
    <>
      <HomeAppBar />
      <br />
      <Post1AppBar />
      <br />
      <Post2AppBar />
    </>
  );
}

export default App;

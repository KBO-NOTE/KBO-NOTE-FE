import { Outlet } from "react-router-dom";
import "./styles/App.css";
import styled from "styled-components";

function App() {
  return (
    <MainContainer>
      <Outlet />
    </MainContainer>
  );
}

const MainContainer = styled.div`
  width: 640px;
  margin: 0 auto;
  height: 100vh;
`;

export default App;

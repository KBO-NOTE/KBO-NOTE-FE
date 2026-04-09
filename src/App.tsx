import styled from "styled-components";
import "./styles/App.css";
import { QueryClientProvider } from "@tanstack/react-query";

import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { Outlet } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import { queryClient } from "./api/queryClient";
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <MainContainer>
          <Outlet />
        </MainContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

const MainContainer = styled.div`
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
  height: 100vh;
`;

export default App;

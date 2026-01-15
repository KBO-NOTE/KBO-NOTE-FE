import styled from "styled-components";
import "./styles/App.css";
import { QueryClientProvider } from "@tanstack/react-query";
import "./styles/App.css";

import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { QueryClient } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <MainContainer>
          <Outlet />
        </MainContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

const MainContainer = styled.div`
  width: 640px;
  margin: 0 auto;
  height: 100vh;
`;

export default App;

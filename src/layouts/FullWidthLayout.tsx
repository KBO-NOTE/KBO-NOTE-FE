import styled from "styled-components";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ThemeProvider } from "styled-components";
import { theme } from "../styles/theme";
import GlobalStyle from "../styles/GlobalStyle";
import { Outlet } from "react-router-dom";

const queryClient = new QueryClient();

const FullWidthLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Container>
          <Outlet />
        </Container>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default FullWidthLayout;

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  min-height: 100vh;
`;

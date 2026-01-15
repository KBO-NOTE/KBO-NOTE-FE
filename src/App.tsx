import { QueryClientProvider } from "@tanstack/react-query";
import "./styles/App.css";
    
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { QueryClient } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

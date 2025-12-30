import { QueryClientProvider } from "@tanstack/react-query";
import "./styles/App.css";

import { QueryClient } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

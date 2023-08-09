import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import DisplayColors from "./components/DisplayColors";

function App() {
  const queryClient = new QueryClient();
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <DisplayColors />
      </QueryClientProvider>
    </div>
  );
}

export default App;

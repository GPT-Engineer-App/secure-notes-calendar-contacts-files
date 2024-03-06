import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import UserOverview from "./pages/UserOverview.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/user-overview" element={<UserOverview />} />
      </Routes>
    </Router>
  );
}

export default App;

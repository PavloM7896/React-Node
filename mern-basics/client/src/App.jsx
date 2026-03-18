import { Navigate, Route, Routes } from "react-router-dom";
import TodosPage from "./pages/TodosPage.jsx";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/todos" replace />} />
      <Route path="/todos" element={<TodosPage />} />
    </Routes>
  );
}

export default App;

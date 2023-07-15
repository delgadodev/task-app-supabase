import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import TaskProvider from "./context/TaskContext";

function App() {
  return (
    <>
      <TaskProvider>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TaskProvider>
    </>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import TaskProvider from "./context/TaskContext";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <TaskProvider>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile/:id" element={<Profile />} />
          </Route>
          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TaskProvider>
    </>
  );
}

export default App;

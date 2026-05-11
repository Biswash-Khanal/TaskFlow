import { Route, Routes } from "react-router";
import Home from "./Pages/Root";
import LoginPage from "./Pages/Login";
import RegisterPage from "./Pages/Register";
import AuthLayout from "./Layouts/AuthLayout";

const App = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route index element={<Home />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
      </Route>
    </Routes>
  );
};

export default App;

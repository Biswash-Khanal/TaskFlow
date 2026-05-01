import { Route, Routes } from "react-router";
import RootLayout from "./Layouts/RootLayout";
import Home from "./Pages/Root";
import LoginPage from "./Pages/Login";
import RegisterPage from "./Pages/Register";
import UsersPage from "./Pages/Users";

const App = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Home />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/users" element={<UsersPage />}></Route>
      </Route>
    </Routes>
  );
};

export default App;

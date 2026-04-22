import { Route, Routes } from "react-router";
import RootLayout from "./Layouts/RootLayout";
import Home from "./Pages/Home";

const App = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route
          index
          element={<Home />}
        ></Route>
      </Route>
    </Routes>
  );
};

export default App;

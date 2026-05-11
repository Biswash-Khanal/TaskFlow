import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AuthLayout = () => {
  return (
    <>
      <Navbar />
      <main
        id="main-container"
        className="mt-15 max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-center"
      >
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default AuthLayout;

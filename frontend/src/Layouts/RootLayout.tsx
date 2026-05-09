import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <main
        id="main-container"
        className="mt-15 border border-blue-500 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;

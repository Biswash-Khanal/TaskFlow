import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const RootLayout = () => {
  return (
        <>
          <Navbar />
          <div id="main-container" className="my-10 ">
            <Outlet />
          </div>
          <Footer />
        </>
  );
};

export default RootLayout;

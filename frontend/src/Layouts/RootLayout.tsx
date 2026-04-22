import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <>
      <div className="text-5xl font-bold">Navbar</div>
      <Outlet />
      <div>Footer</div>
    </>
  );
};

export default RootLayout;

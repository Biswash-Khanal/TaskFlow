import { Link } from "react-router";

const Navbar = () => {
  return (
    <div className="absolute top-0 left-0 w-full flex bg-yellow-300">
      <ul className="flex justify-around w-full">
        {[
          { name: "Register", path: "/register" },
          { name: "Login", path: "/login" },
        ].map((link) => {
          return (
            <li key={link.name}>
              <Link to={link.path}>{link.name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Navbar;

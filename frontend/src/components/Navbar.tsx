import { Link } from "react-router";
import Button from "./ui/Button";

const Navbar = () => {
  return (
    <div className="absolute top-0 left-0 w-full flex bg-bg-surface items-center justify-between px-4 h-13 border border-border-default">
      <p className="logo">
        Task<span className="">Flow</span>
      </p>
      <Link to={"/login"}></Link>
      <Link to={"/register"}></Link>
      <ul className="flex items-center gap-5">
        <li>
          <Link to={"/login"}>
            <Button label="Log in" size="md" variant="ghost" />
          </Link>
        </li>
        <li>
          <Link to={"/Register"}>
            <Button label="Get Started" size="md" />
          </Link>
        </li>

        <li></li>
      </ul>
    </div>
  );
};
export default Navbar;

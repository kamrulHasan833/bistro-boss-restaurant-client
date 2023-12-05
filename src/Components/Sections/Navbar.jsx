import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Item from "../Shared/Item";

function Navbar() {
  const { user, signout } = useAuth();

  const items = [
    { id: 1, name: "home", path: "/" },
    { id: 2, name: "constact us", path: "/contact-us" },
    { id: 3, name: "dashboard", path: "/dashboard" },
    { id: 4, name: "our menu", path: "/our-menu" },
    { id: 5, name: "our shop", path: "/our-shop" },
    { id: 6, name: "", path: "/message" },
  ];
  const itemNodes = (
    <>
      {items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </>
  );

  return (
    <div className="navbar bg-black bg-opacity-50 z-20 fixed left-0 right-0 top-0 px-6 md:px-10 xl:px-12 py-4 max-w-large mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn text-white btn-ghost xl:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-black bg-opacity-90 hover:text-white rounded-box w-64 "
          >
            {itemNodes}
          </ul>
        </div>
        <a className=" flex flex-col font-[900]  font-cinzel text-2xl md:text-[2rem] text-white  uppercase">
          <span>Bistro boss</span>
          <span className="font-normal  text-xl md:text-2xl tracking-[7.5px]">
            restaurant
          </span>
        </a>
      </div>
      <div className="navbar-center hidden xl:flex flex-grow">
        <ul className="menu menu-horizontal px-1">{itemNodes}</ul>
      </div>
      <div className="navbar-end  ">
        {user ? (
          <button
            onClick={() => signout()}
            className="text-white flex items-center gap-1 hover:text-primary-color"
            to="/signout"
          >
            <FaSignOutAlt /> Sign out
          </button>
        ) : (
          <Link
            className="text-white flex items-center gap-1 hover:text-primary-color"
            to="/signin"
          >
            <FaSignInAlt />
            Sign in
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;

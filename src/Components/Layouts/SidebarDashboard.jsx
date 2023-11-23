import { FaCalendarCheck } from "react-icons/fa";
import { FaBars, FaBook } from "react-icons/fa6";
import { GiShoppingBag } from "react-icons/gi";
import { IoMdHome } from "react-icons/io";
import { IoCalendar, IoCart } from "react-icons/io5";

import { AiOutlineBars } from "react-icons/ai";
import { HiMiniUserGroup } from "react-icons/hi2";
import { ImSpoonKnife } from "react-icons/im";
import { MdDashboard, MdEmail, MdPayment, MdReviews } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import useIsAdmin from "../../hooks/useIsAdmin";

const Dashboard = () => {
  const { isAdmin, isLoading } = useIsAdmin();

  const mainPath = "/dashboard";

  const userItems = [
    {
      id: 1,
      name: "user home",
      path: `${mainPath}`,
      icon: <IoMdHome className="text-2xl md:text-2xl" />,
    },
    {
      id: 2,
      name: "reservation",
      path: `${mainPath}/payment-getway`,
      icon: <IoCalendar className="text-xl md:text-2xl" />,
    },
    {
      id: 3,
      name: "payment history",
      path: `${mainPath}/payment-history`,
      icon: <MdPayment className="text-xl md:text-2xl" />,
    },
    {
      id: 4,
      name: "my cart",
      path: `${mainPath}/my-cart`,
      icon: <IoCart className="text-xl md:text-2xl" />,
    },
    {
      id: 5,
      name: "add review",
      path: `${mainPath}/add-review`,
      icon: <MdReviews className="text-xl md:text-2xl" />,
    },
    {
      id: 6,
      name: "my booking",
      path: `${mainPath}/my-booking`,
      icon: <FaCalendarCheck className="text-xl md:text-2xl" />,
    },
  ];
  const adminItems = [
    {
      id: 1,
      name: "admin home",
      path: `${mainPath}`,
      icon: <IoMdHome className="text-2xl md:text-2xl" />,
    },
    {
      id: 2,
      name: "add item",
      path: `${mainPath}/add-item`,
      icon: <ImSpoonKnife className="text-xl md:text-2xl" />,
    },
    {
      id: 3,
      name: "manage items",
      path: `${mainPath}/manage-items`,
      icon: <AiOutlineBars className="text-xl md:text-2xl" />,
    },
    {
      id: 4,
      name: "manage bookings",
      path: `${mainPath}/manage-bookings`,
      icon: <FaBook className="text-xl md:text-2xl" />,
    },
    {
      id: 5,
      name: "all users",
      path: `${mainPath}/all-users`,
      icon: <HiMiniUserGroup className="text-xl md:text-2xl" />,
    },
  ];

  const commonItems = [
    {
      id: 1,
      name: "home",
      path: `/`,
      icon: <IoMdHome className="text-2xl md:text-2xl" />,
    },
    {
      id: 2,
      name: "menu",
      path: `/our-menu`,
      icon: <FaBars className="text-xl md:text-2xl" />,
    },
    {
      id: 3,
      name: "our shop",
      path: `/our-shop`,
      icon: <GiShoppingBag className="text-xl md:text-2xl" />,
    },
    {
      id: 4,
      name: "contact",
      path: `/contact`,
      icon: <MdEmail className="text-xl md:text-2xl" />,
    },
  ];

  return (
    <div className="drawer xl:drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content absolute">
        {/* Page content here */}
        <label
          htmlFor="my-drawer"
          className=" btn bg-transparent border-none mt-6 ml-6 md:ml-10 drawer-button xl:hidden"
          title="Open Dashboard"
        >
          <MdDashboard className="text-4xl md:text-5xl" />
        </label>
      </div>
      <div className="drawer-side z-20">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay opacity-0"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-primary-color text-base-content font-cinzel ">
          {/* Sidebar content here */}
          <li>
            <Link
              to="/dashboard"
              className="flex flex-col  text-title-color gap-0 items-start mt-8 md:mt-12 mb-10 md:mb-16"
            >
              <span className="text-xl md:text-2xl font-[900] ">
                BISTRO BOSS{" "}
              </span>
              <span className="text-base md:text-lg font-bold tracking-[5px] md:tracking-[6.647px] ">
                Restaurant
              </span>
            </Link>
          </li>
          {/* user menu items */}
          {isLoading ? (
            <p>Loading..</p>
          ) : !isLoading && isAdmin ? (
            adminItems.map(({ id, name, icon, path }) => (
              <li key={id}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `font-bold text-base ${
                      isActive ? "text-white" : "text-title-color"
                    }`
                  }
                >
                  {icon} {name}
                </NavLink>
              </li>
            ))
          ) : (
            userItems.map(({ id, name, icon, path }) => (
              <li key={id}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `font-bold text-base ${
                      isActive ? "text-white" : "text-title-color"
                    }`
                  }
                >
                  {icon} {name}
                </NavLink>
              </li>
            ))
          )}
          <li>
            {" "}
            <hr className="rounded-none mt-6 mb-2"></hr>{" "}
          </li>
          {/* common menu items */}
          {commonItems.map(({ id, name, icon, path }) => (
            <li key={id}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `font-bold text-base ${
                    isActive ? "text-white" : "text-title-color"
                  }`
                }
              >
                {icon} {name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;

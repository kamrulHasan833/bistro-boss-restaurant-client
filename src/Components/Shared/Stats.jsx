import PropTypes from "prop-types";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaUsers } from "react-icons/fa";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { IoFastFoodOutline } from "react-icons/io5";

const Stats = ({ value }) => {
  const stats = [
    {
      id: 1,
      icon: <FaMoneyCheckDollar className="text-white text-2xl md:text-3xl" />,
      value: value?.revenue,
      name: "revenue",
    },
    {
      id: 2,
      icon: <FaUsers className="text-white text-2xl md:text-3xl" />,
      value: value?.customers,
      name: "customers",
    },
    {
      id: 3,
      icon: <IoFastFoodOutline className="text-white text-2xl md:text-3xl" />,
      value: value?.products,
      name: "products",
    },
    {
      id: 4,
      icon: <CiDeliveryTruck className="text-white text-2xl md:text-3xl" />,
      value: value?.orders,
      name: "orders",
    },
  ];

  return (
    <div className="stats rounded-none shadow-none gap-6 w-full pb-6">
      {stats.map(({ id, icon, value, name }) => (
        <div
          className={`stat text-white bg-gradient-to-l border-none capitalize ${
            name === "revenue"
              ? " from-[#BB34F5] to-[#FCDBFF]"
              : name === "customers"
              ? " from-[#D3A256] to-[#FDE8C0]"
              : name === "products"
              ? " from-[#FE4880] to-[#FECDE9]"
              : " from-[#6AAEFF] to-[#B6F7FF]"
          } rounded-lg`}
          key={id}
        >
          <div className="stat-value font-semibold">
            {name === "revenue" ? `$ ${value}` : value}
          </div>
          <div className="stat-title text-white">{name}</div>

          <div className="stat-figure text-secondary">{icon}</div>
        </div>
      ))}
    </div>
  );
};
Stats.propTypes = {
  value: PropTypes.object,
};
export default Stats;

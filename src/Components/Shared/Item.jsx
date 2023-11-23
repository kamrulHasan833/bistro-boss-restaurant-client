import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
function Item({ item }) {
  const { name, path } = item;
  return (
    <li>
      <NavLink
        className={({ isActive }) =>
          `uppercase text-sm md:text-base  font-semibold bord border-none hover:text-active-color bg-transparent focus-within:bg-transparent ${
            isActive ? "text-active-color border" : "text-white"
          }`
        }
        to={path}
      >
        {name}
      </NavLink>
    </li>
  );
}

Item.propTypes = {
  item: PropTypes.object,
};

export default Item;

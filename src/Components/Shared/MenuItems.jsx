import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import useMenuByCategory from "../../hooks/useMenuByCategory";
import MenuItem from "./MenuItem";
import SectionHeader from "./SectionHeader";
function MenuItems({ category_name }) {
  const category = category_name;
  const items = useMenuByCategory(category);
  return (
    <>
      {category === "popular" || category === "offer" ? (
        <SectionHeader
          title={category === "popular" ? "FROM OUR MENU" : "TODAY'S OFFER"}
          subTitle={category === "popular" ? "Check it out" : "Don't miss"}
        ></SectionHeader>
      ) : (
        <div className="pt-16 md:pt-[90px]"></div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
        {" "}
        {items &&
          items.length > 0 &&
          items.map((item) => <MenuItem key={item._id} item={item} />)}
      </div>
      <div className="text-center pt-6 md:pt-10">
        <Link
          state={category === "offer" ? null : category}
          className="uppercase text-lg md:text-xl font-medium text-secondary-color py-4 md:py-5 border-b-2 border-secondary-color rounded-lg px-6 md:px-[30px] hover:bg-secondary-color hover:text-white"
          to={category === "popular" ? "/our-menu" : `/our-shop`}
        >
          {category === "popular"
            ? "View Full  Menu"
            : "ORDER YOUR FAVOURITE FOOD"}
        </Link>
      </div>
    </>
  );
}

MenuItems.propTypes = {
  category_name: PropTypes.string,
};

export default MenuItems;

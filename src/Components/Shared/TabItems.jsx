import PropTypes from "prop-types";
import Food from "./Food";
import SectionWrapper from "./SectionWrapper";

const TabItems = ({ items }) => {
  return (
    <SectionWrapper>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 md:mt-8">
        {items &&
          items.length > 0 &&
          items.map((item) => <Food key={item._id} food={item} />)}
      </div>
    </SectionWrapper>
  );
};

TabItems.propTypes = {
  items: PropTypes.array,
};

export default TabItems;

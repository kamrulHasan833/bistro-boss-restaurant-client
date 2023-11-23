import PropTypes from "prop-types";

function MenuItem({ item }) {
  const { image, recipe, name, price } = item;

  return (
    <div className="flex items-center gap-5 md:gap-6">
      <div>
        <img
          src={image}
          alt=""
          className="max-w-[90px] md:max-w-[118px] h-[78px] md:h-[104px]  rounded-full rounded-tl-none"
        />
      </div>
      <div className="flex gap-6 ">
        <div>
          <h2 className="font-cinzel text-lg md:text-xl mb-1 md:mb-2 text-title-color font-medium">
            {" "}
            {name}------------------
          </h2>
          <p className="text-desc-color text-sm md:text-base">{recipe}</p>
        </div>

        <p className="text-lg md:text-xl  text-price-color">${price}</p>
      </div>
    </div>
  );
}

MenuItem.propTypes = {
  item: PropTypes.object,
};

export default MenuItem;

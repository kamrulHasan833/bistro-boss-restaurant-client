import PropTypes from "prop-types";

function OrderSlide({ food }) {
  const { image, name } = food;
  return (
    <div className="relative">
      <img src={image} alt="" className="w-full" />
      <div className="absolute  pb-4 md:pb-6 font-cinzel left-0 bottom-0 text-center w-full  ">
        <p className="text-2xl md:text-3xl text-white">{name}</p>
      </div>
    </div>
  );
}

OrderSlide.propTypes = {
  food: PropTypes.object,
};

export default OrderSlide;

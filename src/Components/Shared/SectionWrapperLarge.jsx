import PropTypes from "prop-types";

function SectionWrapperLarge({ children }) {
  return <div className="max-w-large  mx-auto mt-12 md:mt-16">{children}</div>;
}

SectionWrapperLarge.propTypes = {
  children: PropTypes.node,
};

export default SectionWrapperLarge;

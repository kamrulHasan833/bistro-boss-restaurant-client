import PropTypes from "prop-types";

const SectionWrapperSmall = ({ children }) => {
  return <div className="max-w-small mx-6 xl:mx-auto ">{children}</div>;
};

SectionWrapperSmall.propTypes = {
  children: PropTypes.node,
};

export default SectionWrapperSmall;

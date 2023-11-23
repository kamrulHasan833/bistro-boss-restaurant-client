import PropTypes from "prop-types";

function SectionWrapper({ children }) {
  return <div className="max-w-standard px-6 mx-auto ">{children}</div>;
}

SectionWrapper.propTypes = {
  children: PropTypes.node,
};

export default SectionWrapper;

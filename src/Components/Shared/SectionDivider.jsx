import PropTypes from "prop-types";

function SectionDivider({ children }) {
  return <div className="pt-16 md:pt-[92px]">{children}</div>;
}

SectionDivider.propTypes = {
  children: PropTypes.node,
};

export default SectionDivider;

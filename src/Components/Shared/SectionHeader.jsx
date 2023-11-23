import PropTypes from "prop-types";

function SectionHeader({ title, subTitle }) {
  return (
    <div className="text-center pt-16 md:pt-[92px] pb-8 md:pb-12">
      <h5 className="text-primary-color text-lg md:text-xl pb-3 md:pb-4 ">
        ---{subTitle}---
      </h5>
      <h3 className="text-3xl md:text-[40px] text-title-color mx-auto max-w-[424px] border-y-4 border-border-color py-4 md:py-5 uppercase">
        {title}
      </h3>
    </div>
  );
}

SectionHeader.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
};

export default SectionHeader;

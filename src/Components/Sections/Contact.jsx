import SectionWrapper from "../Shared/SectionWrapper";
function Contact() {
  return (
    <section>
      <SectionWrapper>
        <div className="bg-black min-h-[180px] md:min-h-[250px] flex items-center justify-center mt-16 md:mt-[130px] font-cinzel">
          <h3 className="text-white text-3xl md:text-4 lg:text-[50px] font-semibold">
            Call Us: +88 0192345678910
          </h3>
        </div>
      </SectionWrapper>
    </section>
  );
}

export default Contact;

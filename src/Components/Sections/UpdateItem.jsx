import SectionHeader from "../Shared/SectionHeader";
import SectionWrapperSmall from "../Shared/SectionWrapperSmall";
import UpdateItemForm from "./UpdateItemForm";

const UpdateItem = () => {
  return (
    <section>
      <SectionWrapperSmall>
        <SectionHeader title="UPDATE ITEM" subTitle="What's new?" />

        <UpdateItemForm />
      </SectionWrapperSmall>
    </section>
  );
};

export default UpdateItem;

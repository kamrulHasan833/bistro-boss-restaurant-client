import AddItemForm from "../Shared/AddItemForm";
import SectionHeader from "../Shared/SectionHeader";
import SectionWrapperSmall from "../Shared/SectionWrapperSmall";

const AddItem = () => {
  return (
    <section>
      <SectionWrapperSmall>
        <SectionHeader title="ADD AN ITEM" subTitle="What's new?" />

        <AddItemForm />
      </SectionWrapperSmall>
    </section>
  );
};

export default AddItem;

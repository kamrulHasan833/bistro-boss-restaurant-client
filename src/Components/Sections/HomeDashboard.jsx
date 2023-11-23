import useIsAdmin from "../../hooks/useIsAdmin";
import SectionWrapperSmall from "../Shared/SectionWrapperSmall";
import AdminHome from "./AdminHome";

const HomeDashboard = () => {
  const { isAdmin, isLoading } = useIsAdmin();
  return (
    <section>
      <SectionWrapperSmall>
        {!isLoading && isAdmin ? <AdminHome /> : "hi"}
      </SectionWrapperSmall>
    </section>
  );
};

export default HomeDashboard;

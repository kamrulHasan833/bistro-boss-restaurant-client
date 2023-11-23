import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MenuCover from "../Shared/MenuCover";
import MenuItems from "../Shared/MenuItems";
import SectionWrapper from "../Shared/SectionWrapper";

function Menu() {
  const { pathname } = useLocation();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch(`${location.origin}/menu_covers.json`)
      .then((res) => res.json())
      .then((data) => {
        const filteredCat =
          pathname === "/"
            ? data.filter((category) => category.category === "popular")
            : data.filter((category) => category.category !== "popular");
        setCategories(filteredCat);
      });
  }, [pathname]);

  return (
    <>
      {pathname === "/" ? (
        <section>
          {categories &&
            categories.length > 0 &&
            categories.map((category, i) => (
              <SectionWrapper key={i}>
                <MenuCover category_details={category} />
                <MenuItems category_name={category.category} />
              </SectionWrapper>
            ))}
        </section>
      ) : (
        <section>
          {categories &&
            categories.length > 0 &&
            categories.map((category, i) => (
              <div key={i}>
                <div
                  className={`max-w-large mx-auto ${
                    category.category === "offer" ? "" : "mt-16 md:mt-20"
                  }`}
                >
                  <MenuCover category_details={category} />
                </div>
                <SectionWrapper>
                  {" "}
                  <MenuItems category_name={category.category} />
                </SectionWrapper>
              </div>
            ))}
        </section>
      )}
    </>
  );
}

export default Menu;

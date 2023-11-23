import {
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

import useMenuByCategory from "../../hooks/useMenuByCategory";
import SectionDivider from "../Shared/SectionDivider";
import TabItems from "../Shared/TabItems";
function ShopTabs() {
  const tabs = ["salad", "pizza", "soup", "dessert", "drinks"];
  const { state } = useLocation();
  const current_index = tabs.indexOf(state);
  const [index, setIndex] = useState(state ? current_index : 0);
  const items = useMenuByCategory(tabs[index]);

  const handleGet = (i) => {
    setIndex(i);
  };
  return (
    <SectionDivider>
      <Tabs
        position="relative"
        variant="unstyled"
        align="center"
        defaultIndex={index}
        onChange={(i) => {
          handleGet(i);
        }}
      >
        <TabList>
          {tabs &&
            tabs.length > 0 &&
            tabs.map((category, id) => (
              <Tab
                className="uppercase text-base md:text-xl font-medium text-title-color"
                key={id}
              >
                {category}
              </Tab>
            ))}
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          className="bg-primary-color"
          borderRadius="1px"
        />
        <TabPanels>
          {items &&
            items.length > 0 &&
            tabs.map((tab, id) => (
              <TabPanel key={id}>
                <TabItems items={items} />
              </TabPanel>
            ))}
        </TabPanels>
      </Tabs>
    </SectionDivider>
  );
}

export default ShopTabs;

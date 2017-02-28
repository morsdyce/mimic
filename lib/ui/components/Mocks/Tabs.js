import React from 'react';
import { TabsContainer, Tab, TabsText } from 'ui/components/Mocks/styled';

const Tabs = (props) => (
  <TabsContainer>
    {
      props.options.map(
        (tab) => (
          <Tab isSelected={ tab === props.selectedTab }
               onClick={ () => props.selectTab(tab) }
               key={ tab }>
            { tab }
          </Tab>
        )
      )
    }
    <TabsText>In URI and body * means anything, \* means *</TabsText>
  </TabsContainer>
);

export default Tabs;

import React, { useState } from 'react';
import styled from 'styled-components';

// Definición de las props del componente
interface ChromeTabsProps {
  tabs: string[]; // Array de títulos de las pestañas
  activeTab: number; // Título de la pestaña activa
  onClick: (tabTitle: string) => void; // Función a ejecutar al hacer clic en una pestaña
}

interface TabsProps {
  tabs?: string[];
  components?: React.ReactNode[];
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 0.4rem;
`;

const TabContainer = styled.div`
  display: flex;
  border-bottom 0.5px solid #e4cafc;
  width: 100%;
`;

const Tab = styled.div<{ isActive: boolean }>`
  padding: 2px 10px;
  border: 1px solid #e4cafc;
  border-bottom: none;
  margin-right: 2px;
  background-color: ${(props) => (props.isActive ? '#fff' : '#f1ecfc')};
  cursor: pointer;
  border-radius: 5px 5px 0 0;

  color: #49206f;

  &:hover {
    background-color: ${(props) => (props.isActive ? '#fff' : '#e2daf4')};
  }
`;

const ContainerComponent = styled.div`
  width: 100%;
  height: 100%;
`;

const ContainerComponentInto = styled.div`
  width: 100%;
  height: calc(100% - 1.5rem);
  border: 1px solid #e4cafc;
  background-color: #fff;
`;

const ChromeTabs: React.FC<ChromeTabsProps> = ({ tabs = [], activeTab, onClick = () => true }) => {
  return (
    <TabContainer>
      {tabs.map((tab, index) => (
        <Tab key={tab} isActive={index === activeTab} onClick={() => onClick(tab)}>
          {tab}
        </Tab>
      ))}
    </TabContainer>
  );
};

function Tabs({ tabs = ['Simulator', 'Devices', 'Reference'], components = [] }: TabsProps) {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabClick = (tabTitle: string) => {
    const index = tabs.indexOf(tabTitle);
    console.log('Clicked on:', index);
    setActiveTab(index);
  };

  return (
    <Container>
      <ChromeTabs tabs={tabs} activeTab={activeTab} onClick={handleTabClick} />
      <ContainerComponent>
        <ContainerComponentInto>{components[activeTab] ?? <div>Tab {activeTab}</div>}</ContainerComponentInto>
      </ContainerComponent>
    </Container>
  );
}

export default Tabs;

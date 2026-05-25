import { Outlet } from 'react-router-dom';
import { styled } from '@zeiss/beyond-online-react';

import { Header, SideNavigation, Footer } from '../components';

const StyledContentArea = styled.div`
  display: flex;
  flex-direction: row;
  padding: var(--spacing-s);
  background: var(--color-global-background-01);
`;

export const LayoutWithSideNavigation = () => {
  return (
    <>
      <Header />
      <StyledContentArea>
        <SideNavigation />

        <Outlet />
      </StyledContentArea>
      <Footer/>
    </>
  );
}
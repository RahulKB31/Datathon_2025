import { Outlet } from 'react-router-dom';
import { styled } from '@zeiss/beyond-online-react';

import { Header, Footer } from '../components';

const StyledContentArea = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 120px); /* Adjust based on header height */
  background: var(--color-global-background-primary);
`;

export const LayoutWithoutSideNavigation = () => {
  return (
    <>
      <Header />
      <StyledContentArea>
        <Outlet />
      </StyledContentArea>
      <Footer />
    </>
  );
};

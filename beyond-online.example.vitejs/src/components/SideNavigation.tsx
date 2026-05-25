import {
  SideNavigation as BeyondOnlineSideNavigation,
  SideNavigationProps as BeyondOnlineSideNavigationProps,
  styled
} from '@zeiss/beyond-online-react';
import { RoutesPath } from '../routes';

const StyledSideNavigation = styled(BeyondOnlineSideNavigation)`
  height: calc(100vh - 103px - 75px);
  position: sticky;

  @media (min-width: 0) and (max-width: 767px) {
    display: none;
    visibility: hidden;
  }
`;

export const SideNavigation = () => {
  const sideNavGroups: BeyondOnlineSideNavigationProps['groups'] = [
    [
      {
        title: 'Orders',
        icon: 'Placeholder',
        href: RoutesPath.Orders,
      },
    ],
  ];

  return <StyledSideNavigation groups={sideNavGroups} expanded />;
}
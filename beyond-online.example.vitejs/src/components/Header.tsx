import {
  ApplicationHeader as BeyondApplicationHeader,
  AvatarFlyout as BeyondAvatarFlyout,
  Icon20,
} from '@zeiss/beyond-online-react';

export const Header = () => {
  const primaryUtilities = [
    {
      content: <Icon20 icon="Search" />,
      visibleOnMobile: true,
    },
    {
      content: <Icon20 icon="ShoppingCart" />,
    },
    {
      content: (
        <BeyondAvatarFlyout
          fitContent
          fullName="Test User"
          groups={[
            [
              { href: '/', title: 'Item Name 1' },
              { href: '/', title: 'Item Name 2' },
              { href: '/', title: 'Item Name 3' },
            ],
            [
              { href: '/', title: 'Item Name 4' },
              { href: '/', title: 'Item Name 5' },
              { href: '/', title: 'Item Name 6' },
            ],
            [
              { href: '/', title: 'Account settings' },
              { href: '/', title: 'Log out' },
            ],
          ]}
          position="bottom-right"
          profileLink="https://www.zeiss.com/"
          size="m"
        />
      ),
      visibleOnMobile: true,
    },
    {
      content: <Icon20 icon="NavigationApps" />,
    },
  ];

  return (
    <BeyondApplicationHeader
      applicationTitle="Example Application"
      logo={{
        variant: 'default'
      }}
      shellLayout={'with-side-nav'}
      primaryUtilities={primaryUtilities}
    />
  );
}

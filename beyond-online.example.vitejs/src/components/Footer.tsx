import { Footer as BeyondOnlineFooter } from '@zeiss/beyond-online-react';

export const Footer = () => {
  return (
    <BeyondOnlineFooter
      primaryContent={{
        actions: [
          {
            label: 'Contact',
            onClick: () => {},
          },
          {
            label: 'Publisher',
            onClick: () => {},
          },
          {
            label: 'Legal Notice',
            onClick: () => {},
          },
          {
            label: 'Data Protection',
            onClick: () => {},
          },
          {
            label: 'Tracking Preferences',
            onClick: () => {},
          },
          {
            href: 'http://zeiss.com',
            label: 'Link 1',
          },
          {
            href: 'http://zeiss.com',
            label: 'Link 2',
          },
        ],
        headline: 'Legal',
      }}
      productName="Example App v1.0"
      title={{
        label: 'ZEISS International',
        onClick: () => {},
      }}
      shellLayout="with-side-nav" />
  );
}
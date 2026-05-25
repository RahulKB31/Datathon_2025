import { Link } from 'react-router-dom';

import { LinkComponent } from '@zeiss/beyond-online-react';

export const ReactRouterLinkComponent: LinkComponent = ({
  href,
  ref,
  ...props
}) => {
  return <Link to={href || ''} {...props} />;
};
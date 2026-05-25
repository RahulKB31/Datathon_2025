import { RouterProvider } from 'react-router-dom';
import {
  createConfig,
  GlobalConfigContext,
  StyleSheetManager,
  ReactToastifyToastLayer,
} from '@zeiss/beyond-online-react';
import { routes } from './routes';
import { ReactRouterLinkComponent } from './components';

function App() {
  const config = createConfig({
    global: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      linkComponent: ReactRouterLinkComponent,
    }
  });

  return (
    <GlobalConfigContext.Provider value={config}>
      <ReactToastifyToastLayer />

      <StyleSheetManager>
        <RouterProvider router={routes} />
      </StyleSheetManager>
    </GlobalConfigContext.Provider>
  );
}

export default App;

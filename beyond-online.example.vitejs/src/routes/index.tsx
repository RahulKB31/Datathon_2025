import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
} from 'react-router-dom';

import { LayoutWithSideNavigation, LayoutWithoutSideNavigation } from '../layouts';
import { OrdersPage, ProductsPage } from '../views';

export enum RoutesPath {
  Products = 'products',
  Orders = 'orders',
}

export const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<LayoutWithoutSideNavigation />}>
        <Route index element={<Navigate to={RoutesPath.Products} replace />} />
        <Route path={RoutesPath.Products} element={<ProductsPage />} />
      </Route>
      <Route path={RoutesPath.Orders} element={<LayoutWithSideNavigation />}>
        <Route index element={<OrdersPage />} />
      </Route>
    </>
  ),
);

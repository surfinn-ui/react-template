import { Navigate, useRoutes } from 'react-router-dom';
import { DefaultLayout } from '../layouts/DefaultLayout';
import { DemoLayout } from '../layouts/DemoLayout';
import { ErrorLayout } from '../layouts/ErrorLayout';
import { Error404Screen, Error500Screen } from '../screens';
import { Demo, Main } from './elements';

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <DefaultLayout />,
      children: [
        {
          path: '',
          element: <Main />,
          index: true,
        },
      ],
    },

    {
      path: 'demo',
      element: <DemoLayout />,
      children: [
        {
          path: '',
          element: <Demo />,
          index: true,
        },
      ],
    },

    /*
     * Error routes
     */

    {
      path: 'error',
      element: <ErrorLayout />,
      children: [
        {
          path: '404',
          element: <Error404Screen />,
        },
        {
          path: '500',
          element: <Error500Screen />,
        },
      ],
    },

    /*
     * Catch-all route
     */
    {
      path: '*',
      element: <Navigate to="/error/404" />,
    },
  ]);
}

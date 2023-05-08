import { ElementType, Suspense, lazy } from 'react';

const Loadable = (Component: ElementType) => (props: any) =>
  (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </Suspense>
  );

export const Main = Loadable(lazy(() => import('../pages/Main')));

export const Demo = Loadable(lazy(() => import('../pages/Demo')));

export const Error401 = Loadable(lazy(() => import('../screens/Error401')));
export const Error402 = Loadable(lazy(() => import('../screens/Error402')));
export const Error403 = Loadable(lazy(() => import('../screens/Error403')));
export const Error404 = Loadable(lazy(() => import('../screens/Error404')));

export const Error500 = Loadable(lazy(() => import('../screens/Error500')));
export const Error501 = Loadable(lazy(() => import('../screens/Error501')));
export const Error502 = Loadable(lazy(() => import('../screens/Error502')));
export const Error503 = Loadable(lazy(() => import('../screens/Error503')));

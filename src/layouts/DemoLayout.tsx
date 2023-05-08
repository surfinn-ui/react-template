import React from 'react';
import { Outlet } from 'react-router-dom';

export interface IDemoLayoutProps {}

export const DemoLayout = ({}: IDemoLayoutProps) => {
  return (
    <div>
      <h1>DemoLayout</h1>
      <Outlet />
    </div>
  );
};

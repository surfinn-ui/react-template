import React from 'react';
import { Outlet } from 'react-router-dom';

export interface IDefaultLayoutProps {}

export const DefaultLayout = ({}: IDefaultLayoutProps) => {
  return (
    <div>
      <h1>DefaultLayout</h1>
      <Outlet />
    </div>
  );
};

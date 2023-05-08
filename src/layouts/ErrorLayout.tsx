import React from 'react';
import { Outlet } from 'react-router-dom';

export interface IErrorLayoutProps {}

export const ErrorLayout = ({}: IErrorLayoutProps) => {
  return (
    <div>
      <h1>ErrorLayout</h1>
      <Outlet />
    </div>
  );
};

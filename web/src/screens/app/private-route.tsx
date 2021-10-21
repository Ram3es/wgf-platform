/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ComponentType, FunctionComponent } from 'react';
import { Redirect, Route, RouteComponentProps, RouteProps, useHistory } from 'react-router';

import { storageService } from '@services/storage/storage';

import { ROUTES } from '@constants/routes';

interface IPrivateRouteProps extends RouteProps {
  component: ComponentType<RouteComponentProps<any>> | ComponentType<any>;
}

export const PrivateRoute: FunctionComponent<IPrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { location } = useHistory();

  const isToken = storageService.getToken();

  if (!isToken) {
    return (
      <Redirect
        push
        to={{
          pathname: ROUTES.signIn,
          state: { from: location },
        }}
      />
    );
  }

  const renderRoute = (props: any) => <Component {...props} />;

  return <Route {...rest} render={renderRoute} />;
};

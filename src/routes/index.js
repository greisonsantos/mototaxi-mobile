import React, {useContext} from 'react';
import AuthContex from '../contexs/auth';

import AdminRoutes from './admin-routes';
import PublicRoutes from './public-routes';
import ClientsRoutes from './clients-routes';
import DriverRoutes from './drives-routes';
const Routes = () => {
  let {signed, user} = useContext(AuthContex);

  console.log(user);
  if (signed) {
    if (user.type === 'admin') {
      return <AdminRoutes />;
    } else if (user.type === 'client') {
      return <ClientsRoutes />;
    } else {
      return <DriverRoutes />;
    }
  } else {
    return <PublicRoutes />;
  }
};

export default Routes;

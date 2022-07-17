import React, {useContext} from 'react';
import AuthContex from '../contexs/auth';

import AdminRoutes from './admin-routes';
import PublicRoutes from './public-routes';

const Routes = () => {
  const {signed, user} = useContext(AuthContex);

  if (signed) {
    if (user.type === 'admin') {
      return <AdminRoutes />;
    } else if (user.type === 'client') {
      console.log('rotas dos clientes');
    } else {
      console.log('rotas dos  motoritas');
    }
  } else {
    return <PublicRoutes />;
  }
};

export default Routes;

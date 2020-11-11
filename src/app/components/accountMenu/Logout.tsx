import React from 'react';
import { useHistory } from 'react-router-dom';
import { logout } from '../../lib/api';

function Logout() {
  const history = useHistory();
  function handleLogout() {
    logout().then(() => {
      history.push('/login');
    });
  }
  return <div onClick={() => handleLogout()}>Logout</div>;
}

export default Logout;

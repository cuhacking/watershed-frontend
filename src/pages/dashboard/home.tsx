import React from 'react';
import {useHistory} from 'react-router-dom';
import {useAuth} from '../../hooks';

export default () => {
  const history = useHistory();
  const {signOut} = useAuth();

  const handleClick = async () => {
    await signOut();
    history.push('/dashboard/login');
  };

  return (
    <div>
      <h1>Dashboard Home!</h1>
      <button onClick={handleClick}>Sign Out</button>
    </div>
  );
};

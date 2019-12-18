import React, {useContext} from 'react';
import {AppContext} from '../components/AppContext';

const Logout = () => {
  const [auth, setAuth] = useContext(AppContext);
  const logout = async () => {
    const data = await fetch('http://localhost:1111/api/users/logout.php', {
      credentials: 'include'
    });

    const response = await data.json();
    console.log(response);

    localStorage.clear();
    setAuth(false);
  };

  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Logout;

import React, {useState, useContext} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {AppContext} from '../components/AppContext';

const Start = () => {
  const [auth, setAuth] = useContext(AppContext);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState(null);

  const handlePassword = event => {
    setPassword(event.target.value);
    setErrors(null);
  };

  const handleEmail = event => {
    setEmail(event.target.value);
    setErrors(null);
  };

  const login = async event => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    const response = await fetch('http://localhost:1111/api/users/login.php', {
      method: 'POST',
      body: formData,
      credentials: 'include'
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('user', data.user);
      setAuth(true);
    } else {
      setErrors(data.message);
    }
    setPassword('');
  };

  if (auth) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <p className="login-text">
        Log in to see photos and gifs from your friends.
      </p>
      <form onSubmit={login}>
        <input
          type="email"
          onChange={handleEmail}
          value={email}
          placeholder="Email"
          required
        />
        <input
          type="password"
          onChange={handlePassword}
          value={password}
          placeholder="Password"
          required
        />
        <button>Log In</button>
      </form>
      {errors && <p className="error-text">{errors}</p>}
      <Link className="login-link" to="/signup">
        Don't have an account? Sign Up
      </Link>
    </div>
  );
};

export default Start;

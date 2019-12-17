import React, {useState, useEffect} from 'react';
import Nav from '../components/Nav';

const UpdateUser = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [biography, setBiography] = useState('');
  //Add context on which user is logged in

  const handleChangePassword = event => {
    setPassword(event.target.value);
  };
  const handleChangeEmail = event => {
    setEmail(event.target.value);
  };
  const handleChangeBiography = event => {
    setBiography(event.target.value);
  };

  const uploadPost = async event => {
    event.preventDefault();
    var formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('biography', biography);

    const data = await fetch('http://localhost:1111/api/users/updateuser.php', {
      method: 'POST',
      body: formData,
      credentials: 'include'
    });
    // if await is enabled error when string is empty but update database correctly
    const json = await data.json();
    console.log(json);
  };

  return (
    <div>
      <Nav />
      <form onSubmit={uploadPost}>
        <input
          type="text"
          onChange={handleChangeBiography}
          value={biography}
          placeholder="bio"
        />
        <input
          type="email"
          onChange={handleChangeEmail}
          value={email}
          placeholder="email"
        />
        <input
          type="password"
          onChange={handleChangePassword}
          value={password}
          placeholder="password"
        />
        <button>SEND</button>
      </form>
    </div>
  );
};

export default UpdateUser;
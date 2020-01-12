import React, {useState, useEffect} from 'react';
import Nav from '../components/Nav';

const UpdateUser = () => {
  const [avatar, setAvatar] = useState('');
  const [label, setLabel] = useState('Choose avatar');
  const [biography, setBiography] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    getSettings();
  }, []);

  const getSettings = async () => {
    const response = await fetch(
      'http://localhost:1111/api/users/settings.php',
      {
        credentials: 'include'
      }
    );
    const data = await response.json();
    setBiography(data.biography);
    setEmail(data.email);
  };

  const handleAvatar = event => {
    setErrors(null);
    setLabel('Avatar chosen');
    setAvatar(event.target.files[0]);
  };

  const handlePassword = event => {
    setErrors(null);
    setPassword(event.target.value);
  };

  const handleEmail = event => {
    setErrors(null);
    setEmail(event.target.value);
  };

  const handleBiography = event => {
    setErrors(null);
    setBiography(event.target.value);
  };

  const editAccount = async event => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    const response = await fetch(
      'http://localhost:1111/api/users/editaccount.php',
      {
        method: 'POST',
        body: formData,
        credentials: 'include'
      }
    );

    const data = await response.json();
    !response.ok && setErrors(data.message);
    setPassword('');
  };

  const editSettings = async event => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('image', avatar);
    formData.append('biography', biography);

    const response = await fetch(
      'http://localhost:1111/api/users/editsettings.php',
      {
        method: 'POST',
        body: formData,
        credentials: 'include'
      }
    );

    const data = await response.json();
    // if (response.ok) {
    //   // setLabel('Saved');
    // } else {
    //   setLabel('Choose avatar');
    //   setErrors(data.message);
    // }
    // getSettings();
  };

  if (biography === null && email === null) {
    return <Nav />;
  }

  return (
    <div>
      <Nav />
      <div className="content">
        <div className="general-form">
          <form onSubmit={editSettings}>
            <label>
              {label}
              <input
                type="file"
                className="fileinput"
                onChange={handleAvatar}
              />
            </label>
            <input
              type="text"
              onChange={handleBiography}
              value={biography}
              placeholder="Biography"
            />
            <button>Save</button>
          </form>
          <form onSubmit={editAccount}>
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
            />
            <button>Save</button>
          </form>
          {errors && <p className="error-text">{errors}</p>}
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;

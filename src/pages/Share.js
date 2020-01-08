import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import Nav from '../components/Nav';

const Share = () => {
  const [redirect, setRedirect] = useState(false);
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose a file');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState([]);

  const handleFile = event => {
    setErrors('');
    setFilename('File selected');
    setFile(event.target.files[0]);
  };

  const handleDescription = event => {
    setErrors('');
    setDescription(event.target.value);
  };

  const uploadPost = async event => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('image', file);
    formData.append('description', description);

    const response = await fetch(
      'http://localhost:1111/api/posts/uploadpost.php',
      {
        method: 'POST',
        body: formData,
        credentials: 'include'
      }
    );
    response.ok ? setRedirect(true) : setErrors(response.message);
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <Nav />
      <div className="content">
        <div className="general-form">
          <form onSubmit={uploadPost}>
            <label>
              {filename}
              <input
                type="file"
                className="fileinput"
                onChange={handleFile}
                required
              />
            </label>
            <input
              type="text"
              onChange={handleDescription}
              value={description}
              placeholder="Description"
            />
            <button>Share</button>
            <div>{errors}</div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Share;

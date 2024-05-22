import { useState } from 'react';
import axios from 'axios';

export default function CreateUsers() {
  const [userName, setUserName] = useState('');

  function handleChange(event) {
    setUserName(event.target.value);
  }
  
  function handleSubmit(event) {
    event.preventDefault();

    const user = {
      userName: userName
    };

    axios.post('http://localhost:5000/users/add', user)
      .then(res => console.log(res.data));

    setUserName('');
  }

  return (
    <>
      <h3>Create New User</h3>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Username:</label>
          <input
            type='text'
            required
            value={userName}
            onChange={handleChange}
            className='form-control'
          ></input>
        </div>
        <div className='form-group'>
          <input
            type='submit'
            value='Create New User'
            className='btn btn-primary'
          />
        </div>
      </form>
    </>
  )
}
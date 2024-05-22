import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

export default function CreateExercises() {
  const [details, setDetails] = useState({
    userName: '',
    description: '',
    duration: 0,
    date: new Date(),
    users: []
  });

  useEffect(() => {
    axios.get('http://localhost:5000/users/')
      .then(res => {
        if (res.data.length > 0) {
          setDetails({
            ...details,
            users: res.data.map(user => user.userName),
            userName: res.data[0].userName
          })
        }
      })
  }, [])

  function handleChange(event) {
    const name = event.target.name;
    let value = event.target.value;
    setDetails({
      ...details,
      [name] : value
    })
  }

  function handleSubmit(event) {
    event.preventDefault();
    const exercise = {
      userName: details.userName,
      description: details.description,
      duration: details.duration,
      date: details.date
    }

    axios.post('http://localhost:5000/exercises/add', exercise)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  return (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label for='userName'>Username:</label>
          <select
            required
            type='text'
            name='userName'
            placeholder='UserName'
            onChange={handleChange}
            value={details.userName}
            className='form-control'
          >
            {details.users.map(user => {
              return <option
                key={user}
                value={user}
              >
                {user}
              </option>
            })}
          </select>
        </div>
        <div className='form-group'>
          <label>Description:</label>
          <input
            type='text'
            name='description'
            placeholder='Description'
            onChange={handleChange}
            value={details.description}
            className='form-control'
          />      
        </div>
        <div className='form-group'>
          <label>Duration (in minutes):</label>
          <input
            type='text'
            name='duration'
            placeholder='Duration'
            onChange={handleChange}
            value={details.duration}
            className='form-control'
          /> 
        </div>     
        <div className='form-group'>
          <label>Date:</label>
          <div>
            <DatePicker
              selected={details.date}
              onChange={handleChange} 
            />
          </div>
        </div>
        <div className='form-group'>
          <input
            type='submit'
            value='Create Exercise Log'
            className='btn btn-primary'
          >

          </input>
        </div>
      </form>
    </div>
  )
}
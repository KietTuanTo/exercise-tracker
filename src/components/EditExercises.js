import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function EditExercises() {
  const {id} = useParams();
  
  const [details, setDetails] = useState({
    userName: '',
    description: '',
    duration: 0,
    date: new Date(),
  });

  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/exercises/' + id)
      .then(res => {
        setDetails({
          ...details,
          userName: res.data.userName,
          description: res.data.description,
          duration: res.data.duration,
          date: new Date(res.data.date)
        })
      })
  }, [])

  useEffect(() => {
    axios.get('http://localhost:5000/users/')
    .then(res => {
      console.log(res.data);
      if (res.data.length > 0) {
        setUsers(res.data.map(u => u.userName));
      }
    })
  }, [details])

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

    axios.post('http://localhost:5000/exercises/update/' + id, exercise)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));

    window.location = '/';
  }

  return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Username:</label>
          <select
            required
            type='text'
            name='userName'
            placeholder='UserName'
            onChange={handleChange}
            value={details.userName}
            className='form-control'
          >
            {users.map(user => {
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
            value='Edit Exercise Log'
            className='btn btn-primary'
          >

          </input>
        </div>
      </form>
    </div>
  )
}
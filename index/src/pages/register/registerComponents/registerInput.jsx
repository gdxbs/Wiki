import React from 'react';
import './components.css';
import { useNavigate } from 'react-router-dom';
import { instance } from '../../../httpServer';

export const RegisterInput = () => {
  const [inputs, setInputs] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const handleChange = (e) => {
    // updating state of inputs wnen they change
    setInputs((inputs) => ({ ...inputs, [e.target.name]: e.target.value }));
  };

  const [error, setError] = React.useState(null); //state to store error message

  const navigate = useNavigate(); //using navigate hook to navigate to login page after register


  const register = async (email, password, firstName, lastName, name) => {
    //function to make register request to server
    const res = await instance.post('/user/register', {
    username:  email,
      password,
      firstName,
      lastName,
      name
    });
    return res.data;
  };

  const handleSubmit = async (e) => {
    // function to handle submit when register button is clicked
    e.preventDefault();
    try {
      const result = await register(
        inputs.email,
        inputs.password,
        inputs.firstName,
        inputs.lastName
      );
      console.log(result);
      if (result && !result.error) {
        navigate('/');
      }
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <form className='register-input mt-6' onSubmit={handleSubmit}>
    <div className=' flex gap-2'>
      <div className='text-xl ml-1'>First Name:</div>
        <input
         className=' border-2 border-black px-2 rounded-sm bg-[#f4c2c2]'
          name='firstName'
          type='text'
          placeholder='First Name'
          required
          onChange={handleChange}
        />
      </div>
      <div className='mt-2 flex gap-2'>
      <div className='text-xl ml-1'>Last Name:</div>
        <input
          className=' border-2 border-black px-2 rounded-sm bg-[#f4c2c2]'
          name='lastName'
          type='text'
          placeholder='Last Name'
          required
          onChange={handleChange}
        />
      </div>
      <div className='mt-2 flex gap-2'>
      <div className='text-xl ml-1'>Email:</div>
        <input
        className=' border-2 border-black px-2 rounded-sm bg-[#f4c2c2]'
          name='email'
          type='text'
          placeholder='Email'
          required
          onChange={handleChange}
        />
      </div>
      <div className='mt-2 flex gap-2'>
      <div className='text-xl ml-1'>Password:</div>
        <input
        className=' border-2 border-black px-2 rounded-sm bg-[#f4c2c2]' 
          name='password'
          type='password'
          placeholder='Password'
          required
          onChange={handleChange}
        />
        {error && <small className='error-message'>{error}</small>}
      </div>
      <div className='mx-auto w-full flex justify-center'>

<button type='submit' className=' px-10 py-3 mt-10  bg-black w-min text-white rounded-md'>Register</button>
</div>
    </form>
  );
};
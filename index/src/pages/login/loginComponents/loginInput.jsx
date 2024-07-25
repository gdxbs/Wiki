import React, { useContext } from 'react';
import './components.css';
import { useNavigate } from 'react-router-dom';
import { instance } from '../../../httpServer';
import { AppContext } from '../../../provider/AppContext';

//useState hook to store state of inputs
//useNavigate hook to navigate to home page after login
//handleSubmit function to handle submit when login button is clicked
//login function to make login request to server
//handleChange function to update state of inputs when they change
//error state to store error messages
//The purpose of this component is to render the login form and handle the login request to the server
export const LoginInput = () => {
  const {setUser } = useContext(AppContext)
  const [inputs, setInputs] = React.useState({
    email: '',
    password: '',
  });
  const handleChange = (e) => {
    // updating state of inputs wnen they change
    setInputs((inputs) => ({ ...inputs, [e.target.name]: e.target.value }));
  };

  const [error, setError] = React.useState(null); //state to store error message

  const navigate = useNavigate(); //using navigate hook to navigate to home page after login

 
  const login = async (email, password) => {
    //function to make login request to server
    const res = await instance.post('/user/login', {
      username: email,
      password,
    });
    return res.data;
  };

  const handleSubmit = async (e) => {
    // function to handle submit when login button is clicked
    e.preventDefault();
    try {
      const result = await login(inputs.email, inputs.password);
      console.log(result);
      if (result && !result.error) {
        navigate('/aboutuser');
      }
      setUser(result);
      localStorage.setItem('token', result.token);
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <form className='password-input mt-6' onSubmit={handleSubmit}>
      <div className='flex gap-2'>
        <div className='login-title text-xl'>Email:</div>
          <input
            className=' border-2 border-black px-2 rounded-sm bg-[#f4c2c2]'
            name='email'
            type='text'
            placeholder='Email'
            required
            onInput={handleChange}
            onChange={handleChange}
          />
      </div>
      <div className='mt-2 flex gap-2'>
        <div className='text-xl ml-1'>Password:</div>
        <input className=' border-2 border-black px-2 rounded-sm bg-[#f4c2c2]'
        name='password'
        type='password'
        placeholder='Password'
        required
        onChange={handleChange}
        />
      </div>
      {error && (
      <small className='error-message'>
        {error === 'Username or password was not found'
          ? 'Username or password was not found'
          : 'Username or password was not found.'}
      </small>
      )}
      <div className='mx-auto w-full flex justify-center'>
        <button type='submit' className=' px-10 py-3 mt-10 bg-black w-min text-white rounded-md'>Login</button>
      </div>
    </form>
  );
};
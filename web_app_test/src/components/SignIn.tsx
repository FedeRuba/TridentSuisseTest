import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormHelperText from '@mui/material/FormHelperText';
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = Cookies.get('access_token');
    if (accessToken){
      navigate('/');
    }
  }, [navigate]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setErrors({ ...errors, [name]: false});
    if (name === 'email') {
      setEmail(value);
      setErrors({ ...errors, email: '' });
    } else if (name === 'password') {
      setPassword(value);
      setErrors({ ...errors, password: '' });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let hasErrors = false;
    const newErrors = {
      email: '',
      password: ''
    };
    if (!email) {
      newErrors.email = 'Email obbligatoria!'
      hasErrors = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email non valida!'
      hasErrors = true;
    }
    if (!password) {
      newErrors.password = 'Password obbligatoria!'
      hasErrors = true;
    }

    setErrors(newErrors);
    if (!hasErrors) {
      try {
        const response: AxiosResponse = await axios.post('http://localhost:5000/api/login',{ email, password }, { withCredentials: true });
        setMessage(response.data.message);
        console.log(response.data.message);
        navigate('/');
      } catch (error: any) {
        setMessage(error.response?.data.message);
        setError(true);
      }
    }
    else {
      setPassword('');
    }
  };


  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}/>
        <Typography component='h1' variant='h5'>
          Login
        </Typography>
        <Box component='form' onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email'
            name='email'
            autoComplete='email'
            autoFocus
            value={email} 
            error={errors.email !== ''}
            helperText={errors.email}
            onChange={handleChange}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            data-testid='password'
            id='password'
            value={password} 
            error={errors.password !== ''}
            helperText={errors.password}
            onChange={handleChange}
          />
          <FormHelperText error={error}>{message}</FormHelperText>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Grid container>
            <Grid item>
              <Link href='/signup' variant='body2' data-testid='signup'>
                {'Non hai un account? Registrati'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
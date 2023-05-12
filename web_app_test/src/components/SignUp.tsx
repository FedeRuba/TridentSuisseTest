import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import 'dayjs/locale/it';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let hasErrors = false;
    const newErrors = {
      email: '',
      password: ''
    };
    if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email non valida!'
      hasErrors = true;
    }
    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)) {
      newErrors.password = 'La password deve contenere almeno 8 caratteri, una lettera maiuscola, una lettera minuscola e un numero!'
      hasErrors = true;
    }

    setErrors(newErrors);
    if (!hasErrors) {
      try {
        const response = await axios.post('http://localhost:5000/api/register', {
          name,
          lastName,
          email,
          password,
          dateOfBirth
        }, { withCredentials: true });
        console.log(response.data.message);
        navigate('/');
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setErrors({ ...errors, [name]: false});
    if (name === 'name') {
      setName(value);
    } else if (name === 'lastName') {
      setLastName(value);
    } else if (name === 'email') {
      setEmail(value);
      setErrors({ ...errors, email: '' });
    } else if (name === 'password') {
      setPassword(value);
      setErrors({ ...errors, password: '' });
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
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}/>
        <Typography component='h1' variant='h5'>
          Registrazione
        </Typography>
        <Box component='form' onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='given-name'
                name='name'
                required
                fullWidth
                id='name'
                label='Nome'
                autoFocus
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id='lastName'
                label='Cognome'
                name='lastName'
                autoComplete='family-name'
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='email'
                label='Email'
                name='email'
                autoComplete='email'
                error={errors.email !== ''}
                helperText={errors.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='password'
                label='Password'            
                type='password'
                id='password'
                autoComplete='new-password'
                error={errors.password !== ''}
                helperText={errors.password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='it'>
                <DatePicker
                  sx={{width: '100%'}}
                  label='Data di nascita'             
                  disableFuture
                  value={dayjs('1980-01-01')}
                  onChange={(newValue) => setDateOfBirth(dayjs(newValue).toISOString())}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Registrati
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item sx={{mb: 15}}>
              <Link href='/login' variant='body2'>
                Hai già un account? Accedi
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
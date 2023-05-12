import React, { useState } from 'react';
import './Weather.css';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

const API_KEY = '<Insert_Your_OpenWeatherMap_Api_Key>';

interface WeatherData {
    description?: string;
    temperature?: number;
    tempMin?: number;
    tempMax?: number;
    humidity?: number;
    icon?: string;
}

function Weather() {
    const [city, setCity] = useState('');
    const [error, setError] = useState('');
    const [weather, setWeather] = useState<WeatherData>({});
    const [loading, setLoading] = useState(false);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {    
    setCity(event.target.value);
  }

  function handleButtonClick() {
    setLoading(true);
    setError('');
    setWeather({});
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=it&appid=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
      if (data.cod === '404') {
        setError('La città inserita non è valida!');
        setLoading(false);
        return;
      }
    setError('');
    setWeather({
      description: data.weather[0].description,
      temperature: data.main.temp,
      tempMin: data.main.temp_min,
      tempMax: data.main.temp_max,
      humidity: data.main.humidity,
      icon: data.weather[0].icon,
    });
    setLoading(false);
    })
    .catch(err => {
      setError('Errore durante la ricerca!');
      setLoading(false);
    });
  }

  return (
    <div>
      <Grid container spacing={2} sx={{mt: 5}}>
        <Grid item xs={12}> 
          <Typography
            variant='h3'
            align='center'
            color='text.primary'
            gutterBottom>
            Meteo
          </Typography>
        </Grid>
        <Grid item xs={6} sx={{mt: 5}} className='right'>
          <Stack spacing={2} direction='row' className='right'>
            <TextField
              error={error !== ''}
              id='outlined-number'
              label='Città'
              type='text'
              value={city}
              onChange={handleInputChange}
              helperText={error}
              InputLabelProps={{
                shrink: true,
              }}
              style={{ height: '55px' }}
            />
            <Button variant='contained' 
              disabled={loading}
              onClick={handleButtonClick}>
              {loading ? 'Caricamento...' : 'Cerca'}
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={6} className='left' sx={{mt: 4}}>
          {weather.description &&
          <Box display='flex' alignItems='center'>
            <Box>
              <img src={`http://openweathermap.org/img/w/${weather.icon}.png`} alt={weather.description} style={{width: '80px'}}/>
            </Box>
            <Box ml={2} display='flex' flexDirection='column' alignItems='flex-start'>
              <Typography variant='body1' color='textPrimary' fontWeight='bold'>
                {weather.description}
              </Typography>
              <Typography variant='body1' color='textPrimary'>
                {weather.temperature !== undefined ? `${(weather.temperature - 273.15).toFixed(1)} °C` : ''}
              </Typography>
              <Box display='flex' alignItems='center'>
                <Typography variant='body2' color='textPrimary'>
                  Min:{' '}
                </Typography>
                <Typography variant='body2' color='textSecondary'>
                  {weather.tempMin !== undefined ? `${(weather.tempMin - 273.15).toFixed(1)} °C` : ''}
                </Typography>
                <Typography variant='body2' color='textPrimary' ml={1}>
                  Max:{' '}
                </Typography>
                <Typography variant='body2' color='textSecondary'>
                  {weather.tempMax !== undefined ? `${(weather.tempMax - 273.15).toFixed(1)} °C` : ''}
                </Typography>
                <Typography variant='body2' color='textPrimary' ml={1}>
                  Umidità:{' '}
                </Typography>
                <Typography variant='body2' color='textSecondary'>
                  {weather.humidity}%
                </Typography>
              </Box>
            </Box>
          </Box>
          }
        </Grid>
      </Grid>
    </div>
  );
}

export default Weather;

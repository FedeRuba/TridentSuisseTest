import React, { useState, useEffect } from 'react';
import './Converter.css';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function Converter() {

  useEffect(() => {
    //al caricamento della pagina setta rateApi al rate corrente
    fetch(`https://open.er-api.com/v6/latest/EUR`)
    .then(res => res.json())
    .then(data => {
      setRateAPI(data.rates.USD)
    })
  }, []);

  const [value, setValue] = useState(0);
  const [valueInput, setValueInput] = useState('0');
  const [rateAPI, setRateAPI] = useState(0);
  const [error, setError] = useState('');

  const handleIncrement = (num:any) => {
    setValue(value + num);
    setValueInput((value+num).toString());
  };

  const handleReset = () => {
    setValue(0);
    setValueInput((0).toString());
    setError('');
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValueInput(value);
    const parsedValue = parseFloat(value);
    if (Number.isNaN(parsedValue) || parsedValue < 0) {
      setError('Inserire un valore numerico positivo');
      setValue(0);
    } else {
      setError('');
      setValue(parsedValue);
    }
  };


  return (
  <div>
    <Grid container spacing={2} sx={{mt: 5}}>
      <Grid item xs={12}> 
        <Typography
          variant='h3'
          align='center'
          color='text.primary'
          gutterBottom>
          Converter
          <br/>
          EUR to USD
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{mt: 5}} className='center'>
        <Stack direction='row' spacing={2} sx={{pl: 4, pr:4, pb: 4, pt: 1}} className='center'>

          <TextField
            error={error !== ''}
            id='outlined-number'
            label='Euro'
            type='number'
            value={valueInput}
            onChange={handleInputChange}
            helperText={error}
            InputLabelProps={{
              shrink: true,
            }}
            style={{height: 55}}
          />
          <Button variant='contained' disabled={value < 0} onClick={() => handleIncrement(10)}>+10</Button>
          <Button variant='contained' disabled={value < 0} onClick={() => handleIncrement(100)}>+100</Button>
          <Button variant='contained' onClick={handleReset}>Reset</Button>
        </Stack>
      </Grid>
      <Grid item xs={12} className='center' sx={{mt: 4}}>
          <Typography 
            variant='h5'
            align='center'
            display='flex'
            alignContent='center'
            color='text.primary'
            gutterBottom>
            {value}€ = {(value*rateAPI).toFixed(2)}$
          </Typography>{}
      </Grid>
    </Grid>
  </div>
  );
}

export default Converter;

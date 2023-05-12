import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import './Task.css'
import { Typography, 
  Grid, 
  TextField, 
  Button, 
  Box,
  Stack,
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableRow,
  TableContainer,
  FormHelperText} from '@mui/material';  
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import 'dayjs/locale/it';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


function Task() {
  const [name, setName] = useState('');
  const [datejs, setDatejs] = useState<dayjs.Dayjs | null>(null);
  const [date, setDate] = useState('');
  const [tasks, setTasks] = useState([{
    taskName: '',
    date: ''
  }]);
  const [error, setError] = useState('');


  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await axios.get('http://localhost:5000/api/task', {withCredentials: true});
        response.data.tasks.forEach((t : {taskName: string , date: string}) => {
          t.date = dayjs(t.date).format('DD/MM/YYYY');
        });

        setTasks(response.data.tasks);
      } catch (error) {
        console.error(error);
      }
    }
    fetchTasks();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if(date === ''){
        setDate(dayjs(new Date()).toISOString());
      }
      const response: AxiosResponse = await axios.post('http://localhost:5000/api/insert-task', { taskName: name, date }, { withCredentials: true });
      console.log(response.data.message);
      console.log(name, date);
      setTasks([...tasks, { taskName: name, date: dayjs(date).format('DD/MM/YYYY')}]);

      setDatejs(null);
      setName('');
    } catch (error: any) {
      setError(error.response?.data.message);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'name') {
      setName(value);
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
            Task
          </Typography>
        </Grid>
        <Grid item xs={6} sx={{pl: 5}} className='right'>
          <TableContainer sx={{ height: 320, width: 600}}>
            <Table stickyHeader aria-label='sticky table'>
              <TableHead>
                <TableRow>
                  <TableCell>Nome Task</TableCell>
                  <TableCell>Data</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tasks.map((task, index) => (
                  <TableRow key={index}>
                    <TableCell style={{ wordWrap: 'break-word', maxWidth: 200}}>{task.taskName}</TableCell>
                    <TableCell>{task.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={6} className='center'>
          <Box component='form' onSubmit={handleSubmit}>
            <Stack spacing={2} direction='column' className='center'>
              <TextField
                label='Nome task'
                name='name'
                id='name'
                fullWidth
                value={name}
                sx={{width: 350}}
                onChange={handleChange}
                required />
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='it'>
                <DatePicker
                  sx={{width: '100%'}}
                  label='Data'             
                  value={datejs}
                  onChange={(newValue) => {
                    setDatejs(newValue);
                    setDate(dayjs(newValue).toISOString())
                  }}
                />
              </LocalizationProvider>
              <FormHelperText error >{error}</FormHelperText>
              <Button type='submit' variant='contained' color='primary'>
                Aggiungi task
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default Task;

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Link} from 'react-router-dom';


export default function Home() {
  return (
    <main>
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 4,
        }}
      >
        <Container maxWidth='sm'>
          <Typography
            component='h1'
            variant='h2'
            align='center'
            color='text.primary'
            gutterBottom>
            Trident Test
          </Typography>
          <Typography variant='h5' align='center' color='text.secondary' paragraph>
            Scegli un riquadro sottostante per vedere 
            le incredibili funzionalità di questo sito.
          </Typography>
        </Container>
      </Box>
      <Container maxWidth='md' sx={{pb: 8}}>
        <Grid container spacing={4}>
          <Grid item key={1} xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardActionArea component={Link} to='/converter' sx={{height: '100%'}}>
                <CardContent sx={{p: 0}}>
                  <CardMedia component='img'
                    src={require('../images/converter.jpg')}
                    alt='converter'
                  />
                </CardContent>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant='h5' component='h2'>
                    Converter
                  </Typography>
                  <Typography>
                    Visualizza in modo semplice e veloce la conversione da euro a dollaro!
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item key={2} xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardActionArea component={Link} to='/weather' sx={{height: '100%'}}>
                <CardContent sx={{p: 0}}>
                  <CardMedia component='img'
                    src={require('../images/weather.jpg')}
                    alt='meteo'
                  />
                </CardContent>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant='h5' component='h2'>
                    Meteo
                  </Typography>
                  <Typography>
                    Previsioni meteo in tempo reale, ti basta inserire la città!
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item key={3} xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardActionArea component={Link} to='/task' sx={{height: '100%'}}>
                <CardContent sx={{p: 0}}>
                  <CardMedia component='img'
                    src={require('../images/task.jpg')}
                    alt='task'
                  />
                </CardContent>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant='h5' component='h2'>
                    Task
                  </Typography>
                  <Typography>
                    Crea la tua lista di attività per non scordarti mai nulla!
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}
import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

function NotFound () {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 10 }}>
      <Typography variant="h2" color="textPrimary" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" color="textSecondary" gutterBottom>
        Oops! Questa pagina non è disponibile.
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Potresti aver digitato un URL errato o seguito un link non più valido.
      </Typography>
      <Button variant="contained" component={Link} to="/" sx={{ mt: 4 }}>
        Torna alla home
      </Button>
    </Box>
  );
};

export default NotFound;

import React,{useEffect} from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { Button, CardActions } from '@mui/material';
import { Container } from '@mui/system';
import { Dataset } from '@mui/icons-material';


const Contact = () => {
    const theme = useTheme();

       const data = useLocation();
       useEffect(() => {
        console.log(data);
       }, [])
       
  return (
    <Container maxWidth = "xs" className = "mt-16">
    <Typography sx={{ m:0.5, fontSize: 18 }}  >Contact Details</Typography>
        <Card sx={{ minWidth: 275 }}>
    <CardContent>
      <Typography sx={{ fontSize: 18 }}  gutterBottom>
       {data.state.name}
      </Typography>
      <Typography variant="h5" component="div">
      </Typography>
      <Typography sx={{ mb: 0.5 }} color="text.secondary">
        {data.state.number}
      </Typography>
    </CardContent>
    <CardActions>
      <Link
      to = "/send-message"
      state = {{name:data.state.name,number:data.state.number}}
      >
      <Button size="small">Send Message</Button>
      </Link>
    </CardActions>
  </Card>
    </Container>
    
 
  )
}

export default Contact
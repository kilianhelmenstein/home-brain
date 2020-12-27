
import axios from 'axios'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';

import { Thing, thingTypeAsString } from '../interfaces';

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(1),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  cardHeader: {
    display: 'flex'
  },
  cardHeaderTitle: {
  },
  button: {
    display: 'inline',
    margin: '100',
    padding: '100',
    marginLeft: 'auto'
  }
}));

type Props = {
  thing: Thing,
  backendUrl: string
}

const OnOffThingCard = ({ thing, backendUrl }: Props) => {
  const classes = useStyles();

  const switchOn = async (id: number) => {
    try {
      await axios.post(`${backendUrl}/api/things/${id}/commands`, { status: 'on' });
    } catch (e) {
    }
  }

  const switchOff = async (id: number) => {
    try {
      await axios.post(`${backendUrl}/api/things/${id}/commands`, { status: 'off' });
    } catch (e) {
    }
  } 

  const addToDashboard = async (id: number) => {
    try {
      await axios.post(`${backendUrl}/api/dashboard`, { thing_id: id });
    } catch (e) {
      alert('Adding things to the dashboard is not supportet yet');
    }
  }

  return (
   <Card className={classes.card}> 
      <CardHeader className={classes.cardHeader}
         title={<Typography className={classes.cardHeaderTitle} color='primary' variant='h6' noWrap>{thing.name}</Typography>}
         subheader={thingTypeAsString(thing)}
         action={
         <IconButton aria-label="Add to Dashboard" onClick={() => addToDashboard(thing.id)}>
            <StarBorderRoundedIcon />
         </IconButton>
         }
      />
      <CardActions >
         <Button className={classes.button} variant="outlined" onClick={() => switchOn(thing.id)}>On</Button>
         <Button className={classes.button} variant="outlined" onClick={() => switchOff(thing.id)}>Off</Button>
      </CardActions>
   </Card>
  )
}

export default OnOffThingCard;
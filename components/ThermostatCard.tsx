
import axios from 'axios'
import useSwr from 'swr'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import Slider from '@material-ui/core/Slider';

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
  cardThermostatInfo: {
    display: 'inline',
    margin: '100',
    padding: '100',
    marginRight: 20,
    marginLeft: 'auto'
  },
  button: {
    display: 'inline',
    margin: '100',
    padding: '100',
    marginLeft: 'auto'
  },
  slider: {
    marginRight: 20,
    marginLeft: 20,
    width: 'auto'
  }
}));

export interface IThermostatInfo {
  status: {
     manual: boolean;
     holiday: boolean;
     boost: boolean;
     dst: boolean;
     openWindow: boolean;
     lowBattery: boolean;
  };
  valvePosition: number;
  targetTemperature: number;
}

const thermostatInfoAsString = (info: IThermostatInfo) => {
  return `${info.targetTemperature}° / ${info.status.manual ? 'Manual' : 'Auto'}${info.status.boost ? ' / Boost' : ''}${info.status.holiday ? ' / Holiday' : ''}${info.status.lowBattery ? ' / BATTERY LOW' : ''}`;
}

const fetchInfo = async (url: string) => {
  const response = await axios.get(url);
  return response.data as IThermostatInfo;
}

type Props = {
  thing: Thing,
  backendUrl: string
}

const ThermostatCard = ({ thing, backendUrl }: Props) => {
  const classes = useStyles();
  const { data, error, mutate } = useSwr(`${backendUrl}/api/things/${thing.id}/status`, fetchInfo);

  const switchOn = async (id: number) => {
    try {
      await axios.post(`${backendUrl}/api/things/${id}/commands`, { valve: 'on' });
      mutate();
    } catch (e) {
    }
  }

  const switchOff = async (id: number) => {
    try {
      await axios.post(`${backendUrl}/api/things/${id}/commands`, { valve: 'off' });
      mutate();
    } catch (e) {
    }
  }

  const switchToAutoMode = async (id: number) => {
    try {
      await axios.post(`${backendUrl}/api/things/${id}/commands`, { mode: 'auto' });
      mutate();
    } catch (e) {
    }
  }

  const switchToManuMode = async (id: number) => {
    try {
      await axios.post(`${backendUrl}/api/things/${id}/commands`, { mode: 'manu' });
      mutate();
    } catch (e) {
    }
  } 

  const setTemperature = async (id: number, temperature: number) => {
    try {
      await axios.post(`${backendUrl}/api/things/${id}/commands`, { temperature: temperature });
      mutate();
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

  const valuetext = (value: any) => `${value}°C`;

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
      {error && <Typography className={classes.cardThermostatInfo} variant='subtitle1' noWrap>Cannot fetch telemetry</Typography>}
      {!error && !data && <Typography className={classes.cardThermostatInfo} variant='subtitle1' noWrap>Fetching telemetry...</Typography>}
      {!error && data && <Typography className={classes.cardThermostatInfo} variant='subtitle1' noWrap>{thermostatInfoAsString(data)}</Typography>}
      <CardActions>
         <Button disabled={!data} className={classes.button} variant="outlined" onClick={() => switchToManuMode(thing.id)}>Manual</Button>
         <Button disabled={!data} className={classes.button} variant="outlined" onClick={() => switchToAutoMode(thing.id)}>Auto</Button>
         <Button disabled={!data} className={classes.button} variant="outlined" onClick={() => switchOn(thing.id)}>On</Button>
         <Button disabled={!data} className={classes.button} variant="outlined" onClick={() => switchOff(thing.id)}>Off</Button>
      </CardActions>
      <Slider
        className={classes.slider}
        defaultValue={data?.targetTemperature}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={0.5}
        marks
        min={4.5}
        max={30.0}
        onChangeCommitted={(_e, value) => setTemperature(thing.id, value as number)}
        disabled={!data}
      />
   </Card>
  )
}

export default ThermostatCard;
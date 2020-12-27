import { Thing, ThingType } from '../interfaces';
import OnOffThingCard from './OnOffThingCard';
import HygrometerCard from './HygrometerCard';
import ThermostatCard from './ThermostatCard';
import UnsupportedThingCard from './UnsupportedThingCard';

type Props = {
  thing: Thing,
  backendUrl: string
}

const ThingsCard = ({ thing, backendUrl }: Props) => {
  switch (thing.type) {
    case ThingType.OnOff:
      return <OnOffThingCard thing={thing} backendUrl={backendUrl} />;
    case ThingType.Hygrometer:
      return <HygrometerCard thing={thing} backendUrl={backendUrl} />;
      case ThingType.Thermostat:
      return <ThermostatCard thing={thing} backendUrl={backendUrl} />;
    default:
      return <UnsupportedThingCard thing={thing} backendUrl={backendUrl} />;
  }
}

export default ThingsCard;
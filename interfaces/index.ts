export enum ThingType {
  OnOff = 0,
  Hygrometer = 1,
  Thermostat = 2
}

export type Thing = {
  id: number
  name: string
  type: ThingType
}

export function thingTypeAsString(thing: Thing): string {
  switch (thing.type) {
    case ThingType.OnOff:
      return 'On/Off Device';
    case ThingType.Hygrometer:
      return 'Hygrometer';
    case ThingType.Thermostat:
      return 'Thermostat';
    default:
      return 'Unknown';
  }
}
export enum GlobalParameter {
  OCEANS = 'oceans',
  OXYGEN = 'oxygen',
  TEMPERATURE = 'temperature',
  VENUS = 'venus',
  MOON_COLONY_RATE = 'moon-habitat',
  MOON_MINING_RATE = 'moon-mining',
  MOON_LOGISTICS_RATE = 'moon-logistics',
}

export const GLOBAL_PARAMETERS = [
  GlobalParameter.OCEANS,
  GlobalParameter.OXYGEN,
  GlobalParameter.TEMPERATURE,
  GlobalParameter.VENUS,
  GlobalParameter.MOON_COLONY_RATE,
  GlobalParameter.MOON_MINING_RATE,
  GlobalParameter.MOON_LOGISTICS_RATE,
] as const;
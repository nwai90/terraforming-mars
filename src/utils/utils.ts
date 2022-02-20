export const playerColorClass = (color: string, type: 'shadow' | 'bg' | 'bg_transparent'): string => {
  const prefix = {
    shadow: 'player_shadow_color_',
    bg_transparent: 'player_translucent_bg_color_',
    bg: 'player_bg_color_',
  }[type];

  return `${prefix}${color}`;
};

export const range = (n: number): Array<number> => Array.from(Array(n).keys());
export const generateClassString = (classes: Array<string>): string => classes.join(' ').trimStart();

export function isPlayerId(id: string): boolean {
  return id.charAt(0) === 'p';
}

export function isSpectatorId(id: string): boolean {
  return id.charAt(0) === 's';
}

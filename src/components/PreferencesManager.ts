export const preferences = [
  'hide_hand',
  'hide_awards_and_milestones',
  'hide_top_bar',
  'small_cards',
  'magnify_cards',
  'show_alerts',
  'hide_active_cards',
  'hide_automated_cards',
  'hide_event_cards',
  'lang',
  'enable_sounds',
  'show_tile_confirmation',
  'show_discount_on_cards',
  'learner_mode',
] as const;

export type Key = typeof preferences[number];

export class PreferencesManager {
  static preferencesValues: Map<Key, boolean | string> = new Map<Key, boolean | string>();
  private static localStorageSupported(): boolean {
    return typeof localStorage !== 'undefined';
  }

  static save(name: Key, val: string | boolean): void {
    if (!this.localStorageSupported()) return;
    if (typeof(val) === 'string') {
      localStorage.setItem(name, val);
    } else {
      localStorage.setItem(name, val ? '0' : '1');
    }
  }

  static load(name: Key, defaultValue = ''): string {
    if (!this.localStorageSupported()) return defaultValue;
    const value = localStorage.getItem(name);
    return value ?? defaultValue;
  }

  static loadBoolean(name: Key, defaultValue = false): boolean {
    if (!this.localStorageSupported()) return defaultValue;
    return localStorage.getItem(name) === '1';
  }
}

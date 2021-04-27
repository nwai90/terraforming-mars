export const preferences = [
  'hide_corporation',
  'hide_hand',
  'hide_cards',
  'hide_awards_and_milestones',
  'hide_tag_overview',
  'hide_turnorder',
  'hide_corporation_names',
  'hide_top_bar',
  'small_cards',
  'remove_background',
  'magnify_cards',
  'magnify_card_descriptions',
  'show_alerts',
  'hide_ma_scores',
  'hide_non_blue_cards',
  'hide_active_cards',
  'hide_automated_cards',
  'hide_event_cards',
  'hide_log',
  'lang',
  'enable_sounds',
  'smooth_scrolling',
  'hide_tile_confirmation',
  'show_card_number',
  'show_discount_on_cards',
  'learner_mode',
  'hide_animated_sidebar',
] as const;

export type Key = typeof preferences[number];

export class PreferencesManager {
  static preferencesValues: Map<Key, boolean | string> = new Map<Key, boolean | string>();
  private static localStorageSupported(): boolean {
    return typeof localStorage !== 'undefined';
  }

  static save(name: Key, val: string | boolean, updateMap: boolean = false): void {
    const stringVal = typeof(val) === 'string' ? val : (val ? '0' : '1');
    if (this.localStorageSupported()) {
      localStorage.setItem(name, stringVal);
    }
    if (updateMap) {
      this.preferencesValues.set(name, stringVal);
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

export type Settings = {
  startingBalance: number;
};

const KEY = 'pft::v1::settings';

const DEFAULTS: Settings = {
  startingBalance: 0,
};

export const settingsStore = {
  load(): Settings {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return DEFAULTS;
      const parsed = JSON.parse(raw);
      return { ...DEFAULTS, ...parsed } as Settings;
    } catch {
      return DEFAULTS;
    }
  },
  save(next: Settings) {
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
  },
};

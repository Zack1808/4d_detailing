export const readStorage = <T>(key: string): T | null => {
  try {
    const raw = window.localStorage.getItem(key);

    return raw === null ? null : (JSON.parse(raw) as T);
  } catch {
    return null;
  }
};

export const writeStorage = (key: string, value: unknown) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {}
};

export const removeStorage = (key: string) => {
  try {
    window.localStorage.removeItem(key);
  } catch {}
};

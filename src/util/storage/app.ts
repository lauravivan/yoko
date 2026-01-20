import { type AppType } from '@/types/app';
import { DEFAULT_APP } from '../constants';

const LS_KEY = 'yoko-app';

export function getStoredApp(): AppType {
  const app = localStorage.getItem(LS_KEY) as AppType;
  return app || DEFAULT_APP;
}

export function storeApp(app: AppType) {
  localStorage.setItem(LS_KEY, app);
}

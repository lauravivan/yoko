import { type ViewType } from '@/types/view';
import { DEFAULT_VIEW } from '../constants';

const LS_KEY = 'yoko-view';

export function getStoredView(): ViewType {
  const view = localStorage.getItem(LS_KEY) as ViewType;
  return view || DEFAULT_VIEW;
}

export function storeView(view: ViewType) {
  localStorage.setItem(LS_KEY, view);
}

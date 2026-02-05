import { type FilterType } from '@/types/filter';
import { type SortType } from '@/types/sort';

export const DEFAULT_APP = 'countdown';

export const TOGGLE_APP = 'actions';

export const DEFAULT_THEME = 'sunny';

export const TOGGLE_THEME = 'moon';

export const DEFAULT_VIEW = 'grid';

export const TOGGLE_VIEW = 'list';

export const FILTER_OPTIONS: FilterType[] = [
  'All',
  'Happening this month',
  'Happening next month',
  'Happening in 2 months',
  'Happening in 3 months',
  'Happenning in 4 months',
  'Hapenning in 5 months',
  'Happening in 6 months',
  'Happening in more than 6 months',
];

export const SORT_OPTIONS: SortType[] = [
  'By Creation (default)',
  'By Color',
  'By Alphabet',
  'By Date',
];

export const COLORS = {
  lightGreen: 'D9E9CF',
  lightBlue: 'C7D9DD',
  lightYellow: 'F2E2B1',
  lightSalmon: 'FCE7C8',
  lightBeige: 'E2E0C8',
  lightBrown: 'DAB88B',
  lightPurple: 'F1C6D3',
  lightOrange: 'F1AE89',
  lightPink: 'FCE2DB',
};

export const paths = {
  home: '/',
  actions: '/actions',
};

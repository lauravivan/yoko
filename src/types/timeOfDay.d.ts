type TimeOfDayExtense = 'morning' | 'afternoon' | 'sunset' | 'night' | 'dawn';

interface TimeOfDay {
  phrase: string;
  icon: ReactNode;
}

type TimesOfDay = Record<TimeOfDayExtense, TimeOfDay>;

import DawnIcon from '@/components/display/icons/Dawn';
import NightIcon from '@/components/display/icons/Night';
import SunDownIcon from '@/components/display/icons/SunDown';
import SunnyIcon from '@/components/display/icons/Sunny';

const getTimesOfDay = (): TimesOfDay => {
  const timesOfDay: TimesOfDay = {
    morning: {
      phrase: 'Good morning sunshine',
      icon: SunnyIcon,
    },
    afternoon: {
      phrase: `It's afternoon already`,
      icon: SunnyIcon,
    },
    sunset: {
      phrase: 'Night is coming',
      icon: SunDownIcon,
    },
    night: {
      phrase: 'Good night',
      icon: NightIcon,
    },
    dawn: {
      phrase: `It's a little bit to late for being awake`,
      icon: DawnIcon,
    },
  };

  return timesOfDay;
};

export default getTimesOfDay;

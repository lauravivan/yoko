import { type WeekDayEnum } from '@/enum/DayEnum';
import useOccurrenceStore from '@/store/occurrenceStore';
import { type IOccurrence } from '@/types/Occurrence';
import { useEffect, useRef, useState } from 'react';
import { OccurrenceEndsTypeEnum } from '../enum/OccurrenceEndsTypeEnum';
import { OccurrenceCategoryEnum } from '../enum/OccurrenceCategoryEnum';

const useOccurrenceForm = ({
  occurrenceId,
  allDay,
  isEvent,
  endsTypeDefault,
  monthRepetitionDefault,
  monthRepetitionSpaceDefault,
  weekRepetitionDefault,
  weekRepetitionSpaceDefault,
  yearRepetitionDefault,
  yearRepetitionSpaceDefault,
}: {
  occurrenceId: string;
  allDay: boolean;
  isEvent: boolean;
  endsTypeDefault: OccurrenceEndsTypeEnum;
  monthRepetitionDefault: number;
  yearRepetitionDefault: number;
  weekRepetitionDefault: number;
  weekRepetitionSpaceDefault: number;
  yearRepetitionSpaceDefault: number;
  monthRepetitionSpaceDefault: number;
}) => {
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const dateOfOccurrenceRef = useRef<HTMLInputElement>(null);
  const endDateOfOccurrenceRef = useRef<HTMLInputElement>(null);
  const qntOccurrencesTillEndRef = useRef<HTMLInputElement>(null);
  const weekDayRepetitionRef = useRef<HTMLInputElement[]>([]);
  const startTimeRef = useRef<HTMLInputElement>(null);
  const endTimeRef = useRef<HTMLInputElement>(null);
  const { updateOccurrence, updateOccurrenceTitle } = useOccurrenceStore();
  const [titleEditMode, setTitleEditMode] = useState(false);
  const [isAllDay, setIsAllDay] = useState(allDay);
  const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);
  const [weekRepetition, setWeekRepetition] = useState(weekRepetitionDefault);
  const [monthRepetition, setMonthRepetition] = useState(
    monthRepetitionDefault
  );
  const [yearRepetition, setYearRepetition] = useState(yearRepetitionDefault);
  const [weekRepetitionSpace, setWeekRepetitionSpace] = useState(
    weekRepetitionSpaceDefault
  );
  const [monthRepetitionSpace, setMonthRepetitionSpace] = useState(
    monthRepetitionSpaceDefault
  );
  const [yearRepetitionSpace, setYearRepetitionSpace] = useState(
    yearRepetitionSpaceDefault
  );
  const [endsType, setEndsType] = useState(endsTypeDefault);

  useEffect(() => {
    weekDayRepetitionRef.current = [];
  }, []);

  const handleTitleUpdateOnKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === 'Enter' && titleRef.current) {
      updateOccurrenceTitle(occurrenceId, titleRef.current.value);
      titleRef.current.blur();
      setTitleEditMode(false);
    }
  };

  const handleTitleUpdateOnBlur = (
    e: React.FocusEvent<HTMLTextAreaElement>
  ) => {
    updateOccurrenceTitle(occurrenceId, e.target.value);
    setTitleEditMode(false);
  };

  const handleTitleEditMode = (e: React.MouseEvent<HTMLHeadingElement>) => {
    e.stopPropagation();
    setTitleEditMode(true);
  };

  const handleAllDay = () => setIsAllDay((prev) => !prev);

  const weekDayRepetitionRefs = (el: HTMLInputElement) => {
    if (el && !weekDayRepetitionRef.current.includes(el)) {
      weekDayRepetitionRef.current.push(el);
    }
  };

  /* eslint-disable sonarjs/cognitive-complexity */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const occ = {} as IOccurrence;

    occ.id = occurrenceId;
    occ.isEvent = isEvent;

    if (descRef.current) occ.desc = descRef.current.value;

    if (categoryRef.current) {
      const isValidCategory = Object.values(OccurrenceCategoryEnum).some(
        (c) =>
          c ===
          (categoryRef.current?.options[categoryRef.current.selectedIndex]
            .value as OccurrenceCategoryEnum)
      );

      occ.category = isValidCategory
        ? (categoryRef.current.value as OccurrenceCategoryEnum)
        : OccurrenceCategoryEnum.Personal;
    }

    if (dateOfOccurrenceRef.current)
      occ.dateOfOccurrence = new Date(dateOfOccurrenceRef.current.value);

    occ.allDay = isAllDay;

    if (isAllDay) {
      occ.startTime = null;
      occ.endTime = null;
    } else {
      if (startTimeRef.current) occ.startTime = startTimeRef.current.value;
      if (endTimeRef.current) occ.endTime = endTimeRef.current.value;
    }

    if (weekDayRepetitionRef.current) {
      const weekDayRep: WeekDayEnum[] = [];

      weekDayRepetitionRef.current.forEach((weekDayRef) => {
        if (weekDayRef.checked)
          weekDayRep.push(weekDayRef.value as WeekDayEnum);
      });

      occ.weekDayRepetition = weekDayRep;
    }

    occ.weekRepetition = weekRepetition;
    occ.monthRepetition = monthRepetition;
    occ.yearRepetition = yearRepetition;
    occ.weekRepetitionSpace = weekRepetitionSpace;
    occ.monthRepetitionSpace = monthRepetitionSpace;
    occ.yearRepetitionSpace = yearRepetitionSpace;

    occ.endsType = endsType;

    if (endsType === OccurrenceEndsTypeEnum.On) {
      if (endDateOfOccurrenceRef.current)
        occ.endDateOfOccurrence = new Date(
          endDateOfOccurrenceRef.current.value
        );
    } else {
      occ.endDateOfOccurrence = occ.dateOfOccurrence;
    }

    if (endsType === OccurrenceEndsTypeEnum.After) {
      if (qntOccurrencesTillEndRef.current)
        occ.qntOccurrencesTillEnd = parseInt(
          qntOccurrencesTillEndRef.current.value
        );
    } else {
      occ.qntOccurrencesTillEnd = 0;
    }

    updateOccurrence(occ);
    setSubmittedSuccessfully(true);
  };
  /* eslint-enable sonarjs/cognitive-complexity */

  const clearForm = () => {
    setSubmittedSuccessfully(false);
  };

  return {
    titleRef,
    descRef,
    categoryRef,
    dateOfOccurrenceRef,
    startTimeRef,
    endTimeRef,
    endDateOfOccurrenceRef,
    qntOccurrencesTillEndRef,
    weekDayRepetitionRefs,
    handleTitleUpdateOnKeyDown,
    handleTitleUpdateOnBlur,
    handleTitleEditMode,
    weekRepetition,
    monthRepetition,
    yearRepetition,
    weekRepetitionSpace,
    monthRepetitionSpace,
    yearRepetitionSpace,
    titleEditMode,
    isAllDay,
    endsType,
    handleAllDay,
    handleSubmit,
    submittedSuccessfully,
    clearForm,
    handleMonthRepetition: setMonthRepetition,
    handleYearRepetition: setYearRepetition,
    handleWeekRepetition: setWeekRepetition,
    handleMonthRepetitionSpace: setMonthRepetitionSpace,
    handleYearRepetitionSpace: setYearRepetitionSpace,
    handleWeekRepetitionSpace: setWeekRepetitionSpace,
    handleEndsType: setEndsType,
  };
};

export default useOccurrenceForm;

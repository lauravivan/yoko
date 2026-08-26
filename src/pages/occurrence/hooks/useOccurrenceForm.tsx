import { type WeekDayEnum } from '@/enum/DayEnum';
import useOccurrenceStore from '@/store/occurrenceStore';
import { type IOccurrence } from '@/types/Occurrence';
import { useEffect, useRef, useState } from 'react';
import { OccurrenceEndsTypeEnum } from '../enum/OccurrenceEndsTypeEnum';
import { OccurrenceCategoryEnum } from '../enum/OccurrenceCategoryEnum';
import { v7 as uuidv7 } from 'uuid';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  occurrenceEditFormSchema,
  occurrenceFormSchema,
  type OccurrenceFormValues,
} from '../schemas/occurrenceFormSchema';
import type { Resolver } from 'react-hook-form';

const useOccurrenceForm = (
  isCreate: boolean,
  props: {
    occurrenceId?: string;
    allDay?: boolean;
    isEvent: boolean;
    endsTypeDefault?: OccurrenceEndsTypeEnum;
    monthRepetitionDefault?: number;
    yearRepetitionDefault?: number;
    weekRepetitionDefault?: number;
    weekRepetitionSpaceDefault?: number;
    yearRepetitionSpaceDefault?: number;
    monthRepetitionSpaceDefault?: number;
    handleModal?: (value: React.SetStateAction<boolean>) => void;
  }
) => {
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const dateOfOccurrenceRef = useRef<HTMLInputElement>(null);
  const endDateOfOccurrenceRef = useRef<HTMLInputElement>(null);
  const qntOccurrencesTillEndRef = useRef<HTMLInputElement>(null);
  const weekDayRepetitionRef = useRef<HTMLInputElement[]>([]);
  const startTimeRef = useRef<HTMLInputElement>(null);
  const endTimeRef = useRef<HTMLInputElement>(null);
  const { updateOccurrence, updateOccurrenceTitle, createOccurrence } =
    useOccurrenceStore();
  const {
    register,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<OccurrenceFormValues>({
    resolver: zodResolver(
      isCreate ? occurrenceFormSchema : occurrenceEditFormSchema
    ) as Resolver<OccurrenceFormValues>,
    mode: 'onSubmit',
  });

  useEffect(() => {
    register('title');
    register('desc');
    register('category');
    register('dateOfOccurrence');
    register('endDateOfOccurrence');
    register('allDay');
    register('startTime');
    register('endTime');
    register('weekRepetition');
    register('monthRepetition');
    register('yearRepetition');
    register('weekRepetitionSpace');
    register('monthRepetitionSpace');
    register('yearRepetitionSpace');
    register('endsType');
    register('qntOccurrencesTillEnd');
  }, [register]);
  const [titleEditMode, setTitleEditMode] = useState<boolean>(false);
  const [isAllDay, setIsAllDay] = useState<boolean>(props.allDay ?? false);
  const [weekRepetition, setWeekRepetition] = useState<number>(
    props.weekRepetitionDefault ?? 0
  );
  const [monthRepetition, setMonthRepetition] = useState<number>(
    props.monthRepetitionDefault ?? 0
  );
  const [yearRepetition, setYearRepetition] = useState<number>(
    props.yearRepetitionDefault ?? 0
  );
  const [weekRepetitionSpace, setWeekRepetitionSpace] = useState<number>(
    props.weekRepetitionSpaceDefault ?? 0
  );
  const [monthRepetitionSpace, setMonthRepetitionSpace] = useState<number>(
    props.monthRepetitionSpaceDefault ?? 0
  );
  const [yearRepetitionSpace, setYearRepetitionSpace] = useState<number>(
    props.yearRepetitionSpaceDefault ?? 0
  );
  const [endsType, setEndsType] = useState<OccurrenceEndsTypeEnum>(
    props.endsTypeDefault ?? OccurrenceEndsTypeEnum.Never
  );

  useEffect(() => {
    weekDayRepetitionRef.current = [];
  }, []);

  const handleTitleUpdateOnKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === 'Enter' && titleRef.current && props.occurrenceId) {
      updateOccurrenceTitle(props.occurrenceId, titleRef.current.value);
      titleRef.current.blur();
      setTitleEditMode(false);
    }
  };

  const handleTitleUpdateOnBlur = (
    e: React.FocusEvent<HTMLTextAreaElement>
  ) => {
    if (props.occurrenceId) {
      updateOccurrenceTitle(props.occurrenceId, e.target.value);
      setTitleEditMode(false);
    }
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
  const handleSubmitLegacy = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const occ = {} as IOccurrence;

    if (isCreate) {
      occ.id = uuidv7();
      occ.title = titleRef?.current?.value ?? '';
    }

    if (props.occurrenceId && !isCreate) occ.id = props.occurrenceId;

    occ.isEvent = props.isEvent;

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

    if (endDateOfOccurrenceRef.current)
      occ.endDateOfOccurrence = new Date(endDateOfOccurrenceRef.current.value);

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

    if (!props.isEvent) {
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
    }

    if (isCreate) createOccurrence(occ);
    else updateOccurrence(occ);

    props.handleModal?.(false);
  };
  /* eslint-enable sonarjs/cognitive-complexity */

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValue('title', titleRef.current?.value ?? '');
    setValue('desc', descRef.current?.value ?? '');
    setValue(
      'category',
      (categoryRef.current?.value as OccurrenceCategoryEnum) ??
        OccurrenceCategoryEnum.Personal
    );
    setValue('dateOfOccurrence', dateOfOccurrenceRef.current?.value ?? '');
    setValue(
      'endDateOfOccurrence',
      endDateOfOccurrenceRef.current?.value ?? ''
    );
    setValue('allDay', isAllDay);
    setValue('startTime', startTimeRef.current?.value ?? '');
    setValue('endTime', endTimeRef.current?.value ?? '');
    setValue('weekRepetition', weekRepetition);
    setValue('monthRepetition', monthRepetition);
    setValue('yearRepetition', yearRepetition);
    setValue('weekRepetitionSpace', weekRepetitionSpace);
    setValue('monthRepetitionSpace', monthRepetitionSpace);
    setValue('yearRepetitionSpace', yearRepetitionSpace);
    setValue('endsType', endsType);
    setValue(
      'qntOccurrencesTillEnd',
      Number(qntOccurrencesTillEndRef.current?.value ?? 0)
    );

    const isValid = await trigger();
    if (isValid) handleSubmitLegacy(e);
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
    register,
    errors,
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

import { OccurrenceCategoryEnum } from '@/enum/OccurrenceEnum';
import useOccurrenceStore from '@/store/occurrenceStore';
import { useRef, useState } from 'react';

const useOccurrenceForm = ({
  occurrenceId,
  allDay,
}: {
  occurrenceId: string;
  allDay: boolean;
}) => {
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const dateOfOccurrenceRef = useRef<HTMLInputElement>(null);
  const startTimeRef = useRef<HTMLInputElement>(null);
  const endTimeRef = useRef<HTMLInputElement>(null);
  const {
    updateOccurrenceTitle,
    updateOccurrenceDesc,
    updateOccurrenceDate,
    updateOccurrenceStartTime,
    updateOccurrenceEndTime,
    updateOccurrenceCategory,
    updateAllDay,
  } = useOccurrenceStore();
  const [titleEditMode, setTitleEditMode] = useState(false);
  const [isAllDay, setIsAllDay] = useState(allDay);
  const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (descRef.current) {
      updateOccurrenceDesc(occurrenceId, descRef.current.value);
    }

    if (categoryRef.current) {
      const isValidCategory = Object.values(OccurrenceCategoryEnum).some(
        (c) =>
          c ===
          (categoryRef.current?.options[categoryRef.current.selectedIndex]
            .value as OccurrenceCategoryEnum)
      );
      updateOccurrenceCategory(
        occurrenceId,
        isValidCategory
          ? (categoryRef.current.value as OccurrenceCategoryEnum)
          : OccurrenceCategoryEnum.Personal
      );
    }

    if (dateOfOccurrenceRef.current) {
      updateOccurrenceDate(
        occurrenceId,
        new Date(dateOfOccurrenceRef.current.value)
      );
    }

    updateAllDay(occurrenceId, isAllDay);

    if (isAllDay) {
      updateOccurrenceStartTime(occurrenceId, null);
      updateOccurrenceEndTime(occurrenceId, null);
    } else {
      if (startTimeRef.current) {
        updateOccurrenceStartTime(occurrenceId, startTimeRef.current.value);
      }

      if (endTimeRef.current) {
        updateOccurrenceEndTime(occurrenceId, endTimeRef.current.value);
      }
    }

    setSubmittedSuccessfully(true);
  };

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
    handleTitleUpdateOnKeyDown,
    handleTitleUpdateOnBlur,
    handleTitleEditMode,
    titleEditMode,
    isAllDay,
    handleAllDay,
    handleSubmit,
    submittedSuccessfully,
    clearForm,
  };
};

export default useOccurrenceForm;

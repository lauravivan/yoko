import DefaultButton from '@/components/action/DefaultButton';
import { WeekDayEnum } from '@/enum/DayEnum';
import { formatDateForInput } from '@/helpers/formatters/date';
import { type IOccurrence } from '@/types/Occurrence';
import { OccurrenceEndsTypeEnum } from '../enum/OccurrenceEndsTypeEnum';
import { OccurrenceCategoryEnum } from '../enum/OccurrenceCategoryEnum';

const OccurrenceCreateEdit = (props: {
  isCreate: boolean;
  isEvent: boolean;
  occurrence?: IOccurrence;
  titleRef: React.RefObject<HTMLTextAreaElement | null>;
  descRef: React.RefObject<HTMLTextAreaElement | null>;
  categoryRef: React.RefObject<HTMLSelectElement | null>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  dateOfOccurrenceRef: React.RefObject<HTMLInputElement | null>;
  isAllDay: boolean;
  handleAllDay: () => void;
  startTimeRef: React.RefObject<HTMLInputElement | null>;
  endTimeRef: React.RefObject<HTMLInputElement | null>;
  handleMonthRepetition: React.Dispatch<React.SetStateAction<number>>;
  handleYearRepetition: React.Dispatch<React.SetStateAction<number>>;
  handleWeekRepetition: React.Dispatch<React.SetStateAction<number>>;
  handleWeekRepetitionSpace: React.Dispatch<React.SetStateAction<number>>;
  handleMonthRepetitionSpace: React.Dispatch<React.SetStateAction<number>>;
  handleYearRepetitionSpace: React.Dispatch<React.SetStateAction<number>>;
  endsType: OccurrenceEndsTypeEnum;
  handleEndsType: React.Dispatch<React.SetStateAction<OccurrenceEndsTypeEnum>>;
  endDateOfOccurrenceRef: React.RefObject<HTMLInputElement | null>;
  qntOccurrencesTillEndRef: React.RefObject<HTMLInputElement | null>;
  weekRepetition: number;
  monthRepetition: number;
  weekRepetitionSpace: number;
  monthRepetitionSpace: number;
  weekDayRepetitionRefs: (el: HTMLInputElement) => void;
}) => {
  const {
    isCreate,
    isEvent,
    titleRef,
    occurrence,
    categoryRef,
    descRef,
    handleSubmit,
    dateOfOccurrenceRef,
    handleAllDay,
    isAllDay,
    endTimeRef,
    startTimeRef,
    handleMonthRepetition,
    handleMonthRepetitionSpace,
    handleWeekRepetition,
    handleWeekRepetitionSpace,
    handleYearRepetition,
    handleYearRepetitionSpace,
    endsType,
    handleEndsType,
    endDateOfOccurrenceRef,
    qntOccurrencesTillEndRef,
    monthRepetition,
    monthRepetitionSpace,
    weekRepetition,
    weekRepetitionSpace,
    weekDayRepetitionRefs,
  } = props;

  return (
    <form className="c-create-edit-occurrence-form" onSubmit={handleSubmit}>
      {isCreate ? (
        <textarea
          placeholder="Unamed"
          onClick={(e) => e.stopPropagation()}
          ref={titleRef}
          maxLength={50}
          autoFocus
          rows={1}
          className="c-create-edit-occurrence-form__title-edit"
        />
      ) : (
        <h3 className="c-create-edit-occurrence-form__title">
          Edit <span>{occurrence?.title}</span>
        </h3>
      )}
      {/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */}
      <textarea
        className="c-create-edit-occurrence-form__desc"
        placeholder={occurrence?.desc || 'Description...'}
        ref={descRef}
        maxLength={250}
        rows={4}
        defaultValue={occurrence?.desc ?? ''}
      />
      {/* eslint-enable @typescript-eslint/prefer-nullish-coalescing */}
      <select defaultValue={occurrence?.category} ref={categoryRef}>
        <option value="" disabled>
          Choose a category
        </option>
        {Object.values(OccurrenceCategoryEnum).map((occ) => (
          <option key={occ} value={occ}>
            {occ}
          </option>
        ))}
      </select>
      <div className="c-create-edit-occurrence-form__date-wrapper">
        <input
          type="date"
          defaultValue={
            occurrence?.dateOfOccurrence
              ? formatDateForInput(occurrence.dateOfOccurrence)
              : undefined
          }
          ref={dateOfOccurrenceRef}
        />
        <div className="c-create-edit-occurrence-form__all-day">
          <input
            name="all-day"
            id="all-day"
            type="checkbox"
            onChange={handleAllDay}
            defaultChecked={occurrence?.allDay}
          />
          <label htmlFor="all-day">All day</label>
        </div>
      </div>
      {!isAllDay && (
        <div className="c-create-edit-occurrence-form__times">
          <input
            type="time"
            ref={startTimeRef}
            defaultValue={occurrence?.startTime ?? '00:00'}
          />
          <input
            type="time"
            ref={endTimeRef}
            defaultValue={occurrence?.endTime ?? '00:00'}
          />
        </div>
      )}
      {!isEvent && (
        <>
          <div className="c-create-edit-occurrence-form__weekday-rep">
            {Object.keys(WeekDayEnum).map((item) => (
              <div key={item}>
                <input
                  type="checkbox"
                  name="weekday-repetition"
                  ref={weekDayRepetitionRefs}
                  id={item}
                  value={item}
                  defaultChecked={occurrence?.weekDayRepetition.some(
                    (wdr) => wdr === (item as WeekDayEnum)
                  )}
                />
                <label htmlFor={item}>{item}</label>
              </div>
            ))}
          </div>
          <div className="c-create-edit-occurrence-form__rep">
            <span>Repeat every: </span>
            <div>
              <div>
                <input
                  type="number"
                  id="repeat-week"
                  name="repeat-week"
                  defaultValue={occurrence?.weekRepetition ?? 0}
                  min={0}
                  disabled={monthRepetition > 0}
                  onChange={(e) =>
                    handleWeekRepetition(parseInt(e.target.value))
                  }
                />
                <label htmlFor="repeat-week">week</label>
              </div>
              <div>
                <input
                  type="number"
                  id="repeat-month"
                  name="repeat-month"
                  defaultValue={occurrence?.monthRepetition ?? 0}
                  min={0}
                  disabled={weekRepetition > 0}
                  onChange={(e) =>
                    handleMonthRepetition(parseInt(e.target.value))
                  }
                />
                <label htmlFor="repeat-month">month</label>
              </div>
              <div>
                <input
                  type="number"
                  id="repeat-year"
                  name="repeat-year"
                  defaultValue={occurrence?.yearRepetition ?? 0}
                  min={0}
                  onChange={(e) =>
                    handleYearRepetition(parseInt(e.target.value))
                  }
                />
                <label htmlFor="repeat-year">year</label>
              </div>
            </div>
          </div>
          <div className="c-create-edit-occurrence-form__rep-space">
            <span>Repetition space: </span>
            <div>
              <div>
                <input
                  id="repeat-week-space"
                  name="repeat-week-space"
                  type="number"
                  defaultValue={occurrence?.weekRepetitionSpace ?? 0}
                  min={0}
                  disabled={weekRepetitionSpace > 0}
                  onChange={(e) =>
                    handleWeekRepetitionSpace(parseInt(e.target.value))
                  }
                />
                <label htmlFor="repeat-week-space">week</label>
              </div>
              <div>
                <input
                  id="repeat-month-space"
                  name="repeat-month-space"
                  type="number"
                  defaultValue={occurrence?.monthRepetitionSpace ?? 0}
                  min={0}
                  disabled={monthRepetitionSpace > 0}
                  onChange={(e) =>
                    handleMonthRepetitionSpace(parseInt(e.target.value))
                  }
                />
                <label htmlFor="repeat-month-space">month</label>
              </div>
              <div>
                <input
                  id="repeat-year-space"
                  name="repeat-year-space"
                  type="number"
                  defaultValue={occurrence?.yearRepetitionSpace ?? 0}
                  min={0}
                  onChange={(e) =>
                    handleYearRepetitionSpace(parseInt(e.target.value))
                  }
                />
                <label htmlFor="repeat-year-space">year</label>
              </div>
            </div>
          </div>
          <div className="c-create-edit-occurrence-form__ends">
            <span>When it ends: </span>
            <div>
              <input
                type="radio"
                name="ends"
                onChange={() => handleEndsType(OccurrenceEndsTypeEnum.Never)}
                id="ends-never"
                defaultChecked={
                  occurrence?.endsType === OccurrenceEndsTypeEnum.Never ||
                  !occurrence?.endsType
                }
              />
              <label htmlFor="ends-never">{OccurrenceEndsTypeEnum.Never}</label>
            </div>
            <div>
              <input
                type="radio"
                name="ends"
                id="ends-on"
                defaultChecked={
                  occurrence?.endsType === OccurrenceEndsTypeEnum.On
                }
                onChange={() => handleEndsType(OccurrenceEndsTypeEnum.On)}
              />
              <label htmlFor="ends-on">{OccurrenceEndsTypeEnum.On}</label>
              <input
                type="date"
                disabled={endsType !== OccurrenceEndsTypeEnum.On}
                ref={endDateOfOccurrenceRef}
                defaultValue={
                  occurrence?.endDateOfOccurrence
                    ? formatDateForInput(occurrence.endDateOfOccurrence)
                    : undefined
                }
              />
            </div>
            <div>
              <input
                type="radio"
                name="ends"
                id="ends-after"
                onChange={() => handleEndsType(OccurrenceEndsTypeEnum.After)}
                defaultChecked={
                  occurrence?.endsType === OccurrenceEndsTypeEnum.After
                }
              />
              <label htmlFor="ends-after">{OccurrenceEndsTypeEnum.After}</label>
              <input
                type="number"
                defaultValue={occurrence?.qntOccurrencesTillEnd ?? 0}
                min={0}
                name="qnt-occurrences"
                id="qnt-occurrences"
                ref={qntOccurrencesTillEndRef}
                disabled={endsType !== OccurrenceEndsTypeEnum.After}
              />
              <label htmlFor="qnt-occurrences">occurrences</label>
            </div>
          </div>
        </>
      )}
      <DefaultButton type="submit">
        {isCreate ? 'Create' : 'Save'}
      </DefaultButton>
    </form>
  );
};

export default OccurrenceCreateEdit;

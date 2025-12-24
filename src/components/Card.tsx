import { useMemo, useState } from "react";
import { ModalContentType } from "@/types/modal";
import { BsCheckAll } from "react-icons/bs";
import { GiPartyPopper } from "react-icons/gi";
import { getCountingOfDays } from "@/util/date/getCountingOfDays";
import { formatDate } from "@/util/date/formatDate";
import { AppType } from "@/types/app";
import getCounting from "@/util/date/getCounting";

interface CardType {
  event: EventType;
  updateEventDesc: (id: string, newDesc: string) => void;
  deleteEvent: (id: string) => void;
  openModal: (type: ModalContentType) => void;
  handleEventId: (id: string) => void;
  handleTitle: (title: string) => void;
  app: AppType;
}

const Card = ({
  event,
  updateEventDesc,
  deleteEvent,
  openModal,
  handleEventId,
  handleTitle,
  app
}: CardType) => {
  const [isCardHover, setIsCardHover] = useState(false);
  const countOfDays = useMemo(
    () => getCountingOfDays(event.date),
    [event.date]
  );
  const countDateExtense = useMemo(
    () => formatDate(new Date(event.date)),
    [event.date]
  );
  const count = useMemo(() => getCounting(event.date), [event.date])

  const handleMouseOver = () => {
    setIsCardHover(true);
  };

  const handleMouseLeave = () => {
    setIsCardHover(false);
  };

  const handleDesc = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newDesc = e.target.value;
    updateEventDesc(event.id, newDesc);
  };

  const handleDelete = () => {
    deleteEvent(event.id);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleClick = () => {
    openModal("card");
    handleEventId(event.id);
    handleTitle(`Edit ${event.desc}`);
  };

  return (
    <article
      className="card scale-in-center"
      style={{ backgroundColor: `#${event.color}` }}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card__content">
        <div>
          <form onSubmit={handleFormSubmit}>
            <textarea
              name="card-desc"
              id={event.id}
              className="desc"
              value={event.desc}
              placeholder={event.desc}
              autoComplete="off"
              onChange={handleDesc}
              maxLength={63}
              rows={3}
            />
          </form>
          <span onClick={handleClick}>{app === 'countdown' ? countDateExtense : count}</span>
        </div>
        {app === 'countdown' && <div
          className="count"
          onClick={handleClick}
          style={{ border: `2px solid #${event.color}` }}
        >
          <span>{countOfDays}</span>
        </div>}
      </div>
      {isCardHover && (
        <button
          type="button"
          className="card__check"
          onClick={handleDelete}
          aria-label="Remover evento"
        >
          <BsCheckAll />
        </button>
      )}
      {app === 'countdown' && countOfDays.includes("today") && (
        <div className="card__party pulsate-bck">
          <GiPartyPopper />
        </div>
      )}
    </article>
  );
};

export default Card;
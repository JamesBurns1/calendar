import React, { useState, useRef } from "react";
import "./Calendar.css";
import EventDetails from "../EventDetails/EventDetails";

const Calendar = (props) => {
  const { events } = props;
  const [date, setDate] = useState(new Date());
  const [showMonths, setShowMonths] = useState(false);
  const [showYears, setShowYears] = useState(false);
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthGridRef = useRef(null);
  const yearGridRef = useRef(null);
  const [clickedDate, setClickedDate] = useState(null);

  const toggleMonths = () => {
    setShowMonths(!showMonths);
    setShowYears(false);
  };

  const toggleYears = () => {
    setShowYears(!showYears);
    setShowMonths(false);
  };

  const handleMonthClick = (month) => {
    const newDate = new Date(date);
    newDate.setMonth(months.indexOf(month));
    setDate(newDate);
    setShowMonths(false);
  };

  const handleYearClick = (year) => {
    const newDate = new Date(date);
    newDate.setFullYear(year);
    setDate(newDate);
    setShowYears(false);
  };

  const months = Array.from({ length: 12 }, (_, i) =>
    new Date(0, i).toLocaleString("default", { month: "long" })
  );

  const years = Array.from(
    { length: 50 },
    (_, i) => date.getFullYear() - 25 + i
  );

  const daysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const renderDaysOfWeek = () => {
    return daysOfWeek.map((day, index) => (
      <div key={index} className="weekday">
        {day}
      </div>
    ));
  };

  const renderDates = () => {
    const totalDays = daysInMonth(date);
    const firstDay = firstDayOfMonth(date);
    const blanks = Array.from({ length: firstDay }, (_, i) => (
      <div key={`blank-${i}`} className="empty"></div>
    ));

    const days = Array.from({ length: totalDays }, (_, i) => i + 1).map(
      (day) => {
        // Get the events for the current date
        const eventsForDay = events.filter((event) => {
          const eventDate = new Date(event.date);
          return (
            eventDate.getDate() === day &&
            eventDate.getMonth() === date.getMonth() &&
            eventDate.getFullYear() === date.getFullYear()
          );
        });

        // Limit the number of event dots to 4 per day
        const visibleEvents = eventsForDay.slice(0, 4);
        // Check if there are more events than the visible ones
        const hasMoreEvents = eventsForDay.length > visibleEvents.length;

        return (
          <div
            key={`day-${day}`}
            className="day"
            onClick={() => props.handleDateClick(eventsForDay)}
          >
            {day}
            {/* Show event dots for visible events */}
            {renderEvents(visibleEvents)}
            {/* Show indicator if there are more events */}
            {hasMoreEvents && <div className="more-events-indicator">(+)</div>}
          </div>
        );
      }
    );
    return [...blanks, ...days];
  };

  const renderEvents = (eventsForDay) => {
    const eventDots = eventsForDay.map((event, index) => (
      <div key={index} className={`event-dot ${event.type}`}></div>
    ));
    return eventDots;
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button
          onClick={() =>
            setDate(new Date(date.getFullYear() - 1, date.getMonth()))
          }
        >
          &lt;&lt;
        </button>
        <button
          onClick={() =>
            setDate(new Date(date.getFullYear(), date.getMonth() - 1))
          }
        >
          &lt;
        </button>
        <div className="month-header" onClick={toggleMonths}>
          <span>{`${date.toLocaleString("default", { month: "long" })}`}</span>
          <div
            className={`month-grid ${showMonths ? "show" : ""}`}
            ref={monthGridRef}
          >
            {months.map((month, index) => (
              <div key={index} onClick={() => handleMonthClick(month)}>
                {month}
              </div>
            ))}
          </div>
        </div>
        <div className="year-header" onClick={toggleYears}>
          <span>{date.getFullYear()}</span>
          <div
            className={`year-grid ${showYears ? "show" : ""}`}
            ref={yearGridRef}
          >
            {years.map((year, index) => (
              <div key={index} onClick={() => handleYearClick(year)}>
                {year}
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={() =>
            setDate(new Date(date.getFullYear(), date.getMonth() + 1))
          }
        >
          &gt;
        </button>
        <button
          onClick={() =>
            setDate(new Date(date.getFullYear() + 1, date.getMonth()))
          }
        >
          &gt;&gt;
        </button>
      </div>
      <div className="weekdays">{renderDaysOfWeek()}</div>
      <div className="days">
        <EventDetails
          events={events}
          show={clickedDate !== null}
          onClose={() => setClickedDate(null)}
        />
        {renderDates()}
      </div>
    </div>
  );
};

export default Calendar;

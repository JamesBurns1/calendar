import React, { useState } from "react";
import "./App.css";
import Calendar from "./components/Calendar/Calendar";
import EventForm from "./components/EventForm/EventForm";
import EventDetails from "./components/EventDetails/EventDetails";

function App() {
  const [events, setEvents] = useState([]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [showEventDetails, setShowEventDetails] = useState(false);

  const addEvent = (newEvent) => {
    setEvents([...events, newEvent]);
    setShowEventForm(false);
  };

  const handleCloseEventDetails = () => {
    setShowEventDetails(false);
  };

  const editEvent = (editedEvent) => {
    const updatedEvents = events.map((event) =>
      event.id === editedEvent.id ? editedEvent : event
    );
    setEvents(updatedEvents);
  };

  const deleteEvent = (eventId) => {
    const updatedEvents = events.filter((event) => event.id !== eventId);
    setEvents(updatedEvents);
  };

  const handleDateClick = (eventsForDay) => {
    setSelectedEvents(eventsForDay);
    setShowEventDetails(true);
  };

  const toggleFormVisibility = () => {
    setShowEventForm(!showEventForm);
  };

  return (
    <div>
      <Calendar
        events={events}
        editEvent={editEvent}
        deleteEvent={deleteEvent}
        toggleFormVisibility={toggleFormVisibility}
        handleDateClick={handleDateClick}
      />
      <EventForm
        addEvent={addEvent}
        showEventForm={showEventForm}
        toggleFormVisibility={toggleFormVisibility}
      />
      <EventDetails
        events={selectedEvents}
        show={showEventDetails}
        onClose={handleCloseEventDetails}
        onEdit={editEvent}
        onDelete={deleteEvent}
      />
    </div>
  );
}

export default App;

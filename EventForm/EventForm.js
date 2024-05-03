import React, { useState } from "react";
import "./EventForm.css";

function EventForm({ addEvent, showEventForm, toggleFormVisibility }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Adjust the date by adding one day
    const adjustedDate = new Date(date);
    adjustedDate.setDate(adjustedDate.getDate() + 1);

    const newEvent = {
      id: Date.now(),
      title,
      date: adjustedDate.toLocaleDateString(), // Convert adjusted date to string
      time,
      type,
      notes,
    };
    addEvent(newEvent);
    setTitle("");
    setDate("");
    setTime("");
    setType("");
    setNotes("");
  };

  return (
    <div className="event-form-wrapper">
      {!showEventForm && (
        <button className="create-btn" onClick={toggleFormVisibility}>
          Add to Calendar
        </button>
      )}
      {showEventForm && (
        <div className="event-form-container">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Event Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="">Select Event Type</option>
              <option value="appointment">Appointment</option>
              <option value="meeting">Meeting</option>
              <option value="birthday">Birthday</option>
              <option value="other">Other</option>
            </select>
            <textarea
              placeholder="Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="notes"
            ></textarea>
            <button type="submit" className="add-btn">
              Add Event
            </button>
            <button className="cancel-btn" onClick={toggleFormVisibility}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default EventForm;

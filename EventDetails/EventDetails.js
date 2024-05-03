import React, { useState } from "react";
import "./EventDetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

function EventDetails({ events, show, onClose, onEdit, onDelete }) {
  const [editedEvent, setEditedEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (eventId) => {
    const eventToEdit = events.find((event) => event.id === eventId);
    setEditedEvent(eventToEdit);
    setIsEditing(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent({ ...editedEvent, [name]: value });
  };

  const handleEditSubmit = () => {
    if (onEdit && editedEvent) {
      // Hard-coding one more day to fix event display issue
      const adjustedDate = new Date(editedEvent.date);
      adjustedDate.setDate(adjustedDate.getDate() + 1);

      const updatedEvent = { ...editedEvent, date: adjustedDate };

      // Call the onEdit function with the updated event
      onEdit(updatedEvent);
      setIsEditing(false);
      onClose();
    }
  };

  const handleDelete = (eventId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (isConfirmed && onDelete) {
      onDelete(eventId);
      onClose();
    }
  };

  if (!show) return null;

  return (
    <div className="event-details">
      <h2 className="details-label">Today's Plans</h2>
      {isEditing ? (
        <div className="edit-form">
          <input
            type="text"
            name="title"
            value={editedEvent.title}
            onChange={handleEditInputChange}
          />
          <input
            type="date"
            name="date"
            value={editedEvent.date}
            onChange={handleEditInputChange}
          />
          <input
            type="time"
            name="time"
            value={editedEvent.time}
            onChange={handleEditInputChange}
          />
          <select
            name="type"
            value={editedEvent.type}
            onChange={handleEditInputChange}
          >
            <option value="">Select Event Type</option>
            <option value="appointment">Appointment</option>
            <option value="meeting">Meeting</option>
            <option value="birthday">Birthday</option>
            <option value="other">Other</option>
          </select>
          <textarea
            name="notes"
            value={editedEvent.notes}
            onChange={handleEditInputChange}
          />
          <button className="save-btn" onClick={handleEditSubmit}>
            Save Changes
          </button>
          <button className="cancel-btn" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </div>
      ) : (
        <>
          <button className="close-btn" onClick={onClose}>
            <FontAwesomeIcon
              icon={faCircleXmark}
              size="xl"
              style={{ color: "#000000" }}
            />
          </button>
          {events.length === 0 ? (
            <strong>Nothing Scheduled</strong>
          ) : (
            <ul>
              {events.map((event) => (
                <li key={event.id}>
                  <h2>{event.title}</h2>
                  <p>
                    <strong>Date:</strong>{" "}
                    {event.date.toLocaleString(undefined, {
                      month: "numeric",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <p>
                    <strong>Time:</strong>{" "}
                    {(() => {
                      const time = event.time;
                      const hours = parseInt(time.split(":")[0], 10);
                      const minutes = parseInt(time.split(":")[1], 10);
                      const ampm = hours >= 12 ? "PM" : "AM";
                      const formattedHours = hours % 12 || 12;
                      return `${formattedHours}:${
                        minutes < 10 ? "0" : ""
                      }${minutes} ${ampm}`;
                    })()}
                  </p>

                  <p>
                    <strong>Type:</strong> {event.type}
                  </p>
                  <p>
                    <strong>Notes:</strong> {event.notes}
                  </p>
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(event.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(event.id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}

export default EventDetails;

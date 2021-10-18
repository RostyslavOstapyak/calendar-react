import React, { useState } from "react";

import "./modal.scss";

const Modal = ({ onCreateEvent, closeModal }) => {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    startTime: "00:00",
    endTime: "00:00",
  });

  const { title, description, date, startTime, endTime } = eventData;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEventData({
      ...eventData,
      [name]: value,
    });
  };

  return (
    <div className="modal overlay" onClick={closeModal}>
      <div className="modal__content">
        <div className="create-event">
          <button className="create-event__close-btn" onClick={closeModal}>
            +
          </button>
          <form
            onSubmit={(e) => onCreateEvent(e, eventData)}
            className="event-form"
          >
            <input
              onChange={handleChange}
              value={title}
              type="text"
              name="title"
              placeholder="Title"
              className="event-form__field"
            />
            <div className="event-form__time">
              <input
                onChange={handleChange}
                value={date}
                type="date"
                name="date"
                className="event-form__field"
              />
              <input
                type="time"
                name="startTime"
                className="event-form__field"
                onChange={handleChange}
                value={startTime}
              />
              <span>-</span>
              <input
                onChange={handleChange}
                value={endTime}
                type="time"
                name="endTime"
                className="event-form__field"
              />
            </div>
            <textarea
              name="description"
              placeholder="Description"
              className="event-form__field"
              onChange={handleChange}
              value={description}
            ></textarea>
            <button type="submit" className="event-form__submit-btn">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;

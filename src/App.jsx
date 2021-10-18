import React, { useState } from "react";
import moment from "moment";
import Header from "./components/header/Header.jsx";
import Calendar from "./components/calendar/Calendar.jsx";
import Modal from "./components/modal/Modal.jsx";
import events from "./gateway/events";

import { getWeekStartDate, generateWeekRange } from "../src/utils/dateUtils.js";

import "./common.scss";

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const [isShowModal, setIsShowModal] = useState(false);
  const [eventsList, setEventsList] = useState(events);

  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

  const goNextWeek = () => {
    setWeekStartDate(
      new Date(weekStartDate.setDate(new Date(weekStartDate).getDate() + 7))
    );
  };

  const goPrevWeek = () => {
    setWeekStartDate(
      new Date(weekStartDate.setDate(new Date(weekStartDate).getDate() - 7))
    );
  };

  const goToday = () => {
    setWeekStartDate(new Date());
  };

  const toggleModal = (e) => {
    const target = e.target;
    if (
      target.classList.contains("create-event-btn") ||
      target.classList.contains("create-event__close-btn") ||
      target.classList.contains("overlay")
    ) {
      setIsShowModal(!isShowModal);
    }
  };

  const getMaxId = () => {
    let maxId = 0;
    eventsList.map((event) => {
      if (event.id > maxId) {
        maxId = event.id;
      }
    });
    return maxId;
  };

  const createEvent = (e, eventData) => {
    e.preventDefault();

    const { date, description, endTime, startTime, title } = eventData;
    const newId = getMaxId() + 1;
    const newEvent = {
      id: newId,
      title,
      description,
      dateFrom: new Date(`${date} ${startTime}`),
      dateTo: new Date(`${date} ${endTime}`),
    };
    setEventsList([...eventsList, newEvent]);
  };

  const removeEvent = (id) => {
    setEventsList(eventsList.filter((event) => event.id !== id));
  };

  return (
    <>
      <Header
        weekDates={weekDates}
        goNextWeek={goNextWeek}
        goPrevWeek={goPrevWeek}
        goToday={goToday}
        showModal={toggleModal}
      />
      {isShowModal && (
        <Modal closeModal={toggleModal} onCreateEvent={createEvent} />
      )}
      <Calendar
        weekDates={weekDates}
        eventsList={eventsList}
        removeEvent={removeEvent}
      />
    </>
  );
};

export default App;

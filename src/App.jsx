import React, { useState } from "react";
import moment from "moment";
import Header from "./components/header/Header.jsx";
import Calendar from "./components/calendar/Calendar.jsx";
import Modal from "./components/modal/Modal.jsx";

import { getWeekStartDate, generateWeekRange } from "../src/utils/dateUtils.js";

import "./common.scss";

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const [isShowModal, setIsShowModal] = useState(false);

  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

  const goNextWeek = () => {
    const copyData = new Date(weekStartDate);
    let nextWeekStartDate = moment(copyData).get("date");
    setWeekStartDate(moment(copyData).set("date", nextWeekStartDate + 7)._d);
  };

  const goPrevWeek = () => {
    const copyData = new Date(weekStartDate);
    let nextWeekStartDate = moment(copyData).get("date");
    setWeekStartDate(moment(copyData).set("date", nextWeekStartDate - 7)._d);
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

  const getMaxId = () => {};

  const createEvent = (e, eventData) => {
    e.preventDefault();
    console.log(eventData);

    const { date, description, endTime, startTime, title } = eventData;

    // date: "2021-10-19";
    // description: "wfw";
    // endTime: "04:00";
    // startTime: "03:00";
    // title: "wfw";

    const newId = getMaxId() + 1;

    const newEvent = {
      id: newId,
      title,
      description,
      dateFrom: new Date(date).setHours(startTime),
      dateTo: new Date(date).setHours(endTime),
    };

    //   {
    //   id: 3,
    //   title: "Lunch",
    //   description: "",
    //   dateFrom: new Date(2021, 9, 19, 6, 15),
    //   dateTo: new Date(2021, 9, 19, 8, 15),
    // },
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
      <Calendar weekDates={weekDates} />
    </>
  );
};

export default App;

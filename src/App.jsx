import React, { useState } from "react";
import moment from "moment";
import Header from "./components/header/Header.jsx";
import Calendar from "./components/calendar/Calendar.jsx";

import { getWeekStartDate, generateWeekRange } from "../src/utils/dateUtils.js";

import "./common.scss";

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(new Date());

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

  return (
    <>
      <Header
        weekDates={weekDates}
        goNextWeek={goNextWeek}
        goPrevWeek={goPrevWeek}
        goToday={goToday}
      />
      <Calendar weekDates={weekDates} />
    </>
  );
};

export default App;

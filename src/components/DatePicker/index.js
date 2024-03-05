import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const DatePicker = (props) => {
  const [date, setDate] = useState(new Date());
  const [overrideDates, setOverrideDates] = useState(props?.overrideDates);

  useEffect(() => {
    setOverrideDates(props?.overrideDates);
  }, [props?.overrideDates]);

  const onChange = (date) => {
    setDate(date);
    props.onDate(date);
  };

  const isDateDisabled = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return (
      date < today ||
      overrideDates?.some(
        (overrideDate) =>
          date.toDateString() === new Date(overrideDate).toDateString()
      )
    );
  };
  return (
    <Calendar
      onChange={onChange}
      value={date}
      tileDisabled={({ date, view }) =>
        view === "month" && isDateDisabled(date)
      }
    />
  );
};

export default DatePicker;

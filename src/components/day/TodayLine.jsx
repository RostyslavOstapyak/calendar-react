import React from "react";

const TodayLine = () => {
  const currentHour = new Date().getHours();
  const currentMinute = new Date().getMinutes();

  const [lineHeight, setLineHeight] = React.useState({
    top: `${currentHour * 60 + currentMinute / 60}px`,
  });

  React.useEffect(() => {
    const currentTimeout = setInterval(() => {
      setLineHeight({ top: `${currentHour * 60 + currentMinute / 60}px` });
    }, 60000);

    return () => {
      clearInterval(currentTimeout);
    };
  }, []);

  return (
    <div className="current-day-line" style={lineHeight}>
      <i className="fas fa-caret-right current-day-line__triangle"></i>
      <i className="fas fa-caret-left current-day-line__triangle"></i>
    </div>
  );
};

export default TodayLine;

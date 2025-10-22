import "./Calendar.css";
import { useState } from "react";

function Calendar({ selectedDate, setSelectedDate }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // 이번 달 첫째날, 마지막날
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // 요일(0:일~6:토)
  const startDay = firstDay.getDay();
  const daysInMonth = lastDay.getDate();

  // 달력에 표시할 날짜 배열로 만들기
  const dates = [];
  for (let i = 0; i < startDay; i++) {
    dates.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    dates.push(i);
  }

  // 이전/다음 달 이동
  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };
  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };
  // 날짜 클릭
  const handleSelectDate = (date) => {
    if (date) setSelectedDate(new Date(year, month, date));
  };

  return (
    <div className="Calendar">
      <div className="header">
        <button onClick={handlePrevMonth}>◀</button>
        <span>
          {year}년 {month + 1}월
        </span>
        <button onClick={handleNextMonth}>▶</button>
      </div>

      <div className="weekdays">
        {["일", "월", "화", "수", "목", "금", "토"].map((d) => (
          <div key={d} className="weekday">
            {d}
          </div>
        ))}
      </div>

      <div className="dates">
        {dates.map((date, i) => {
          const isSelected =
            date &&
            selectedDate &&
            selectedDate.getDate() === date &&
            selectedDate.getMonth() === month &&
            selectedDate.getFullYear() === year;

          return (
            <div
              key={i}
              className={`date-cell ${isSelected ? "selected" : ""}`}
              onClick={() => handleSelectDate(date)}
            >
              {date || ""}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;

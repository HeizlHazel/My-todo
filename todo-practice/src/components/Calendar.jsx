import { TodoDispatchContext, TodoStateContext } from "../App";
import "./Calendar.css";
import { useContext, useState } from "react";

const Calendar = () => {
  // 전역 상태(context)에서 필요한 값 불러오기
  const { selectedDate, todos } = useContext(TodoStateContext); // 현재 선택된 날짜
  const { setSelectedDate } = useContext(TodoDispatchContext); // 날짜 변경 함수

  // 현재 달 기준으로 달력을 그리기 위한 state
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0: 1월

  // 이번 달 첫째날, 마지막날
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // 요일(0:일~6:토)
  const startDay = firstDay.getDay();
  const daysInMonth = lastDay.getDate(); // 이번 달 총 일수

  // 달력에 표시할 날짜 배열로 만들기
  const dates = [];
  // 1일 이전 빈 칸(null) 채우기
  for (let i = 0; i < startDay; i++) {
    dates.push(null);
  }
  // 1일부터 마지막날까지 숫자 채우기
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

  // 해당 날짜에 todo가 존재하는지 확인
  const hasTodos = (date) => {
    if (!date) return false;
    // YYYY-MM-DD 형식 통일
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      date
    ).padStart(2, "0")}`;
    // padStart 문자열 길이가 2보다 짧으면 앞에 0을 채움
    // todos 중에서 date가 같은 게 있는지 확인
    return todos.some((todo) => todo.date === dateStr);
  };

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return (
      date === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  // 오늘 날짜로 이동하기
  const handleToday = () => {
    const today = new Date();
    setCurrentDate(today); // 현재 달로 이동
    setSelectedDate(today); // 오늘 날짜 선택 상태로 변경
  };

  return (
    <div className="Calendar">
      <div className="header">
        <span>
          {year}년 {month + 1}월
        </span>
        <button className="today-btn" onClick={handleToday}>
          오늘
        </button>
        <div className="btn-container">
          <button onClick={handlePrevMonth}>&lt;</button>
          <button onClick={handleNextMonth}>&gt;</button>
        </div>
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
          // 현재 선택된 날짜냐
          const isSelected =
            date &&
            selectedDate &&
            selectedDate.getDate() === date &&
            selectedDate.getMonth() === month &&
            selectedDate.getFullYear() === year;

          return (
            <div
              key={i}
              className={`date-cell ${isSelected ? "selected" : ""} ${
                hasTodos(date) ? "has-todo" : ""
              } ${isToday(date) ? "today" : ""}`}
              onClick={() => handleSelectDate(date)}
            >
              {date || ""}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;

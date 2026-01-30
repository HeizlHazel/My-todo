import { useNavigate } from "react-router-dom";
import "./TodoReport.css";
import { useContext, useMemo, useState } from "react";
import { TodoStateContext } from "../App";

const TodoReport = () => {
  const nav = useNavigate();
  const { todos } = useContext(TodoStateContext);

  // 현재 날짜로 초기화
  const [currentDate, setCurrentDate] = useState(new Date());

  // 월별 통계와 요일별 통계 계산
  const { monthlyStats, weekdayStats } = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const targetYearMonth = `${year}-${month}`;

    // 해당 월의 todos 필터링
    const filteredTodos = todos.filter(
      (todo) => todo.date.substring(0, 7) === targetYearMonth
    );

    // 월별 통계
    const completed = filteredTodos.filter((todo) => todo.completed).length;

    const monthlyStats = {
      month: `${year}년 ${parseInt(month)}월`,
      completed,
      total: filteredTodos.length,
    };

    // 요일별로 완료된 할 일 통계
    const weekdayCount = [0, 0, 0, 0, 0, 0, 0]; // 일~토
    filteredTodos
      .filter((todo) => todo.completed)
      .forEach((todo) => {
        const date = new Date(todo.date);
        const dayOfWeek = date.getDay();
        weekdayCount[dayOfWeek]++;
      });

    return {
      monthlyStats,
      weekdayStats: weekdayCount,
    };
  }, [todos, currentDate]);

  // 이전 달로 이동
  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  // 다음 달로 이동
  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const percentage =
    monthlyStats.total > 0
      ? Math.round((monthlyStats.completed / monthlyStats.total) * 100)
      : 0;

  return (
    <div className="TodoReport">
      <div className="header">
        <button className="header-btn" onClick={() => nav(`/`)}>
          &lt;
        </button>
        <h2>나의 기록</h2>
      </div>
      <div className="content">
        {/* 월 내비게이션 */}
        <div className="month-navigation">
          <span>{monthlyStats.month} 통계</span>
          <div className="btn-container">
            <button onClick={handlePrevMonth}>&lt;</button>
            <button onClick={handleNextMonth}>&gt;</button>
          </div>
        </div>

        {/* 통계 요약 */}
        <div className="stats-summary">
          <div className="main-stat">
            <div className="main-stat-label">완료한 일</div>
            <span className="main-stat-value">{monthlyStats.completed}</span>
            <span className="main-stat-total"> / {monthlyStats.total}</span>
          </div>
        </div>

        {/* 월별 통계 그래프 */}
        {monthlyStats.total > 0 ? (
          <div className="progress-section">
            <div className="progress-container">
              <div className="progress-header">
                <span className="progress-label">전체 진행도</span>
                <span className="progress-percentage">{percentage}%</span>
              </div>
              <div className="progress-bar-bg">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${percentage}%` }}
                >
                  <span className="progress-text">
                    {monthlyStats.completed}/{monthlyStats.total}
                  </span>
                </div>
              </div>

              {/* 요일별 완료 통계 */}
              <div className="weekday-stats">
                {["일", "월", "화", "수", "목", "금", "토"].map((day, i) => (
                  <div key={day} className="day-stat">
                    <div className="day-label">{day}</div>
                    <div
                      className={`day-circle ${
                        weekdayStats[i] > 0 ? "has-complete" : ""
                      }`}
                    >
                      {weekdayStats[i]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="no-data">이 달의 할 일이 없습니다.</div>
        )}
      </div>
    </div>
  );
};
export default TodoReport;

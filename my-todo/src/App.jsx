import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Report from "./pages/Report";
import { createContext, useEffect, useReducer, useState } from "react";
import { formatDate } from "./utils/dateUtils";

export const TodoStateContext = createContext();
export const TodoDispatchContext = createContext();

function todoReducer(state, action) {
  let nextState;
  switch (action.type) {
    case "INIT":
      return action.payload;

    case "ADD":
      nextState = [...state, action.payload];
      break;

    case "TOGGLE":
      nextState = state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
      break;

    case "UPDATE":
      nextState = state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.text }
          : todo
      );
      break;

    case "DELETE":
      nextState = state.filter((todo) => todo.id !== action.payload);
      break;

    default:
      return state;
  }

  // todos 상태가 바뀔 때마다 localStorage 업데이트
  localStorage.setItem("todos", JSON.stringify(nextState));
  return nextState;
}

function App() {
  // 날짜, 할 일 목록 관리
  const [selectedDate, setSelectedDate] = useState(null);
  const [todos, dispatch] = useReducer(todoReducer, []);

  // 초기 랜더링 시 localStorage 데이터 불러오기
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      try {
        const parsed = JSON.parse(storedTodos);
        if (Array.isArray(parsed)) {
          dispatch({ type: "INIT", payload: parsed });

          // 오늘 날짜에 할 일이 있는지 확인
          const today = new Date();
          const todayStr = formatDate(today);
          const hasTodosToday = parsed.some((todo) => todo.date === todayStr);

          // 오늘 할 일이 있으면 오늘 날짜 자동 선택
          if (hasTodosToday) {
            setSelectedDate(today);
          }
        }
      } catch (e) {
        console.error("❌ todos 파싱 실패:", e);
      }
    }
  }, []);

  return (
    <TodoStateContext.Provider value={{ selectedDate, todos }}>
      <TodoDispatchContext.Provider value={{ setSelectedDate, dispatch }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

export default App;

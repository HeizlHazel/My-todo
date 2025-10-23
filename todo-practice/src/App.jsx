import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Report from "./pages/Report";
import { createContext, useEffect, useState } from "react";

export const TodoStateContext = createContext();
export const TodoDispatchContext = createContext();

function App() {
  // 날짜, 할 일 목록 관리
  const [selectedDate, setSelectedDate] = useState(null);
  const [todos, setTodos] = useState(() => {
    // localStorage에서 todos 불러오기
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  // todo 변경 시 자동 저장
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoStateContext.Provider value={{ selectedDate, todos }}>
      <TodoDispatchContext.Provider value={{ setSelectedDate, setTodos }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

export default App;

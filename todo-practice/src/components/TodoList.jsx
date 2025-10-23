import { useContext, useReducer, useState } from "react";
import "./TodoList.css";
import { TodoDispatchContext, TodoStateContext } from "../App";
import { formatDate } from "../utils/dateUtils";

// 초기 상태
const initialState = {
  inputValue: "",
  openMenuId: null,
  editingId: null,
  editValue: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE":
      return { ...state, ...action.payload };

    case "START_EDIT":
      return {
        ...state,
        editingId: action.payload.id,
        editValue: action.payload.text,
        openMenuId: null,
      };

    case "RESET_EDIT":
      return { ...state, editingId: null, editValue: "" };

    default:
      return state;
  }
}

const TodoList = () => {
  const { selectedDate, todos } = useContext(TodoStateContext);
  const { dispatch } = useContext(TodoDispatchContext);

  // useReducer로 여러 상태를 하나로 관리
  const [state, localDispatch] = useReducer(reducer, initialState);
  const { inputValue, openMenuId, editingId, editValue } = state;

  // 선택된 날짜를 문자열로 변환
  const dateStr = formatDate(selectedDate);
  // 선택된 날짜의 할 일만 필터링
  const todosForDate = todos.filter((todo) => todo.date === dateStr);

  // 할 일 추가
  const handleAddTodo = () => {
    // 입력 값이 비어있거나 날짜 선택되지 않았으면 종료
    if (!inputValue.trim() || !selectedDate) return;
    // 새로운 할 일 객체 생성
    dispatch({
      type: "ADD",
      payload: {
        id: Date.now(),
        date: dateStr,
        text: inputValue,
        completed: false,
      },
    });
    localDispatch({ type: "UPDATE", payload: { inputValue: "" } });
  };

  // 할 일 완료/미완료 토글
  const handleToggleTodo = (id) => {
    dispatch({ type: "TOGGLE", payload: id });
  };

  // UI 상태는 localDispatch, todos 업데이트는 dispatch
  // 메뉴 토글
  const handleToggleMenu = (id) => {
    localDispatch({
      type: "UPDATE",
      payload: { openMenuId: openMenuId === id ? null : id },
    });
  };

  // 수정 시작
  const handleStartEdit = (todo) => {
    localDispatch({
      type: "START_EDIT",
      payload: { id: todo.id, text: todo.text },
    });
  };

  // 수정 완료
  const handleSaveEdit = (id) => {
    if (!editValue.trim()) return;
    dispatch({
      type: "UPDATE",
      payload: { id, text: editValue },
    });
    localDispatch({ type: "RESET_EDIT" });
  };

  // 수정 취소
  const handleCancelEdit = () => {
    localDispatch({ type: "RESET_EDIT" });
  };

  // 삭제
  const handleDeleteTodo = (id) => {
    dispatch({ type: "DELETE", payload: id });
    localDispatch({ type: "UPDATE", payload: { openMenuId: null } });
  };

  return (
    <div className="TodoList">
      {/* <h4>
        {selectedDate
          ? `${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일`
          : "날짜를 선택하세요"}
      </h4> */}

      {/* 날짜 선택되었을 때만 입력 폼과 할 일 목록 표시 */}
      {selectedDate && (
        <>
          {/* 할 일 입력 */}
          <div className="input-container">
            <input
              type="text"
              value={inputValue}
              onChange={(e) =>
                localDispatch({
                  type: "UPDATE",
                  payload: { inputValue: e.target.value },
                })
              }
              onKeyPress={(e) => e.key === "Enter" && handleAddTodo()}
              placeholder="할 일을 입력하세요"
            />
            {/* <button onClick={handleAddTodo}>추가</button> */}
          </div>

          {/* 할 일 목록 */}
          <div className="todo-items">
            {todosForDate.map((todo) => (
              <div key={todo.id} className="todo-item">
                {/* 완료 체크박스 */}
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleTodo(todo.id)}
                />

                {editingId === todo.id ? (
                  // 수정 모드
                  <>
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) =>
                        localDispatch({
                          type: "UPDATE",
                          payload: { editValue: e.target.value },
                        })
                      }
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleSaveEdit(todo.id)
                      }
                      className="edit-input"
                      autoFocus
                    />
                    <button
                      className="save-btn"
                      onClick={() => handleSaveEdit(todo.id)}
                    >
                      저장
                    </button>
                    <button className="cancel-btn" onClick={handleCancelEdit}>
                      취소
                    </button>
                  </>
                ) : (
                  // 일반 모드
                  <>
                    <span
                      className={`todo-text ${
                        todo.completed ? "completed" : ""
                      }`}
                    >
                      {todo.text}
                    </span>

                    {openMenuId === todo.id ? (
                      // 메뉴 열림 - 수정/삭제 버튼 표시
                      <>
                        <button
                          className="edit-btn"
                          onClick={() => handleStartEdit(todo)}
                        >
                          수정
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => handleDeleteTodo(todo.id)}
                        >
                          삭제
                        </button>
                      </>
                    ) : (
                      // 메뉴 닫힘 - ⋮ 버튼만 표시
                      <button
                        className="menu-btn"
                        onClick={() => handleToggleMenu(todo.id)}
                      >
                        ⋮
                      </button>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TodoList;

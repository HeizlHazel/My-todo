import { useNavigate } from "react-router-dom";
import "./TodoReport.css";

const TodoReport = () => {
  const nav = useNavigate();

  return (
    <div className="TodoReport">
      <div className="header">
        <button onClick={() => nav(`/`)}>&lt;</button>
        <h2>나의 기록</h2>
      </div>
      <div className="content">
        <div>할 일 몇 개 완료했는지 쓸거임</div>
      </div>
    </div>
  );
};

export default TodoReport;

import Header from "./../components/Header";
import Content from "./../components/Content";
import Calendar from "./../components/Calendar";
import TodoList from "../components/TodoList";

const Home = () => {
  return (
    <div>
      <Header />
      <div>
        <Calendar />
        <TodoList />
      </div>
      <Content />
    </div>
  );
};

export default Home;

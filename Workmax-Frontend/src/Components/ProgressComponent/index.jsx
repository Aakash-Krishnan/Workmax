import { Droppable } from "react-beautiful-dnd";
import "./index.scss";
import { useSelector } from "react-redux";

const ProgressComponent = () => {
  const tasks = useSelector((state) => state.tasks.tasks);

  return (
    <div>
      <h2>Work in Progress</h2>
    </div>
  );
};

export default ProgressComponent;

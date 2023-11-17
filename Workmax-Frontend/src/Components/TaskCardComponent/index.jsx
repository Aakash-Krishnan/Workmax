/* eslint-disable react/prop-types */
import "./index.scss";
import { Draggable } from "react-beautiful-dnd";

const TaskCard = ({ task, index, handleSelectedUser }) => {
  const truncatedContent = task.task.substring(0, 70) + "...";
  return (
    <Draggable key={task.id} index={index} draggableId={task.id}>
      {(provided) => (
        <div
          onClick={handleSelectedUser}
          className="task-card"
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <div className="content-wrapper">
            <div className="content-inner-wrapper">
              <p>{task.title}</p>
              <p>{task.createdAt}</p>
            </div>
            <div
              className="task-content"
              dangerouslySetInnerHTML={{ __html: truncatedContent }}
            ></div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;

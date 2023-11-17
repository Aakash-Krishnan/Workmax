import { useMemo } from "react";
import { getUserTasksAPI, updateTask } from "../../App/Api/FirestoreApi";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TaskCard from "../TaskCardComponent";
import { Card, Space } from "antd";
import "./index.scss";
import { selectCurentUserDetails } from "../../App/User/userSlice";
import { useState } from "react";
import CurrentTask from "../CurrentTask";

const HomeComponent = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [selectedTask, setSelectedTask] = useState([]);
  const [selectedtaskPage, setSelectedtaskPage] = useState(false);
  const tasks = useSelector((state) => state.tasks.tasks);
  const tabs = ["Progress", "Works", "Completed"];
  const handleOnDragEnd = ({ source, destination, draggableId }) => {
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;
    const taskFiltered = tasks.filter((task) => task.id === draggableId);
    const updatedAt = new Date().toLocaleString("en-US");
    updateTask(taskFiltered[0].id, destination.droppableId, updatedAt);
  };
  useMemo(() => {
    getUserTasksAPI(currentUser.userID, dispatch);
  }, [currentUser.userID]);

  return (
    <>
      {selectedtaskPage ? (
        <CurrentTask
          setSelectedtaskPage={setSelectedtaskPage}
          selectedTask={selectedTask}
        />
      ) : (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <div>
            {tabs.map((tab) => (
              <div key={tab}>
                <Space
                  direction="vertical"
                  size="middle"
                  style={{ display: "flex" }}
                >
                  <Card
                    title={tab}
                    size="large"
                    style={{
                      boxShadow: "none",
                      overflow: "hidden",
                      marginBottom: "10px",
                      width: "100%",
                      border: "1px solid black",
                    }}
                  >
                    <Droppable droppableId={tab}>
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {tasks
                            ?.filter((task) => task.tabs === tab)
                            .map((task, index) => {
                              return (
                                <div className="task-card-outer" key={index}>
                                  <TaskCard
                                    handleSelectedUser={() => {
                                      setSelectedtaskPage(true);
                                      setSelectedTask(task);
                                    }}
                                    task={task}
                                    index={index}
                                  />
                                </div>
                              );
                            })}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </Card>
                </Space>
              </div>
            ))}
          </div>
        </DragDropContext>
      )}
    </>
  );
};

export default HomeComponent;

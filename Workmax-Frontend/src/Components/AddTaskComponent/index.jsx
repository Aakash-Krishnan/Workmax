import { useState } from "react";
import "./index.scss";
import ReactQuill from "react-quill";
import { Col, Input, Row, Slider, Button, Card } from "antd";
import { postTaskDetails } from "../../App/Api/FirestoreApi";
import { useSelector } from "react-redux";

const AddTasksComponent = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [taskInputs, setTaskInputs] = useState("");
  const [title, setTitle] = useState("");
  const [hourSlider, setHourSlider] = useState(0);
  const [breakTime, setBreakTime] = useState(0);

  const formatter = (hourSlider) => {
    var hours = Math.floor(hourSlider / 60);
    var minutes = hourSlider % 60;
    return hours + ":" + minutes;
  };

  const hourSliderhandler = (newValue) => {
    setHourSlider(newValue);
  };

  const handleForm = () => {
    var hours = Math.floor(hourSlider / 60);
    var minutes = hourSlider % 60;

    const object = {
      taskId: crypto.randomUUID(),
      updatedAt: new Date().toLocaleString("en-US"),
      createdAt: new Date().toLocaleString("en-US"),
      userId: currentUser?.userID,
      title: title,
      task: taskInputs,
      break: breakTime,
      workTime: {
        hours: hours,
        minutes: minutes,
        total: hourSlider,
      },
      tabs: "Works",
    };
    postTaskDetails(object);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  return (
    <>
      <p>New Tasks</p>
      <div className="task-wrapper">
        <div className="details-wrapper">
          <Row>
            <Col span={24}>
              <label htmlFor="title">Title</label>
              <Input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                name="title"
                placeholder="Basic usage"
              />

              <label htmlFor="task">What to work</label>
              <ReactQuill
                placeholder="Enter the task Details"
                className="modal-input"
                theme="snow"
                value={taskInputs}
                onChange={setTaskInputs}
                name="task"
                modules={modules}
                formats={formats}
              />

              <p>Work time</p>
              <Slider
                onChange={hourSliderhandler}
                value={hourSlider}
                defaultValue={30}
                step={15}
                max={180}
                tooltip={{
                  formatter,
                }}
              />

              <p>Short break time</p>
              <Slider
                onChange={setBreakTime}
                value={breakTime}
                defaultValue={5}
                step={5}
                max={30}
              />

              <Button
                disabled={
                  !title.trim() ||
                  !taskInputs.trim() ||
                  !breakTime ||
                  !hourSlider
                }
                onClick={handleForm}
                className="add-task-btn"
                type="primary"
              >
                Add Task
              </Button>
            </Col>
          </Row>
        </div>

        <div className="preview-wrapper">
          <h2>Preview</h2>
          <Card title={title} bordered={false}>
            <div dangerouslySetInnerHTML={{ __html: taskInputs }}></div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AddTasksComponent;

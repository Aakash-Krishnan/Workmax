import { useState } from "react";
import "./index.scss";
import ReactQuill from "react-quill";
import { Col, Input, Row, Slider } from "antd";
import { Button, Card } from "antd";

const AddTasksComponent = () => {
  const [taskInputs, setTaskInputs] = useState("Content");
  const [title, setTitle] = useState("Enter Ttile");
  const [datas, setDatas] = useState({});
  const [hourSlider, setHourSlider] = useState(1);
  const [breakTime, setBreakTime] = useState(1);

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

    setDatas({
      title: title,
      task: taskInputs,
      break: breakTime,
      workTime: {
        hours: hours,
        minutes: minutes,
        total: hourSlider,
      },
    });
  };
  console.log(datas);

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
    <div className="task-wrapper">
      <p>New Tasks</p>
      <div>
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
              defaultValue={30}
              step={5}
              max={30}
            />

            <Button
              onClick={handleForm}
              className="add-task-btn"
              type="primary"
            >
              Add Task
            </Button>
          </Col>
        </Row>
      </div>

      <Card title={title} bordered={false}>
        <div dangerouslySetInnerHTML={{ __html: taskInputs }}></div>
      </Card>
    </div>
  );
};

export default AddTasksComponent;

/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Button, Progress } from "antd";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import "./index.scss";

const CurrentTask = ({ setSelectedtaskPage, selectedTask }) => {
  const workTime = selectedTask?.workTime?.total;
  const breakTime = selectedTask.break;
  const [time, setTime] = useState(workTime);
  const [breakTimer, setBreakTimer] = useState(breakTime);
  const [timerStart, setTimerStart] = useState(false);

  const formatter = (hourSlider) => {
    var hours = Math.floor(hourSlider / 60);
    var minutes = hourSlider % 60;
    if (hours !== 0) {
      return hours + "hr" + ":" + minutes + "min";
    } else {
      return minutes + "min";
    }
  };

  const disableNotificationsDuringTimer = () => {
    if (Notification.prototype.originalNotify) return; // Already disabled

    // Override the notify method to block notifications
    Notification.prototype.originalNotify = Notification.prototype.notify;
    Notification.prototype.notify = function () {};
  };

  const revertNotificationChanges = () => {
    if (Notification.prototype.originalNotify) {
      // Revert the changes made to the Notification prototype
      Notification.prototype.notify = Notification.prototype.originalNotify;
      delete Notification.prototype.originalNotify;
    }
  };

  const twoColors = {
    "0%": "#108ee9",
    "100%": "#87d068",
  };

  useEffect(() => {
    if (timerStart) {
      disableNotificationsDuringTimer();
    } else {
      revertNotificationChanges();
    }
  }, [timerStart]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timerStart) {
        if (time > 0) {
          setTime(time - 1);
        } else if (time === 0 && breakTimer > 0) {
          setBreakTimer(breakTimer - 1);
        } else if (breakTimer === 0 && time === 0) {
          clearInterval(interval);
        }
      }
    }, 1000 * 60);

    return () => clearInterval(interval);
  }, [timerStart, time, workTime, breakTimer]);

  return (
    <>
      <div className="top-content">
        <div className="timer-wrapper">
          <Progress
            strokeColor={timerStart && twoColors}
            size={150}
            type="circle"
            percent={time > 0 ? time : breakTimer}
            format={(percent) => `${formatter(percent)}`}
          />
          <div>
            <Button
              type="primary"
              onClick={() => {
                setTimerStart(!timerStart);
              }}
            >
              {!timerStart ? "Start" : "pause"}
            </Button>
            <Button
              onClick={() => {
                setTimerStart(false);
                setTime(workTime);
                setBreakTimer(breakTime);
              }}
            >
              reset
            </Button>
          </div>
        </div>

        <div className="edit-close-wrapper">
          <Button className="edit">
            <EditOutlined />
          </Button>
          <Button className="close" onClick={() => setSelectedtaskPage(false)}>
            <CloseOutlined />
          </Button>
        </div>
      </div>

      <div className="title-wrapper">
        <div>
          <p>Title</p>
          <h2>{selectedTask.title}</h2>
          <p className="updated-time">
            <span>updated at:</span> {selectedTask.updatedAt}
          </p>
        </div>
        <p className="tab">{selectedTask.tabs}</p>
      </div>

      <div className="task-details-wrapper">
        <p className="description">Description</p>
        <div dangerouslySetInnerHTML={{ __html: selectedTask.task }}></div>
      </div>
    </>
  );
};

export default CurrentTask;

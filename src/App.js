import React, { useState, useEffect } from "react";
import "./index.css";

export default function App() {
  const [seconds, setSeconds] = useState(59);
  const [centiseconds, setCentiSeconds] = useState(9);
  const handleClick = () => {
    console.log("turned");
    setSeconds(59);
    setCentiSeconds(9);
  };
  const [paused, setPaused] = useState(false);

  const handlePause = (e) => {
    e.stopPropagation();
    setPaused(!paused);

    console.log({ paused });
  };

  useEffect(() => {
    const countdown = setInterval(() => {
      if (!paused) {
        if (parseInt(centiseconds) > 0) {
          setCentiSeconds(parseInt(centiseconds) - 1);
        }

        if (parseInt(centiseconds) === 0) {
          if (parseInt(seconds) > 0) {
            setSeconds(parseInt(seconds) - 1);
            setCentiSeconds(9);
          }
          if (parseInt(seconds) === 0 && parseInt(centiseconds) === 0) {
            setCentiSeconds(9);
            setSeconds(59);
          }
        }
      }
    }, 100);
    return () => clearInterval(countdown);
  }, [seconds, centiseconds, paused]);

  return (
    <div className="App" style={{ backgroundColor: "var(--primary-color)" }}>
      {/* {style={{ backgroundColor: var(--primary-color) }}} */}
      <div onClick={handleClick}>
        {/* {seconds < 10 ? `0${seconds}` : seconds}.{centiseconds} */}
        {seconds}.{centiseconds}
        <div className="pause">
          <button onClick={handlePause} onDrag={handlePause}>
            {paused ? "Resume" : "Pause"}
          </button>
        </div>
      </div>
    </div>
  );
}

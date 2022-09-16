import React, { useState, useEffect } from "react";
import "./index.css";
import { useScrollBy } from "react-use-window-scroll";

export default function App() {
  const [seconds, setSeconds] = useState(59);
  const [centiseconds, setCentiSeconds] = useState(9);
  const handleClick = () => {
    console.log("turned");
    setSeconds(59);
    setCentiSeconds(9);
  };
  const [paused, setPaused] = useState(false);
  const [tensec, setTensec] = useState(false);
  const scrollBy = useScrollBy();

  const handlePause = (e) => {
    e.stopPropagation();
    setPaused(!paused);

    console.log({ paused });
  };

  useEffect(() => {
    const handleScroll = (event) => {
      console.log("scroll-turned");
      setSeconds(59);
      setCentiSeconds(9);
    };

    window.addEventListener("scroll", handleScroll);
  }, []);

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
            clearInterval(countdown);
          }
        }
      }

      if (parseInt(seconds) === 10 && parseInt(centiseconds) === 0) {
        setTensec(true);
      }
      if (
        (parseInt(seconds) === 9 && parseInt(centiseconds) === 9) ||
        parseInt(seconds) === 59
      ) {
        setTensec(false);
      }
      if (parseInt(seconds) === 59 && parseInt(centiseconds) === 8) {
        window.scrollTo(0, 1);
      }
    }, 100);
    return () => clearInterval(countdown);
  }, [seconds, centiseconds, paused]);

  return (
    <div className={tensec ? "ten" : "App"}>
      <div onClick={handleClick} onDragEnd={handleClick} onDrag={handleClick}>
        {/* {seconds < 10 ? `0${seconds}` : seconds}.{centiseconds} */}
        {seconds}.{centiseconds}
        <div className="pause">
          <button onClick={handlePause}>{paused ? "Resume" : "Pause"}</button>
        </div>
      </div>
    </div>
  );
}

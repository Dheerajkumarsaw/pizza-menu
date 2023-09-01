import { useEffect, useState } from "react";

export function Time() {
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    useEffect(function () {
      setInterval(function () {
        setTime(new Date().toLocaleTimeString());
      }, 1000);
    }, []);
    return time;
  }
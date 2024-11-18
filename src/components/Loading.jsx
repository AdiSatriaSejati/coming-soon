import React from "react";
import "../styles/loading.css"; // Pastikan file CSS ini ada

const Loading = () => {
  const texts = ['W', 'e', 'l', 'c', 'o', 'm', 'e', ': )'];
  const number_of_particle = 12;

  return (
    <div>
      {texts.map((text, i) => (
        <div key={i} className={`background background${i}`}></div>
      ))}
      <div className="criterion">
        {texts.map((text, i) => (
          <div key={i} className={`text text${i}`}>{text}</div>
        ))}
        {texts.map((_, i) => (
          <div key={i} className={`frame frame${i}`}></div>
        ))}
        {texts.map((_, i) =>
          Array.from({ length: number_of_particle }).map((_, j) => (
            <div key={j} className={`particle particle${i}${j}`}></div>
          ))
        )}
      </div>
    </div>
  );
};

export default Loading;
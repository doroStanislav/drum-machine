import './App.css';
import React, { useState, useEffect, useRef } from 'react';

const drumPads = [
  { id: "Q", name: "Heater-1", src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3" },
  { id: "W", name: "Heater-2", src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3" },
  { id: "E", name: "Heater-3", src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3" },
  { id: "A", name: "Heater-4", src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3" },
  { id: "S", name: "Clap", src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3" },
  { id: "D", name: "Open-HH", src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3" },
  { id: "Z", name: "Kick-n'-Hat", src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3" },
  { id: "X", name: "Kick", src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3" },
  { id: "C", name: "Closed-HH", src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3" }
];

export function App() {
  const [display, setDisplay] = useState("");
  const audioRefs = useRef({});

  const playSound = (id, name) => {
    const audio = audioRefs.current[id];
    if (audio) {
      audio.currentTime = 0;
      audio.play();
      setDisplay(name);
    }
  }

  useEffect(() => {
    const handleKeyPress = (event) => {
      const pad = drumPads.find((pad) => pad.id === event.key.toUpperCase());
      if (pad) {
        playSound(pad.id, pad.name);
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div id="drum-machine">
      <div id="display">{display}</div>
        <div id="drum-buttons">
          {drumPads.map((pad) => (
            <button
              key={pad.id}
              className="drum-pad"
              id={pad.id}
              onClick={() => playSound(pad.id, pad.name)}
            >
              {pad.id}
              <audio
                ref={(el) => audioRefs.current[pad.id] = el}
                className="clip"
                id={pad.id}
                src={pad.src}
              ></audio>
            </button>
          ))}
      </div>
    </div>
  );
}

export default App;

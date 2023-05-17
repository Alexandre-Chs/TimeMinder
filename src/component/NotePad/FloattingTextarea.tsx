import "../../styles/Textarea/Textarea.css";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { useState } from "react";

const FloatingTextarea = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [{ x, y }, api] = useSpring(() => ({ x: position.x, y: position.y }));

  const bind = useDrag(({ down, movement: [mx, my] }) => {
    if (down) {
      api.start({ x: position.x + mx, y: position.y + my, immediate: true });
    } else {
      setPosition({ x: position.x + mx, y: position.y + my });
    }
  });

  return (
    <animated.div style={{ x, y }} className="timeminder-floating-textarea">
      <div {...bind()} className="timeinder-dragTextarea"></div>
      <textarea className="timeminder-textArea" />
    </animated.div>
  );
};

export default FloatingTextarea;

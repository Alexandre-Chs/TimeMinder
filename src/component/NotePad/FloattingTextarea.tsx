import "../../styles/Textarea/Textarea.css";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { useState, useEffect, ChangeEvent } from "react";
import useDebounce from "../../hook/useDebounce";

const FloatingTextarea = ({ isOpen }: { isOpen: boolean }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [{ x, y }, api] = useSpring(() => ({ x: position.x, y: position.y }));
  const [value, setValue] = useState<string>(() => {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].split("=");
      if (cookie[0] === "timefinderNotepadCookie") {
        return atob(decodeURIComponent(cookie[1]));
      }
    }
    return "";
  });

  const bind = useDrag(({ down, movement: [mx, my] }) => {
    if (down) {
      api.start({ x: position.x + mx, y: position.y + my, immediate: true });
    } else {
      setPosition({ x: position.x + mx, y: position.y + my });
    }
  });

  const debouncedValue = useDebounce<string | undefined>(value, 200);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    const encodedValue = btoa(value);
    const expirationDate = new Date(
      Date.now() + 20 * 365 * 24 * 60 * 60 * 1000
    );
    document.cookie = `timefinderNotepadCookie=${encodeURIComponent(
      encodedValue
    )}; expires=${expirationDate.toUTCString()}`;
  }, [debouncedValue]);

  return (
    <animated.div style={{ x, y }} className="timeminder-floating-textarea">
      <div {...bind()} className="timeminder-dragTextarea"></div>
      <textarea
        className="timeminder-textArea"
        value={value}
        onChange={handleChange}
      />
    </animated.div>
  );
};

export default FloatingTextarea;

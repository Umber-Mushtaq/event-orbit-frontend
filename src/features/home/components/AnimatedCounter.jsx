import { useEffect, useState } from "react";

function AnimatedCounter({ value, duration = 2000 }) {
  const [count, setCount] = useState(0);

  // Extract number and suffix (e.g., "5000+" -> number: 5000, suffix: "+")
  const numericValue = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    let startTimestamp = null;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      // Easing function for smooth slowing down at the end (ease-out-quad)
      const easeProgress = progress * (2 - progress);

      setCount(Math.floor(easeProgress * numericValue));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [numericValue, duration]);

  // Format numbers cleanly with commas (e.g., 5000 becomes 5,000)
  const formattedCount = count.toLocaleString();

  return (
    <>
      {formattedCount}
      {suffix}
    </>
  );
}

export default AnimatedCounter;

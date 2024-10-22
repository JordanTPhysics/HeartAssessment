import React, { useState } from 'react';

const Tooltip = ({ text, tooltipText }: { text: string; tooltipText: string }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span>{text}</span>
      {hover && (
        <div
          className="absolute left-1/2 transform -translate-x-1/2 mt-2 p-2 bg-gray-800 text-white text-sm rounded shadow-lg"
          style={{ whiteSpace: 'nowrap', zIndex: 10 }}
        >
          {tooltipText}
        </div>
      )}
    </div>
  );
};

export default Tooltip;

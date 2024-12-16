// Trainbuilder: Dashboard.jsx
"use client";
import * as React from 'react';
import { useState } from 'react';
import USMapRenderer from './D3Map'

const TrainbuilderDashboard = () => {
  const [maxSize, setMaxSize] = useState(0.45)

  return (
    <div className="flex flex-col items-center h-[90vh]">
      {/* Slider */}
      <div className="relative flex flex-col items-center">
        <p className="text-lg font-semibold">
          High Speed Rail Ridership
        </p>
        <div className="flex flex-col gap-2">
          <input
            type="range"
            value={maxSize}
            onChange={(e) => setMaxSize(parseFloat(e.target.value))}
            min={0.15}
            max={2.0}
            step={0.05}
            className="w-full"
            aria-label="Estimated ridership adjustment slider"
          />
        </div>
        <span className="text-sm">
            {maxSize.toLocaleString()} million riders per year.
          </span>
      </div>
      {/* Component */}
      <div className="flex-grow w-full overflow-auto">
          <USMapRenderer
            threshold={maxSize}
          />
      </div>
    </div>
  );
};

export default TrainbuilderDashboard;
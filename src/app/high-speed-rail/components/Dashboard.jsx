// Trainbuilder: Dashboard.jsx
"use client";
import * as React from 'react';
import { useState } from 'react';
import USMapRenderer from './D3Map'
import TableBuilder from './TableBuilder'
import { GraphProvider } from './GraphContext'

const TrainbuilderDashboard = () => {
  const [maxSize, setMaxSize] = useState(0.45)

  return (
    <div className="flex">
      <div className="flex md:w-full tiny:flex-col md:flex-row">
        {/* Component */}
        <GraphProvider>
          <div className='flex flex-col items-center'>
            {/* Slider */}
              <div className="tiny:block sm:relative sm:flex flex-col items-center md:mt-20">
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
              <TableBuilder />
          </div>
          <div className='tiny:h-[50vh] xs:h-[60vh] sm:h-[70vh] md:h-[90vh] md:w-full xl:h-auto'>
            <USMapRenderer
                  threshold={maxSize}
                />
          </div>
        </GraphProvider>
      </div>
    </div>
  );
};

export default TrainbuilderDashboard;
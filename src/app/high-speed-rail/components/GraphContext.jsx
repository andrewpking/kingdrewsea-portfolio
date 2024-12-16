// GraphContext.js
"use client";
import React, { createContext, useState } from 'react';
import Graph from './Graph';

const GraphContext = createContext();

const GraphProvider = ({ children }) => {
  const [graph, setGraph] = useState(new Graph());

  return (
    <GraphContext.Provider value={{ graph, setGraph }}>
      {children}
    </GraphContext.Provider>
  );
};

export { GraphContext, GraphProvider };
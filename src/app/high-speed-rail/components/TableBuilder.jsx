// TableBuilder.jsx
"use client";
import React, { useContext, useEffect, useState } from 'react';
import { GraphContext } from './GraphContext';
import { scaleOrdinal, schemeCategory10 } from 'd3';

const TableBuilder = () => {
  const { graph } = useContext(GraphContext);
  const [rows, setRows] = useState([]);

  // Extract data from the graph to create the table
  useEffect(() => {
    const railLines = graph.getRailLines();

    if (railLines && railLines.length > 0) {
      const colorScale = scaleOrdinal(schemeCategory10)
        .domain([0, railLines.length]);

      const distances = graph.getDistances(railLines);
      const riderships = graph.getRiderships(railLines);

      const tempRows = [];
      for (let index = 1; index <= railLines.length; index++) {
        const railLineColor = colorScale(index - 1);
        const distance = distances[index - 1];
        const ridership = riderships[index - 1];
        tempRows.push(
          <tr key={index}>
            <td className="py-2 text-center" style={{ backgroundColor: railLineColor }}> </td>
            <td className="py-2 text-center">{distance}</td>
            <td className="py-2 text-center">{ridership.toLocaleString()}</td>
          </tr>
        );
      }
      setRows(tempRows);
    }
  }, [graph]);

  

  return (
    <div className="items-center justify-center">
      <h3 className='text-xl mb-2 mt-10'>High Speed Rail Network</h3>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Rail Line</th>
            <th className="py-2">Distance (km)</th>
            <th className="py-2">Estimated Ridership</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  );
};

export default TableBuilder;
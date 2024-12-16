// D3Map.jsx
"use client";
import React, { useState, useRef, useEffect, useCallback, useContext } from 'react';
import * as d3 from 'd3';
import { DataUtil } from './DataUtil';
import { GraphContext } from './GraphContext';

const D3Map = ({ threshold }) => {
  const svgRef = useRef(null);
  const tooltipRef = useRef(null);
  const [path, setPath] = useState(null);
  const [tooltip, setTooltip] = useState(null);
  const [svg, setSvg] = useState(null);
  const { graph, setGraph } = useContext(GraphContext);
  const [mapData, setMapData] = useState({
    csa: null,
    cities: null,
    usTopo: null,
    edges: null
  });

  useEffect(() => {
    // Get container dimensions
    if (svgRef.current) {
      const containerElement = svgRef.current.parentElement;
      const w = containerElement.clientWidth;
      const h = containerElement.clientHeight;

      // Setup responsive SVG
      const s = d3.select(svgRef.current);
      s
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('viewBox', `0 0 ${w} ${h}`)
        .attr('preserveAspectRatio', 'xMidYMid meet');
      setSvg(s);

      // Setup projection and path
      const proj = d3.geoAlbersUsa()
        .scale(w * 1.3)
        .translate([w / 2, h / 2]);

      const pth = d3.geoPath().projection(proj);
      setPath(() => pth);

      // Setup tooltip
      const tltp = d3.select(tooltipRef.current)
        .style('position', 'fixed')
        .style('visibility', 'hidden')
        .style('background-color', 'white')
        .style('padding', '10px')
        .style('border', '1px solid #ddd')
        .style('border-radius', '5px')
        .style('box-shadow', '0 2px 5px rgba(0,0,0,0.1)');
      setTooltip(tltp);
    }
  }, [svgRef]);

  // Run init function only once when the component mounts
  useEffect(() => {
    DataUtil.init(setMapData, setGraph);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // Function to render states
  const renderStates = useCallback(() => {
    if (!svg || !path || !mapData.usTopo) return;
    svg.selectAll('.state')
      .data(mapData.usTopo.features)
      .enter()
      .append('path')
      .attr('d', path)
      .attr('class', 'state')
      .style('fill', '#f0f0f0')
      .style('stroke', '#ffffff')
      .style('stroke-width', '1px');
  },[mapData.usTopo, path, svg]);

  // Function to render CSAs
  const renderCSAs = useCallback(() => {
    if (!svg || !path || !mapData.csa) return;
    svg.selectAll('.csa')
      .data(mapData.csa.features)
      .enter()
      .append('path')
      .attr('d', path)
      .attr('class', 'csa')
      .style('fill', 'rgba(33, 33, 250, 0.1')
      .style('stroke', '#fff')
      .style('stroke-width', '1px');
  },[mapData.csa, path, svg]);

  // Function to render edges and nodes
  const renderGraph = useCallback(() => {
    if (!graph || !svg || !path) return;
    const railLines = graph.getRailLines();
    console.log("Rendered ",railLines)

    // Draw edges, make each rail line a different color
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10)
      .domain([0, railLines.length]);

    // Clear existing edges
    svg.selectAll(`.edge`)
      .remove();
  
    for (let i = 0; i < railLines.length; i++) {
      svg.selectAll(`.edge-${i}`)
        .data(railLines[i])
        .enter()
        .append('path')
        .attr('class', 'edge')
        .attr('d', d => {
          const source = graph.getCity(d.geoid1);
          const target = graph.getCity(d.geoid2);
          if (!source || !target) {
            return null;
          }

          const sourceCoords = source.geometry.coordinates;
          const targetCoords = target.geometry.coordinates;

          return path({ type: 'LineString', coordinates: [sourceCoords, targetCoords] });
        })
        .attr('stroke', d => colorScale(i))
        .attr('stroke-width', 3)
        .attr('opacity', 0.75);
    }

    // Extract distinct cities from edges
    const allCoordinates = graph.getAllCityGeom();
    const activeCoordinates = graph.getActiveCityGeom();

    // Draw all nodes, assuming they are inactive
    svg.selectAll('.inactive-node')
      .data(allCoordinates)
      .enter()
      .append('circle')
      .attr('class', 'csa-node')
      .attr('cx', d => path.centroid(d)[0])
      .attr('cy', d => path.centroid(d)[1])
      .attr('r', 5)
      .attr('fill', 'grey');

    // Draw nodes on top of inactive nodes
    svg.selectAll('.active-node')
      .data(activeCoordinates)
      .enter()
      .append('circle')
      .attr('class', 'csa-node')
      .attr('cx', d => path.centroid(d)[0])
      .attr('cy', d => path.centroid(d)[1])
      .attr('r', 5)
      .attr('fill', 'blue');
  }, [graph, path, svg]);

  // Make the tooltip target larger by drawing invisble lines.
  const renderTooltip = useCallback( () => {
    if (!graph || !path || !svg) return
    const links = graph.getAllEdges();

    // Clear existing tooltip lines
    svg.selectAll('.edge-tooltip')
      .remove();
    
    const tooltipLine = svg.selectAll('.edge-tooltip')
      .data(links)
      .enter()
      .append('path')
      .attr('class', 'edge-tooltip')
      .attr('d', d => {
        const source = graph.getCity(d.geoid1);
        const target = graph.getCity(d.geoid2);
        if (!source || !target) {
          return null;
        }

        const sourceCoords = source.geometry.coordinates;
        const targetCoords = target.geometry.coordinates;

        return path({ type: 'LineString', coordinates: [sourceCoords, targetCoords] });
      })
      .attr('stroke', 'transparent')
      .attr('stroke-width', 12)
      .attr('opacity', 0)

    tooltipLine.on('mouseover', (event, d) => {
      const source = graph.getCity(d.geoid1);
      const target = graph.getCity(d.geoid2);
      const sourceCity = source.properties.city_name.split(',')[0]; 
      const targetCity = target.properties.city_name.split(',')[0];
      const distance = d.distance;
      const ridership = Math.round(d.coeff * Math.pow(10, 6));

      const line = d3.select(event.target);
            
      line.attr('stroke', 'blue')
        .attr('opacity', 1.0)
        .attr('stroke-width', 5);

      // Address aliasing issues with the tooltip, keep in viewport.
      const tooltipWidth = 200; 
      const tooltipHeight = 100; 
      let left = event.clientX + 20;
      let top = event.clientY + 10;

      if (left + tooltipWidth > window.innerWidth) {
        left = window.innerWidth - tooltipWidth - 20;
      }
      if (top + tooltipHeight > window.innerHeight) {
        top = window.innerHeight - tooltipHeight - 10;
      }

      tooltip
        .style('visibility', 'visible')
        .style('top', `${top}px`)
        .style('left', `${left}px`)
        .html(`
          <strong>Connection Details:</strong><br>
          Connection from: ${sourceCity} to ${targetCity}<br>
          Distance: ${Math.round(distance)} kilometers<br>
          Estimated Ridership: ${ridership.toLocaleString()}
        `);
      })
      .on('mouseout', () => {
        d3.select(tooltipRef.current).style('visibility', 'hidden');
        d3.selectAll('.edge-tooltip').attr('stroke', 'transparent')
        .attr('opacity', 0)
        .attr('stroke-width', 12);
      })
      .on('click', (event, d) => {
        if (!graph) return;
        const edge = structuredClone(graph.getEdge(d.geoid1, d.geoid2));
        if (edge.active){
          graph.removeEdge(d.geoid1, d.geoid2);
        } else if (edge) {
          graph.addEdge(d.geoid1, d.geoid2, edge);
        } else {
          console.log('Edge not found');
        }
        const newGraph = graph.copy();
        setGraph(newGraph);
        renderGraph();
        renderTooltip();
        });
  }, [graph , path, tooltip, svg, tooltipRef, setGraph, renderGraph]);

  const createInitialGraph = useCallback(() => {
    // Render states, CSAs, and edges
    renderStates(svg, path);
    renderCSAs(svg, path);
    renderGraph(svg, path);
    renderTooltip(svg, path, tooltip);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[renderStates, renderCSAs, svg, path, tooltip]);

  // Render map function
  const renderMap = useCallback( () => {
    if (!svg) return;

    // Clear existing content
    svg.selectAll('*').remove();

    createInitialGraph();
  }, [createInitialGraph, svg]);

  // Only do the initial map rendering once.
  useEffect(() => {
    renderMap();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[mapData.csa, mapData.edges, mapData.cities]);

  // Filter the map data based on the threshold
  const filterMapData = useCallback((threshold) => {
    if (!mapData.edges || !graph) return;
    const edges = mapData.edges;
    edges.forEach(edge => {
      if (edge.coeff >= threshold) {
        graph.addEdge(edge.geoid1, edge.geoid2, edge); 
      } else { 
        graph.removeEdge(edge.geoid1, edge.geoid2);
      } });
    const newGraph = graph.copy();
    setGraph(newGraph);
    if (svg && path) {
      renderGraph(svg, path);
      renderTooltip(svg, path, tooltip);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapData.edges, svg, path, tooltip]);

  useEffect(() => {
    filterMapData(threshold);
    // console.log('Map data filtered');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[threshold, mapData.edges]);

  // Debug state:
  useEffect(() => {
    console.log('Graph updated');
  },[setGraph]);

  return (
    <div className="relative w-full h-full">
      <svg ref={svgRef} className="w-full h-full"></svg>
      <div ref={tooltipRef} className="absolute"></div>
    </div>
  );
};

export default React.memo(D3Map);
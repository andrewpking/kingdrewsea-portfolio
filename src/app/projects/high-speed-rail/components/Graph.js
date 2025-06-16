// Trainbuilder: Graph.js
class Graph {
  constructor() {
    this.nodes = new Map();
  }

  /** Copy the graph and return a new graph object **/
  /** Ensure that active/inactive edges are preserved **/
  /** Ensure edges are added forwards and backwards */
  copy() {
    const newGraph = new Graph(); 
    
    // Add all cities to the new graph
    for(const node of this.nodes.values()) {
      const clonedCity = structuredClone(node.city);
      newGraph.addCity(clonedCity);
    }

    // Add all edges to the new graph
    for (const node of this.nodes.values()) {
      for (const edge of node.edges.values()) {
        const clonedEdge = structuredClone(edge);
        newGraph.addEdge(clonedEdge.geoid1, clonedEdge.geoid2, clonedEdge);
      }
    }

    // Remove inactive edges from the new graph, use lazy deletion
    for (const node of this.nodes.values()) {
      for (const edge of node.edges.values()) {
        if (!edge.active) {
          const removed = newGraph.removeEdge(edge.geoid1, edge.geoid2);
          if (!removed) {
            console.warn('Failed to remove edge:', edge);
          }
        }
      }
    }
    
    return newGraph;
  }
  
  /* Add cities to the graph, if they haven't already been added */
  addCity(city) {
    if (!this.nodes.has(city.properties.geo_id)) {
      this.nodes.set(city.properties.geo_id, { city, edges: new Set() });
    }
  }
  
  /* Add edges, or mark them as active */
  addEdge(geoid1, geoid2, edgeData) {
    if (!this.nodes.has(geoid1) || !this.nodes.has(geoid2)) {
      throw new Error('Both cities must be added to the graph before adding an edge.');
    }

    const edge1 = this.getEdge(geoid1, geoid2);
    const edge2 = this.getEdge(geoid2, geoid1);

    if (edge1) {
      edge1.active = true;
    } else {
      this.nodes.get(geoid1).edges.add({ target: geoid2, active: true, ...edgeData });
    }

    if (edge2) {
      edge2.active = true;
    } else {
      this.nodes.get(geoid2).edges.add({ target: geoid1, active: true, ...edgeData });
    }
  }

  /** Return a count of active edges connected to a node **/
  countActiveEdges(node) {
    let activeEdgeCount = 0;
    if (!this.nodes.has(node)) {
      console.warn('Node not found:', node);
      return activeEdgeCount;
    }
    for (const edge of this.nodes.get(node).edges) {
      if (edge.active) {
        activeEdgeCount++;
      }
    }
    return activeEdgeCount;
  }

  /** Helper function for getRailLines **/
  dfs(node, visitedNodes, visitedEdges, component) {
    visitedNodes.add(node);
  
    for (const edge of this.nodes.get(node).edges) {
      const edgeKey = `${node}-${edge.target}`;
      const reverseEdgeKey = `${edge.target}-${node}`;
  
      if (edge.active && !visitedEdges.has(edgeKey) && !visitedEdges.has(reverseEdgeKey)) {
          component.set(edge.target, edge); // Use target as key
          visitedEdges.add(edgeKey);
          visitedEdges.add(reverseEdgeKey);
          if (!visitedNodes.has(edge.target)) {
            this.dfs(edge.target, visitedNodes, visitedEdges, component);
          }
      }
    }
  }
  
  /** Get an edge by its src and dest geoids **/
  getEdge(geoid1, geoid2) {
    if (!this.nodes.has(geoid1) || !this.nodes.has(geoid2)) {
      return null;
    }
    const startNode = this.nodes.get(geoid1);
    const edge = Array.from(startNode.edges).find(edge => edge.target === geoid2);
    return edge;
  }
  
  /** Return a set of all edges, including deleted ones **/
  /** Edges with very low estimated ridership are automatically removed **/
  getAllEdges() {
    const edges = new Set();
    for (const node of this.nodes.values()) {
      for (const edge of node.edges) {
        if (edge) {
          edges.add(edge);
        }
      }
    }
    return edges;
  }

  /** Return a set of all edges (except deleted ones) **/
  getAllActiveEdges() {
    const edges = new Set();
    for (const node of this.nodes.values()) {
      for (const edge of node.edges) {
        if (edge.active) {
          edges.add(edge);
        }
      }
    }
    return edges;
  }
  
  /** Get a city by its geoid **/
  getCity(geoid) {
    return this.nodes.get(geoid).city;
  }
  
  /** Return a set of cities mapped to geoid **/
  getAllCities() {
    const cities = new Set();
    for (const node of this.nodes.values()) {
      cities.set(node.city.properties.geo_id, node.city);
    }
    return cities;
  }

  /* Get all city coordinates */
  getAllCityGeom() {
    const cityCoords = new Set();
    for (const node of this.nodes.values()) {
      if (node.edges.size > 0) {
        cityCoords.add(node.city.geometry);
      }
    }
    return Array.from(cityCoords);
  }

  /** Return coordinates of all active cities **/
  getActiveCityGeom() {
    const cityCoords = new Set();
    for (const node of this.nodes.keys()) {
      const city = this.getCity(node);
      if (this.countActiveEdges(node) > 0) {
        cityCoords.add(city.geometry);
      }
    }
    return Array.from(cityCoords);
  }

  /** Return lists of connected edges **/
  getRailLines() {
    const visitedEdges = new Set();
    const visitedNodes = new Set();
    const lines = [];

    for (const node of this.nodes.keys()) {
      if (!visitedNodes.has(node) && this.countActiveEdges(node) > 0) {
        const component = new Map();
        this.dfs(node, visitedNodes, visitedEdges, component);
        lines.push(Array.from(component.values()));
      }
    }
    return lines;
  }

  /** Return a list of total distance for each network of edges **/
  getDistances(railLines) {
    const distances = [];
    for (const line of railLines) {
      let sum = 0;
      for (const edge of line) {
        sum += Math.round(Number(edge.distance));
      }
      distances.push(sum);
    }
    return distances;
  }

  /** Return a list of total ridership for each network of edges **/
  getRiderships(railLines) {
    const riderships = [];
    for (const line of railLines) {
      let sum = 0;
      for (const edge of line) {
        sum += Math.round(Number(edge.coeff) * Math.pow(10, 6));
      }
      riderships.push(sum);
    }
    return riderships;
  }

  /** Perform lazy deletion of edges **/
  removeEdge(geoid1, geoid2) {
    const edge1 = this.getEdge(geoid1, geoid2);
    const edge2 = this.getEdge(geoid2, geoid1);

    if (edge1) {
      edge1.active = false;
    }

    if (edge2) {
      edge2.active = false;
    }

    if (!edge1 || !edge2) {
      return false;
    } else {
      return true;
    }
  }
}
  
export default Graph;
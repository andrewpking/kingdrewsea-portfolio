// Trainbuilder DataUtil.js
import * as d3 from 'd3';
import { feature } from 'topojson-client';
import Graph from './Graph';

const DataUtil = {
    // Data loading function
    async init(setMapData, setGraph) {
        try {
            const [csa, cities, usTopo, edges] = await Promise.all([
            d3.json('/data/small_csa_2023.json'),
            d3.json('/data/major_cities.json'),
            d3.json('/data/states-10m.json'),
            d3.csv('/data/preprocessed_edges.csv')
            ]);

            const mapData = {
                csa: feature(csa, csa.objects),
                cities: feature(cities, cities.objects),
                usTopo: feature(usTopo, usTopo.objects.states),
                edges: edges.map(edge => ({
                    csaid1: edge.csafp1,
                    csaid2: edge.csafp2,
                    geoid1: edge.geoid1,
                    geoid2: edge.geoid2,
                    city1: edge.city1,
                    city2: edge.city,
                    lat1: edge.lat1,
                    long1: edge.long1,
                    lat2: edge.lat2,
                    long2: edge.long2,
                    distance: edge.distance,
                    coeff: edge.est_ridership
                })).filter(edge => edge.coeff >= 0.15)
            };
            setMapData(mapData);

            // Load graph data
            if (!mapData.cities || !mapData.edges) return;
            const newGraph = new Graph();
            mapData.cities.features.forEach(city => {
                newGraph.addCity(city);
            });
            mapData.edges.forEach(edge => {
                newGraph.addEdge(edge.geoid1, edge.geoid2, edge);
            });
            setGraph(newGraph);
            console.log('Map data loaded:', newGraph);
        } catch (error) {
            console.error('Map data loading error:', error);
        }
    }
};

export { DataUtil };
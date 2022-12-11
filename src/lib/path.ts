import { Edge } from '../types/edge';
import { Graph } from '../types/graph';
import { Path } from '../types/subgraph';
import { Vertex } from '../types/vertex';

export const createPath = (graph: Graph, edgeArray: Edge[]): Path => {
  let head = -1;
  let tail = -1;
  const vertices: Set<number> = new Set();
  const edges: Map<number, Edge> = new Map();
  let cyclic = false;

  if (edgeArray.length !== 0) {
    head = edgeArray[0].source.id;
    tail = edgeArray[edgeArray.length - 1].target.id;

    vertices.add(edgeArray[0].source.id);

    edgeArray.forEach((edge) => {
      edges.set(edge.source.id, edge);
      cyclic = vertices.has(edge.target.id);
      vertices.add(edge.target.id);
    });

    edges.set(tail, null);
  }

  return {
    num_edges: () => edges.size,
    num_vertices: () => vertices.size,
    getLength: () => edges.size,
    getGraph: () => graph,
    getVertices: () => vertices,
    hasVertex: (id: number) => vertices.has(id),
    hasEdge: (sourceId: number, targetID: number) =>
      vertices.has(sourceId) && edges.get(sourceId).target.id === targetID,
    getVertex: (id: number) => {
      if (vertices.has(id)) {
        return graph.getVertex(id);
      }

      throw new Error('Vertex does not exist in this path');
    },
    getEdge: (sourceID: number, targetID: number) => {
      if (
        !(vertices.has(sourceID) && edges.get(sourceID).target.id === targetID)
      ) {
        throw new Error("Edge doesn't exist");
      }

      return edges.get(sourceID);
    },
    getEdgeFromSource: (vertex: number) => {
      if (!vertices.has(vertex)) {
        throw new Error("Vertex doesn't exist in path.");
      }

      return edges.get(vertex);
    },
    addVertex: (vertex: Vertex) => {
      if (head === -1 && tail === -1) {
        vertices.add(vertex.id);
      } else if (tail !== -1 && graph.getVertex(tail).hasEdge(vertex.id)) {
        edges.set(tail, graph.getVertex(tail).getEdge(vertex.id));
        cyclic = vertices.has(vertex.id);
        vertices.add(vertex.id);
        edges.set(vertex.id, null);
        tail = vertex.id;
      }

      throw new Error('No edge exists between tail and new Vertex');
    },
    addEdge: (edge: Edge) => {
      if (edge.source.id !== tail) {
        throw new Error('Cannot add edge to tail.');
      }

      edges.set(tail, edge);
      cyclic = vertices.has(edge.target.id);
      tail = edge.target.id;
      vertices.add(tail);
      edges.set(tail, null);
    },
    getHead: () => head,
    getTail: () => tail,
    isCyclic: () => cyclic,
  };
};

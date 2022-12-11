import test from 'ava';

import { createGraph } from './graph';

test('Check no element get', (t) => {
  const graph = createGraph();
  graph.addVertex();
  graph.addVertex();
  graph.addEdge(0, 0);
  t.throws(() => graph.getEdge(0, 1));
});

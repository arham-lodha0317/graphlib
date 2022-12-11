import test from 'ava';

import { createGraph } from '../graph';

import { isAcyclic } from './acyclic';

test('Check acyclic graph', (t) => {
  const g = createGraph();
  g.addVertex();
  g.addVertex();
  g.addVertex();

  g.addEdge(0, 1);
  g.addEdge(1, 2);

  t.is(isAcyclic(g).result, true);
});

test('Check cyclic sparse graph', (t) => {
  const g = createGraph();
  g.addVertex();
  g.addVertex();
  g.addVertex();

  g.addEdge(0, 1);
  g.addEdge(1, 2);
  g.addEdge(2, 0);

  t.is(isAcyclic(g).result, false);
});

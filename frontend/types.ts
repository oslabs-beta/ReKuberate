export class Node {
  id: string;
  node_data?: unknown;
  location?: unknown;
  normal?: { fill: string; [k: string]: string };
  hovered?: { fill: string; [k: string]: string };
  selected?: { fill: string; [k: string]: string };
}

export class edge {
  from: string;
  to: string;
}

export class MockData {
  nodes: Node[];
  edges: edge[];
}
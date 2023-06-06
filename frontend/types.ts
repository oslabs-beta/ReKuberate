export interface Node {
  id: string;
  name?: any;
  nodeName?: any;
  status?: any;
  purpose?: any;
  normal?: { fill: string; [k: string]: string };
  hovered?: { fill: string; [k: string]: string };
  selected?: { fill: string; [k: string]: string };
}

export interface edge {
  from: string;
  to: string;
}

export interface MockData {
  nodes: Node[];
  edges: edge[];
}

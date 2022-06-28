export interface Welcome {
  head: Head;
  results: Results;
}

export interface Head {
  link: any[];
  vars: string[];
}

export interface Results {
  distinct: boolean;
  ordered: boolean;
  bindings: Binding[];
}

export interface Binding {
  player: Player;
}

export interface Player {
  type: Type;
  value: string;
}

export enum Type {
  URI = "uri",
}

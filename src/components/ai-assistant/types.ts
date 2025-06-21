
export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

export interface Position {
  x: number;
  y: number;
}

export interface AIModel {
  value: string;
  label: string;
}

export interface IGameResult {
  id: number;
  score: number;
  game_name: string;
}

export type ISaveGameResult = Omit<IGameResult, "id">;

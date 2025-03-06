import { map } from "nanostores"

export type Game = {
  playerType: string,
  hints: string[],
  word: string | null
}

export const $game = map<Game>({word: null, hints: [], playerType: ""})

import { atom } from "nanostores"

export type Player = {
  name: string
  uuid: string
}

export const $player = atom<Player | null>(null)

export const setPlayer = (player: Player) => {
  $player.set(player)
}


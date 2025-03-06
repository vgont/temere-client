import { useStore } from "@nanostores/react"
import { $room } from "../stores/room"
import { useEffect } from "react"
import Guesser from "./Guesser"
import Helper from "./Helper"
import { $game } from "../stores/game"

export default function Game() {
  const game = useStore($game)
  const room = useStore($room)

  useEffect(() => {
    if (room) {
      room.onopen = () => {
        room.send("get_state")
        room.onmessage = (event) => {
          const parsed = JSON.parse(event.data)
          
          if (parsed.message) console.log(parsed.message)

          if (parsed.state) {
            const { player_type: playerType, ...state } = parsed.state
            $game.set({playerType, ...state})
          }
        }
      }
    }
  }, [room])

  return (
    <div>
      {room && game && game.playerType === "helper" && <Helper room={room} />}
      {room && game && game.playerType === "guesser" && <Guesser room={room} />}
    </div>
  )
}

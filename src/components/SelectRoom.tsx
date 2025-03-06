import { $player } from "../stores/player"
import { useStore } from "@nanostores/react"
import { useState } from "react"
import { $room } from "../stores/room"

export default function SelectRoom() {
  const player = useStore($player)
  const [roomName, setRoomName] = useState("")

  const handleCreateRoom = async () => {
    const ws = new WebSocket(`ws://localhost:4000/room/new?room_name=${roomName}&player=${player?.uuid}`)
    $room.set(ws)
  }

  const handleJoinRoom = async () => {
    const ws = new WebSocket(`ws://localhost:4000/room/join?room_name=${roomName}&player=${player?.uuid}`)
    $room.set(ws)
  }

  return (
    <>
      <label className="text-xl">Room</label>
      <input
        type="text"
        onChange={(e) => setRoomName(e.target.value)}
        placeholder="Room name"
        className="rounded bg-gray-400 text-black text-lg px-4 py-2"
      />
      <div className="flex gap-4">
        <button className="rounded bg-gray-600 text-white px-4 py-2 w-full hover:bg-gray-700" onClick={handleCreateRoom}>Create a room</button>
        <button className="rounded bg-gray-600 text-white px-4 py-2 w-full hover:bg-gray-700" onClick={handleJoinRoom}>Join a room</button>
      </div>
    </>
  )
}


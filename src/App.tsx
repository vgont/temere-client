import { useStore } from '@nanostores/react'
import NicknameForm from './components/NicknameForm'
import './index.css'
import { $player } from './stores/player'
import SelectRoom from './components/SelectRoom'
import { $room } from './stores/room'
import Game from './components/Game'
function App() {
  const player = useStore($player) 
  const room = useStore($room)

  return (
    <div className="flex flex-col bg-gray-800 w-96 p-6 rounded-lg shadow-md text-white gap-4">
      {!room?
        ( !player ? <NicknameForm /> : <SelectRoom /> )
        :
        <Game />
      }
    </div>
  )
}

export default App

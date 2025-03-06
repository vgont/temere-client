import { useEffect, useState } from "react"
import { $game } from "../stores/game"
import { useStore } from "@nanostores/react"
import Form from "./Form"

export default function Helper({ room }: { room: WebSocket }) {
  const [word, setWord] = useState("")
  const [hint, setHint] = useState("")
  const [hints, setHints] = useState<string[]>([])
  const [disabled, setDisabled] = useState(false)

  const game = useStore($game)

  useEffect(() => {
    console.log(hints)
    if (game.hints.length === 5) {
      setDisabled(true)
    }
  }, [hints])

  const handleWordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    $game.set({ ...game, word })
    room.send(`set_word:${word}`)
  }

  const handleHintSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (game.hints.length < 5 && hint !== "" && hint != game.word && hints.includes(hint) === false) {
      setHints([...hints, hint])
      game.hints.push(hint)
      room.send(`add_hint:${hint}`)
    } 
    setHint("")
  }

  return( 
    <>
      <h1 className="text-3xl font-bold mb-4">Helper</h1>
      {!game.word?
        <Form 
          handleSubmit={handleWordSubmit}
          labelText="Set a word"
          buttonText="Set"
          inputPlaceholder="word"
          inputValue={word}
          inputHandler={setWord}
        />
        :
        <div className="flex flex-col gap-2">
          <Form
            handleSubmit={handleHintSubmit}
            labelText="Add a hint"
            buttonText="Add"
            inputPlaceholder="hint"
            inputValue={hint}
            disabled={disabled}
            inputHandler={setHint}
          />
          <h2 className="text-lg font-bold mt-2">Hints</h2>
          <div className="flex gap-4 w-full h-full flex-wrap">
            {hints.map(hint => 
              <p 
                className="text-lg text-black bg-gray-300 rounded px-2"
                key={hint}
              >
                {hint}
              </p>
            )}
          </div>
        </div>
      }
    </>
  )
}

import { useEffect, useState } from "react"

import Form from "./Form"

export default function Guesser({ room }: { room: WebSocket }) {
  const [guess, setGuess] = useState<string>("")
  const [isWordSet, setIsWordSet] = useState(false)
  const [hints, setHints] = useState<string[]>([])

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const parsed = JSON.parse(event.data)

      if (parsed.message) {
        console.log(parsed.message)
        if (parsed.message === "word set") {
          setIsWordSet(true)
        }
      }
      if (parsed.hints) {
        const hints = parsed.hints
        setHints(hints)
      }
    }

    room.onmessage = handleMessage
  }, [room])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    room.send(`try_guess:${guess}`)
  }

  return (
    <>
      <h1 className="text-2xl pb-4">Guesser</h1>
      {!isWordSet ?
        <p>Word not set</p>
        :
        <>
          <Form
            handleSubmit={handleSubmit}
            labelText="Guess"
            buttonText="Try"
            inputPlaceholder="Guess"
            inputValue={guess}
            inputHandler={setGuess}
          />
          {hints.length > 0 &&
            <div>
              <h2 className="text-lg font-bold my-2">Hints</h2>
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
      }
    </>
  )
}

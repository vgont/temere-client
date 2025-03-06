import { useState } from "react"
import { setPlayer, type Player } from "../stores/player"
import axios from "axios"
import Form from "./Form"

export default function NicknameForm() {
  const [nickname, setNickname] = useState("")
  const server = "http://localhost:4000"

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { data: player } = await axios.get<Player>(`${server}/player/new/${nickname}`)
    console.log(player)
    setPlayer(player)
  }

  return (
    <>
      <h1 className="text-xl font-bold">Choose a nickname</h1>
      <Form
        handleSubmit={handleSubmit}
        labelText="Nickname"
        buttonText="Start"
        inputPlaceholder="foobar14"
        inputValue={nickname}
        inputHandler={setNickname}
      />
    </>
  )
}



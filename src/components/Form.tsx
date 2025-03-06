type Props = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
  labelText: string,
  buttonText: string,
  inputPlaceholder: string,
  disabled?: boolean,
  inputValue: string,
  inputHandler: (text: string) => void
}

export default function Form({handleSubmit, labelText, buttonText, inputPlaceholder, disabled, inputValue, inputHandler}: Props) {
  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex flex-col gap-2"
    >
      <label className="text-lg">{labelText}</label>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder={inputPlaceholder}
          value={inputValue}
          disabled={disabled}
          onChange={(e) => inputHandler(e.target.value)}
          className = {`rounded bg-gray-400 text-black text-lg px-4 py-2 ${disabled && "opacity-50"}`}
        />
        <button 
          type="submit"
          disabled={disabled}
          className={`rounded bg-gray-600 text-white px-4 py-2 w-full hover:bg-gray-700 ${disabled && "opacity-50"}`}
        >
          {buttonText}
        </button>
      </div>
    </form>

  )
}

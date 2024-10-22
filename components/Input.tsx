const Input = ({ type, placeholder, id, value, name, event }: InputProps) => {
    return (
        <div className="flex flex-col gap-1 w-full">
            <label className="text-lg" htmlFor={id}>{name}</label>
            <input
                className="border-2 border-black p-2 rounded-md"
                id={id}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={event}
            />
        </div>
    )
}

export default Input
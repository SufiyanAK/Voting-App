interface InputProps {
    name: string,
    type: string,
    placeholder: string,
    value: string,
    id: string,
    event: (event: React.ChangeEvent<HTMLInputElement>) => void,
}
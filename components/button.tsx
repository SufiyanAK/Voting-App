export const Button = ({ classname = '', text }: {
    classname: string
    text: string,
}) => {
    return (
        <button className={classname}>{text}</button>
    )
}
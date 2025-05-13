"use client"

export const Button = ({ classname = '', text, OnClick }: {
    classname: string
    text: string,
    OnClick: () => void;
}) => {
    return (
        <button className={classname} onClick={OnClick}>{text}</button>
    )
}
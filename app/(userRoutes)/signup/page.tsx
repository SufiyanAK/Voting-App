'use client'

import Input from "@/components/Input"
import Loader from "@/components/Loader"
import Link from "next/link"
import { useEffect, useState } from "react"

interface InitialUserState {
    name: string
    email: string,
    address: string
}

const InitialState: InitialUserState = {
    name: '',
    email: '',
    address: ''
}

const Signup = () => {
    const [user, setUser] = useState(InitialState)
    const [loading, setLoading] = useState(true)
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(true)

    const isValidate = () => {
        return user.name.trim() && user.email.trim() && user.address.trim()
    }

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000)
    }, [])

    return (
        <div className="h-full flex justify-center items-center bg-opacity-90 bg-prime-clr">
            {
                loading ? <Loader /> :
                    <div className="w-[28rem] p-8 rounded-md bg-white flex flex-col gap-4 items-center">
                        <h2 className="text-center text-4xl">Register Voter</h2>
                        <form
                            // onSubmit={onLogin} 
                            className="space-y-2 flex flex-col items-center w-full">
                            <Input
                                name="Name"
                                value={user.name}
                                type="text"
                                placeholder="Enter your Name..."
                                id="name"
                                event={(e) => { setUser({ ...user, name: e.target.value }) }}
                            />
                            <Input
                                name="Email"
                                value={user.email}
                                type="email"
                                placeholder="Enter your email..."
                                id="email"
                                event={(e) => { setUser({ ...user, email: e.target.value }) }}
                            />
                            <Input
                                name="Voter's Address"
                                value={user.address}
                                type="text"
                                placeholder="Enter Public Address..."
                                id="address"
                                event={(e) => { setUser({ ...user, address: e.target.value }) }}
                            />
                            <div>
                                <button
                                    disabled={buttonDisabled}
                                    className={`bg-prime-clr px-4 py-1 mt-2 text-lg text-white rounded-md`} type="submit"
                                >
                                    Register
                                </button>
                            </div>
                        </form>
                        <Link className="text-prime-clr hover:text-blue-800 hover:underline text-lg" href='/login'>Login</Link>
                    </div>
            }
        </div>
    )
}

export default Signup
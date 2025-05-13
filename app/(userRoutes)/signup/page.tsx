// 'use client'

// import Input from "@/components/Input"
// import Loader from "@/components/Loader"
// import Link from "next/link"
// import { useEffect, useState } from "react"

// interface InitialUserState {
//     name: string
//     email: string,
//     address: string
// }

// const InitialState: InitialUserState = {
//     name: '',
//     email: '',
//     address: ''
// }

// const Signup = () => {
//     const [user, setUser] = useState(InitialState)
//     const [loading, setLoading] = useState(true)
//     const [buttonDisabled, setButtonDisabled] = useState<boolean>(true)

//     const isValidate = () => {
//         return user.name.trim() && user.email.trim() && user.address.trim()
//     }

//     useEffect(() => {
//         setTimeout(() => {
//             setLoading(false);
//         }, 1000)
//     }, [])

//     return (
//         <div className="h-full flex justify-center items-center bg-opacity-90 bg-prime-clr">
//             {
//                 loading ? <Loader /> :
//                     <div className="w-[28rem] p-8 rounded-md bg-white flex flex-col gap-4 items-center">
//                         <h2 className="text-center text-4xl">Register Voter</h2>
//                         <form
//                             // onSubmit={onLogin} 
//                             className="space-y-2 flex flex-col items-center w-full">
//                             <Input
//                                 name="Name"
//                                 value={user.name}
//                                 type="text"
//                                 placeholder="Enter your Name..."
//                                 id="name"
//                                 event={(e) => { setUser({ ...user, name: e.target.value }) }}
//                             />
//                             <Input
//                                 name="Email"
//                                 value={user.email}
//                                 type="email"
//                                 placeholder="Enter your email..."
//                                 id="email"
//                                 event={(e) => { setUser({ ...user, email: e.target.value }) }}
//                             />
//                             <Input
//                                 name="Voter's Address"
//                                 value={user.address}
//                                 type="text"
//                                 placeholder="Enter Public Address..."
//                                 id="address"
//                                 event={(e) => { setUser({ ...user, address: e.target.value }) }}
//                             />
//                             <div>
//                                 <button
//                                     disabled={buttonDisabled}
//                                     className={`bg-prime-clr px-4 py-1 mt-2 text-lg text-white rounded-md`} type="submit"
//                                 >
//                                     Register
//                                 </button>
//                             </div>
//                         </form>
//                         <Link className="text-prime-clr hover:text-blue-800 hover:underline text-lg" href='/login'>Login</Link>
//                     </div>
//             }
//         </div>
//     )
// }

// export default Signup



// modified by gpt
'use client';
import { useRouter } from "next/navigation";
import Input from "@/components/Input";
import Loader from "@/components/Loader";
import Link from "next/link";
import { useEffect, useState } from "react";
import Web3 from "web3";

interface InitialUserState {
    name: string;
    email: string;
    address: string;
}

const InitialState: InitialUserState = {
    name: '',
    email: '',
    address: ''
};

const Signup = () => {
    const [user, setUser] = useState(InitialState);
    const [loading, setLoading] = useState(true);
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
    const [walletConnected, setWalletConnected] = useState(false);
    const router = useRouter();

    const isValidate = () => {
        return user.name.trim() && user.email.trim() && walletConnected;
    };

    const handleConnectWallet = async () => {
        if (!window.ethereum) {
            alert("Please install Metamask to connect your wallet.");
            return;
        }

        try {
            const web3 = new Web3(window.ethereum);
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            const userAddress = accounts[0];

            setUser((prev) => ({ ...prev, address: userAddress }));
            setWalletConnected(true);
        } catch (error) {
            console.error("Error connecting wallet:", error);
            alert("Failed to connect wallet. Please try again.");
        }
    };

    const onSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!walletConnected) {
            alert("Please connect your wallet before submitting the form.");
            return;
        }

        if (!isValidate()) {
            alert("Please fill out all required fields.");
            return;
        }

        // Prepare the form data to send
        const formData = {
            name: user.name,
            email: user.email,
            voterAddress: user.address
        };

        try {
            const response = await fetch("http://localhost:8080/api/register-form", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Registration successful!");
                router.push("/"); // Redirect to admin home
                // Optionally, you can redirect the user to another page after successful registration
            } else {
                alert(`Registration failed: ${data.message || "Unknown error"}`);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("There was an error while submitting the form. Please try again.");

        }
    };

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <div className="h-full flex justify-center items-center bg-opacity-90 bg-prime-clr">
            {loading ? (
                <Loader />
            ) : (
                <div className="w-[28rem] p-8 rounded-md bg-white flex flex-col gap-4 items-center">
                    <h2 className="text-center text-4xl">Register Voter</h2>
                    <form onSubmit={onSignup} className="space-y-2 flex flex-col items-center w-full">
                        <Input
                            name="Name"
                            value={user.name}
                            type="text"
                            placeholder="Enter your Name..."
                            id="name"
                            event={(e) => { setUser({ ...user, name: e.target.value }); }}
                        />
                        <Input
                            name="Email"
                            value={user.email}
                            type="email"
                            placeholder="Enter your email..."
                            id="email"
                            event={(e) => { setUser({ ...user, email: e.target.value }); }}
                        />
                        <Input
                            name="Voter's Address"
                            value={user.address}
                            type="text"
                            placeholder="Wallet Address"
                            id="address"
                            event={() => { }}
                            readOnly
                        />
                        {!walletConnected && (
                            <button
                                onClick={handleConnectWallet}
                                type="button"
                                className="bg-blue-600 px-4 py-1 mt-2 text-lg text-white rounded-md"
                            >
                                Add Wallet Address
                            </button>
                        )}
                        <div>
                            <button
                                disabled={!isValidate()}
                                className={`${isValidate() ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'
                                    } px-4 py-1 mt-2 text-lg text-white rounded-md`}
                                type="submit"
                            >
                                Register
                            </button>

                            {/* <button
                                disabled={!isValidate()}
                                className={`bg-prime-clr px-4 py-1 mt-2 text-lg text-white rounded-md`}
                                type="submit"
                            >
                                Register
                            </button> */}
                        </div>
                    </form>
                    {/* <Link className="text-prime-clr hover:text-blue-800 hover:underline text-lg" href="/login">
                        Login
                    </Link> */}
                </div>
            )}
        </div>
    );
};

export default Signup;

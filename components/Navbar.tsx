// components/Navbar.tsx
"use client";

import RootLayout from "@/app/layout";
import { checkWalletConnection, connectWallet, disconnectWallet, isAdmin } from "@/utils/walletHelpers";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Navbar = () => {
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [isLoadingAdmin, setIsLoadingAdmin] = useState(false);

    const router = useRouter();

    const handleAdminLogin = async () => {
        setIsLoadingAdmin(true);
        try {
            const isAdminUser = await isAdmin();
            if (isAdminUser) {
                router.push("/admin-home"); // Redirect to admin home
            } else {
                alert("You are not an admin.");
            }
        } catch (error) {
            alert("Error checking admin status. Please try again.");
        } finally {
            setIsLoadingAdmin(false);
        }
    };

    // Check wallet connection on component load
    useEffect(() => {
        checkWalletConnection().then((address) => {
            if (address) {
                setWalletAddress(address);
            }
        });
    }, []);

    // Handle connect wallet
    const handleConnectWallet = async () => {
        const address = await connectWallet();
        if (address) {
            setWalletAddress(address);
        }
    };

    // Handle disconnect wallet
    const handleDisconnectWallet = () => {
        disconnectWallet();
        router.push('/')
        setWalletAddress(null);
    };

    return (
        <>
            <nav className="flex justify-between items-center px-6 py-4 bg-gray-800 text-white">
                {/* Application Name */}
                <Link href="/" className="text-xl font-bold">Secure Vote</Link>

                {/* Right side: Connect/Logout buttons */}
                <div>
                    {!walletAddress ? (
                        <button
                            onClick={handleConnectWallet}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                        >
                            Connect Wallet
                        </button>
                    ) : (
                        <div className="flex items-center space-x-4">
                            <span className="text-sm">
                                Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                            </span>
                            <button
                                onClick={handleDisconnectWallet}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
                            >
                                Logout
                            </button>
                            {/* <button
                                onClick={handleAdminLogin}
                                className={`px-4 py-2 ${isLoadingAdmin ? "bg-gray-600" : "bg-green-600 hover:bg-green-700"
                                    } text-white rounded`}
                                disabled={isLoadingAdmin}
                            >
                                {isLoadingAdmin ? "Checking..." : "Login as Admin"}
                            </button> */}
                        </div>
                    )}
                </div>
            </nav>
            {/* <div className="flex gap-2 justify-evenly bg-white">
                <Link href="/admin-home" className="text-black hover:bg-black hover:text-white duration-500 px-2 py-2 border-2 border-transparent hover:shadow-[0_0_10px_2px_rgba(255,255,255,0.8)] hover:shadow-white">admin-home</Link>
                <Link href="/candidates-info" className="text-black hover:bg-black hover:text-white duration-500 px-2 py-2 border-2 border-transparent hover:shadow-[0_0_10px_2px_rgba(255,255,255,0.8)] hover:shadow-white">candidates-info</Link>
                <Link href="/create-election" className="text-black hover:bg-black hover:text-white duration-500 px-2 py-2 border-2 border-transparent hover:shadow-[0_0_10px_2px_rgba(255,255,255,0.8)] hover:shadow-white">create-election</Link>
                <Link href="/result" className="text-black hover:bg-black hover:text-white duration-500 px-2 py-2 border-2 border-transparent hover:shadow-[0_0_10px_2px_rgba(255,255,255,0.8)] hover:shadow-white">result</Link>
                <Link href="/voters-info" className="text-black hover:bg-black hover:text-white duration-500 px-2 py-2 border-2 border-transparent hover:shadow-[0_0_10px_2px_rgba(255,255,255,0.8)] hover:shadow-white">voters-info</Link>
                <Link href="/login" className="text-black hover:bg-black hover:text-white duration-500 px-2 py-2 border-2 border-transparent hover:shadow-[0_0_10px_2px_rgba(255,255,255,0.8)] hover:shadow-white">login</Link>
                <Link href="/votes" className="text-black hover:bg-black hover:text-white duration-500 px-2 py-2 border-2 border-transparent hover:shadow-[0_0_10px_2px_rgba(255,255,255,0.8)] hover:shadow-white">votes</Link>
                <Link href="/signup" className="text-black hover:bg-black hover:text-white duration-500 px-2 py-2 border-2 border-transparent hover:shadow-[0_0_10px_2px_rgba(255,255,255,0.8)] hover:shadow-white">signup</Link>
                <Link href="/registration" className="text-black hover:bg-black hover:text-white duration-500 px-2 py-2 border-2 border-transparent hover:shadow-[0_0_10px_2px_rgba(255,255,255,0.8)] hover:shadow-white">regtr ctrl</Link> */}

            {/* <Link href="/votes" className="text-black hover:bg-black hover:text-white duration-500 px-2 py-2 border-2 border-transparent hover:shadow-[0_0_10px_2px_rgba(255,255,255,0.8)] hover:shadow-white">votes</Link> */}

            {/* </div> */}
        </>
    );
};

export default Navbar;

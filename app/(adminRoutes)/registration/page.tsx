'use client'

import Web3 from "web3";
import { getContractInstance } from "@/utils/web3Utils";
import React, { useState } from "react";

const Registration = () => {
    const [isProcessing, setIsProcessing] = useState(false);

    // Function to open voter registration
    // const handleOpenRegistration = async () => {
    //     setIsProcessing(true);
    //     try {
    //         if (!window.ethereum) {
    //             alert("Metamask is not installed. Please install it to proceed.");
    //             return;
    //         }

    //         // Use Metamask as the provider for transactions
    //         const web3WithMetamask = new Web3(window.ethereum);
    //         const contract = getContractInstance(); // Fetch instance from utils

    //         // Override the provider for transaction signing
    //         contract.setProvider(web3WithMetamask.currentProvider);
    //         console.log(contract.setProvider(web3WithMetamask.currentProvider))

    //         const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    //         const userAddress = accounts[0];

    //         await contract.methods.openRegistration().send({ from: userAddress, gas: "300000" });
    //         alert("Voter registration opened successfully!");
    //     } catch (error: any) {
    //         console.log(error)
    //         if (error?.cause?.message) {
    //             var revertMessage = error.cause.message.split("revert ")[1];
    //         }
    //         alert(`Error opening registration: ${revertMessage}`);
    //     } finally {
    //         setIsProcessing(false);
    //     }
    // };
    // const handleOpenRegistration = async () => {
    //     try {
    //         if (!window.ethereum) {
    //             alert("Metamask is not installed. Please install it to proceed.");
    //             return;
    //         }

    //         const web3WithMetamask = new Web3(window.ethereum);
    //         const contract = getContractInstance();
    //         contract.setProvider(web3WithMetamask.currentProvider);

    //         const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    //         const userAddress = accounts[0];

            
    //         try {
    //             await contract.methods.openRegistration().call({ from: userAddress });
    //         } catch (error: any) {
    //             console.log('callll wlaa error : ', error)
    //             const revertMessage = error?.data?.message || error?.message || "Unknown error";
    //             alert(`Transaction will revert with error: ${error}`)
    //             return;
    //         } 
    //         const tx = await contract.methods.openRegistration().send({
    //             from: userAddress,
    //             gas: '500000',
    //         });
    //         console.log('transaction =', tx)
    //         alert("Voter registration opened successfully!");
    //     } catch (error: any) {
    //         // Handle specific revert messages
    //         console.log(error)
    //         console.log('full error =', error?.cause?.errorArgs?.message)
    //         // const revertMessage = error?.data?.message || error?.message;
    //         // if (revertMessage) {
    //         alert(`Error occurred: ${error?.cause?.errorArgs?.message}`);
    //         // } else {
    //         alert("Transaction failed. Check the console for more details.");
    //         // console.error(error);
    //         // }
    //     }
    // };

    const handleOpenRegistration = async () => {
        try {
            if (!window.ethereum) {
                alert("Metamask is not installed. Please install it to proceed.");
                return;
            }

            const web3WithMetamask = new Web3(window.ethereum);
            const contract = getContractInstance();
            contract.setProvider(web3WithMetamask.currentProvider);

            // Get accounts from Metamask
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            const userAddress = accounts[0];

            // Send transaction
            const tx = contract.methods.openRegistration();
            const gas = await tx.estimateGas({ from: userAddress });

            const txHash = await tx.send({ from: userAddress, gas: gas.toString() });

            // Transaction is successfully sent, now get the receipt
            // const receipt = await web3WithMetamask.eth.getTransactionReceipt(txHash.transactionHash);

            // // Check if the transaction was successful or reverted
            // if (receipt.status === 0n) {
            //     // Handle reverted transaction
            //     const errorMessage = "Transaction failed. Please check the contract's require statements.";
            //     alert(errorMessage); // You can replace this with custom error handling
            //     console.error("Transaction reverted:", receipt);
            // } else {
            //     alert("Voter registration opened successfully!");
            // }
        } catch (error: any) {
            // Catch and log any errors during the process
            const match = error.message.match(/reverted: (.*)/);

            if (match) {
                console.log(match[1]);  // This will print "Registration already open."
            }
            console.log('i was ------>',error)
            if (error.message) {
                alert(`Error: ${match[1]}`);
            } else {
                alert("An unexpected error occurred.");
                console.error(error);
            }
        }
    };


    // Function to close voter registration
    const handleCloseRegistration = async () => {
        setIsProcessing(true);
        try {
            if (!window.ethereum) {
                alert("Metamask is not installed. Please install it to proceed.");
                return;
            }

            // Use Metamask as the provider for transactions
            const web3WithMetamask = new Web3(window.ethereum);
            const contract = getContractInstance(); // Fetch instance from utils

            // Override the provider for transaction signing
            contract.setProvider(web3WithMetamask.currentProvider);

            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            const userAddress = accounts[0];

            await contract.methods.closeRegistration().send({ from: userAddress, gas: "300000" });
            alert("Voter registration closed successfully!");
        } catch (error: any) {
            console.log(' error ', error)
            console.log('error message, ', error.message)
            if (error?.cause?.message) {
                var revertMessage = error.cause.message.split("revert ")[1];
            }
            alert(`Error opening registration: ${revertMessage}`);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="border-2 border-white w-[90%] h-[90%] rounded-md text-white p-4 space-y-8">
            <h1 className="text-xl font-bold text-center">Voter Registration Controls</h1>

            <div className="flex flex-col space-y-4 items-center">
                {/* Open Registration Button */}
                <button
                    onClick={handleOpenRegistration}
                    disabled={isProcessing}
                    className={`w-64 px-4 py-2 rounded ${isProcessing
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                        } text-white text-lg`}
                >
                    {isProcessing ? "Processing..." : "Open Registration"}
                </button>

                {/* Close Registration Button */}
                <button
                    onClick={handleCloseRegistration}
                    disabled={isProcessing}
                    className={`w-64 px-4 py-2 rounded ${isProcessing
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-red-600 hover:bg-red-700"
                        } text-white text-lg`}
                >
                    {isProcessing ? "Processing..." : "Close Registration"}
                </button>
            </div>
        </div>
    );
};

export default Registration;

// 'use client'

// import React, { useState } from 'react'

// const CreateElection = () => {
//     const [election, setElection] = useState({
//         name: "",
//         description: ""
//     });

//     const [isButtonDisabled, setIsButtonDisabled] = useState(true);

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         const { name, value } = e.target;
//         setElection((prev) => ({
//             ...prev,
//             [name]: value,
//         }));

//         // Enable button only if all fields are filled
//         setIsButtonDisabled(!(value.trim() && (name === "description" ? election.name : election.description)));
//     };

//     const handleStartElection = (e: React.FormEvent) => {
//         e.preventDefault();
//         // Add logic for starting the election
//         alert(`Election Started!\nName: ${election.name}\nDescription: ${election.description}`);
//     };
//     return (
//         <div className='border-2 border-white w-[90%] h-[90%] rounded-md text-center text-white p-4 space-y-8 flex flex-col items-center justify-center gap-4'>
//             <h2 className='text-5xl font-bold leading-normal'>Empowering Voices,<br />Shaping Futures</h2>

//             <div className="bg-white p-8 rounded-md shadow-lg w-[28rem]">
//                 <h1 className="text-2xl font-bold mb-4 text-center">Start New Election</h1>
//                 <form onSubmit={handleStartElection} className="flex flex-col space-y-4">
//                     {/* Election Name */}
//                     <div>
//                         <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//                             Election Name
//                         </label>
//                         <input
//                             type="text"
//                             id="name"
//                             name="name"
//                             value={election.name}
//                             onChange={handleInputChange}
//                             className="w-full border border-gray-300 rounded-md p-2"
//                             placeholder="Enter election name..."
//                         />
//                     </div>

//                     {/* Election Description */}
//                     <div>
//                         <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
//                             Election Description
//                         </label>
//                         <textarea
//                             id="description"
//                             name="description"
//                             value={election.description}
//                             onChange={handleInputChange}
//                             className="w-full border border-gray-300 rounded-md p-2"
//                             placeholder="Enter election description..."
//                             rows={4}
//                         />
//                     </div>

//                     {/* Start Election Button */}
//                     <button
//                         type="submit"
//                         disabled={isButtonDisabled}
//                         className={`w-full text-white px-4 py-2 rounded-md ${isButtonDisabled
//                                 ? "bg-gray-400 cursor-not-allowed"
//                                 : "bg-blue-600 hover:bg-blue-700"
//                             }`}
//                     >
//                         Start Election
//                     </button>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default CreateElection

'use client';

import { checkWalletConnection } from '@/utils/walletHelpers';
import { getContractInstance } from '@/utils/web3Utils';
import { useState, useEffect } from 'react';

const ElectionForm = () => {
    const [election, setElection] = useState({
        name: '',
        description: '',
        startDate: '',
        endDate: ''
    });
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [account, setAccount] = useState<string | null>(null);

    useEffect(() => {
        // Check if the wallet is connected on component mount
        const getConnectedWallet = async () => {
            const walletAddress = await checkWalletConnection();
            setAccount(walletAddress);
        };

        getConnectedWallet();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setElection((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Enable button only if all fields are filled
        setIsButtonDisabled(!(
            election.name.trim() &&
            election.description.trim() &&
            election.startDate.trim() &&
            election.endDate.trim()
        ));
    };

    const handleConnectWallet = async () => {
        const walletAddress = await checkWalletConnection();
        setAccount(walletAddress);
    };

    const handleStartElection = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!account) {
            alert('Please connect your wallet first!');
            return;
        }

        try {
            const contract = getContractInstance();
            const startDateUnix = Math.floor(new Date(election.startDate).getTime() / 1000);
            const endDateUnix = Math.floor(new Date(election.endDate).getTime() / 1000);

            await contract.methods
                .startElection(election.name, election.description, startDateUnix, endDateUnix)
                .send({ from: account });

            alert('Election started successfully!');
        } catch (err: any) {
            alert('Error starting election: ' + err.message);
        }
    };

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="bg-white p-8 rounded-md shadow-lg w-[28rem]">
                <h1 className="text-2xl font-bold mb-4 text-center">Start New Election</h1>
                <form onSubmit={handleStartElection} className="flex flex-col space-y-4">
                    {/* Election Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Election Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={election.name}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-md p-2"
                            placeholder="Enter election name..."
                        />
                    </div>

                    {/* Election Description */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                            Election Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={election.description}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-md p-2"
                            placeholder="Enter election description..."
                            rows={4}
                        />
                    </div>

                    {/* Election Start Date */}
                    <div>
                        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                            Start Date
                        </label>
                        <input
                            type="datetime-local"
                            id="startDate"
                            name="startDate"
                            value={election.startDate}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>

                    {/* Election End Date */}
                    <div>
                        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                            End Date
                        </label>
                        <input
                            type="datetime-local"
                            id="endDate"
                            name="endDate"
                            value={election.endDate}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>

                    {/* Start Election Button */}
                    <button
                        type="submit"
                        disabled={isButtonDisabled}
                        className={`w-full text-white px-4 py-2 rounded-md ${isButtonDisabled
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                    >
                        Start Election
                    </button>
                </form>

                {/* Connect Wallet Button */}
                {!account && (
                    <div className="mt-4">
                        <button
                            onClick={handleConnectWallet}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md w-full"
                        >
                            Connect Wallet
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ElectionForm;

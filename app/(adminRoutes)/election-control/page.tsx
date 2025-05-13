'use client';

import { checkWalletConnection } from '@/utils/walletHelpers';
import { getContractInstance } from '@/utils/web3Utils';
import { useState } from 'react';
import Web3 from 'web3';

const ControlElectionPage = () => {
    const [account, setAccount] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleConnectWallet = async () => {
        const walletAddress = await checkWalletConnection();
        setAccount(walletAddress);
    };

    const handleElectionAction = async (action: 'start' | 'stop' | 'end') => {
        if (!account) {
            alert('Please connect your wallet first!');
            return;
        }

        setIsLoading(true);
        try {
            const contract = getContractInstance();
            let tx;

            // Call respective contract function based on action
            switch (action) {
                case 'start':
                    {
                        if (!window.ethereum) {
                            alert("Metamask is not installed. Please install it to proceed.");
                            return;
                        }
                        const web3WithMetamask = new Web3(window.ethereum);
                        const contract = getContractInstance(); // Fetch instance from utils

                        // Override the provider for transaction signing
                        contract.setProvider(web3WithMetamask.currentProvider);

                        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
                        const userAddress = accounts[0];

                        // await contract.methods.closeRegistration().send({ from:  });
                        tx = await contract.methods.startElection().send({ from: userAddress, gas: "300000" });
                        alert('Election started successfully!');
                    }
                    break;
                case 'stop':
                    {
                        if (!window.ethereum) {
                            alert("Metamask is not installed. Please install it to proceed.");
                            return;
                        }
                        const web3WithMetamask = new Web3(window.ethereum);
                        const contract = getContractInstance(); // Fetch instance from utils

                        // Override the provider for transaction signing
                        contract.setProvider(web3WithMetamask.currentProvider);

                        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
                        const userAddress = accounts[0];

                        tx = await contract.methods.stopElection().send({ from: account });
                        alert('Election stopped successfully!');
                    }
                    break;
                case 'end':
                    {
                        if (!window.ethereum) {
                            alert("Metamask is not installed. Please install it to proceed.");
                            return;
                        }
                        const web3WithMetamask = new Web3(window.ethereum);
                        const contract = getContractInstance(); // Fetch instance from utils

                        // Override the provider for transaction signing
                        contract.setProvider(web3WithMetamask.currentProvider);

                        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
                        const userAddress = accounts[0];

                        tx = await contract.methods.endElection().send({ from: account });
                        alert('Election ended successfully!');
                    }
                    break;
                default:
                    throw new Error('Invalid action');
            }
        } catch (err: any) {
            alert('Error processing transaction: ' + err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center ">
            <div className="bg-white p-8 rounded-md shadow-lg w-[28rem]">
                <h1 className="text-2xl font-bold mb-4 text-center">Control Election</h1>

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

                {/* Election Control Buttons */}
                {account && (
                    <div className="mt-4 flex gap-4 justify-center">
                        <button
                            onClick={() => handleElectionAction('start')}
                            disabled={isLoading}
                            className={`bg-green-600 text-white px-6 py-2 rounded-md ${isLoading ? 'cursor-not-allowed' : 'hover:bg-green-700'
                                }`}
                        >
                            Start Election
                        </button>
                        <button
                            onClick={() => handleElectionAction('stop')}
                            disabled={isLoading}
                            className={`bg-yellow-600 text-white px-6 py-2 rounded-md ${isLoading ? 'cursor-not-allowed' : 'hover:bg-yellow-700'
                                }`}
                        >
                            Stop Election
                        </button>
                        <button
                            onClick={() => handleElectionAction('end')}
                            disabled={isLoading}
                            className={`bg-red-600 text-white px-6 py-2 rounded-md ${isLoading ? 'cursor-not-allowed' : 'hover:bg-red-700'
                                }`}
                        >
                            End Election
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ControlElectionPage;

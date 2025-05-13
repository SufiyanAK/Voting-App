import Web3 from "web3";
import { getContractInstance } from "./web3Utils";

// interface Ethereum {
//     request: (args: { method: string }) => Promise<string[]>;
// }

// interface Window {
//     ethereum?: Ethereum;
// }
// Check if wallet is connected
export const checkWalletConnection = async (): Promise<string | null> => {
    try {
        // Check if MetaMask is installed
        // if ((window as any).ethereum) {
        //     alert("MetaMask is not installed.");
        //     return null;
        // }

        if (!window.ethereum) {
            alert("Please install Metamask and try again.");
            return null;
        }

        // Initialize Web3 instance
        const web3 = new Web3((window as any).ethereum)

        // Check if wallet is connected
        const accounts = await web3.eth.getAccounts();
        if (accounts.length === 0) {
            alert("Wallet is not connected.");
            return null;
        }

        // Return connected wallet address
        return accounts[0];
    } catch (error: any) {
        alert(`Error checking wallet connection: ${error.message}`);
        return null;
    }
};

// Connect wallet
// export const connectWallet = async (): Promise<string | null> => {
//     const accounts = await (window as any).ethereum.request({ method: "eth_requestAccounts" });
//     if (typeof window.ethereum !== "undefined" && (window as any).ethereum){

//         try {
//         return accounts[0]; // Return the first connected account
//     } catch (error) {
//         console.error("Error connecting to MetaMask:", error);
//         alert("Could not connect to MetaMask. Please try again.");
//         return null;
//     }
// } return null;
// };

// Connect wallet
export const connectWallet = async (): Promise<string | null> => {
    if (!window.ethereum) {
        alert("Metamask is not installed. Please install Metamask and try again.");
        return null;
    }

    try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const walletAddress = accounts[0];
        localStorage.setItem("walletAddress", walletAddress);
        return walletAddress;
    } catch (error) {
        console.error("Error connecting wallet:", error);
        return null;
    }
};


// Disconnect wallet
export const disconnectWallet = (): void => {
    localStorage.removeItem("walletAddress");
    alert("Wallet disconnected successfully.");
};



// check admin + contract integration

// utils/walletUtils.ts
// import { getContractInstance } from "./contractUtils"; // Ensure you have this or similar function for contract instance

/**
 * Checks if the connected wallet is the contract owner (admin).
 * @returns {Promise<boolean>} True if admin, otherwise false.
 */
export const isAdmin = async (): Promise<boolean> => {
    try {
        const contract = getContractInstance(); // Your contract instance
        const ownerAddress : any= await contract.methods.owner().call(); // owner() from OpenZeppelin Ownable
        const connectedAddress = localStorage.getItem("walletAddress");

        if (!connectedAddress) {
            throw new Error("No wallet connected.");
        }

        if (!ownerAddress) {
            return false;
        }
        return connectedAddress.toLowerCase() === ownerAddress.toLowerCase();
    } catch (error) {
        console.error("Failed to verify admin status:", error);
        return false;
    }
};

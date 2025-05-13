// 'use client';
// import CandidateProfile from '@/components/candidatesProfile';
// import VoteBoard from '@/components/voteBoard';
// import { getContractInstance } from '@/utils/web3Utils';
// import React, { useState } from 'react';
// import Web3 from 'web3';
// import image from '@/public/assets/images/web-bg.svg'

// interface Candidate {
//     id: number;
//     name: string;
//     department: string;
//     batch: string;
//     votes: number;
// }
// const VotingPage = () => {
//     const [candidates, setCandidates] = useState<Candidate[]>([
//         { id: 1, name: 'Sufiyan', department: 'Engineering', batch: '2023', votes: 10 },
//         { id: 2, name: 'Tahir', department: 'Science', batch: '2022', votes: 1 },
//     ]);

//     const totalVotes = candidates.reduce((sum, candidate) => sum + candidate.votes, 0);
//     const [isProcessing, setIsProcessing] = useState(false);

//     const handleVote = async (id: number) => {
//         setIsProcessing(true);
//         try {
//             if (!window.ethereum) {
//                 alert("Please install MetaMask to vote.");
//                 return;
//             }

//             // Create Web3 instance and request accounts
//             const web3WithMetamask = new Web3(window.ethereum);
//             const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
//             const userAddress = accounts[0];

//             if (!userAddress) {
//                 alert("Wallet not connected. Please try again.");
//                 return;
//             }

//             const contract = getContractInstance();
//             contract.setProvider(web3WithMetamask.currentProvider);

//             // Call the smart contract method for voting
//             await contract.methods.vote(id).send({ from: userAddress });

//             // Update the state with the new vote count
//             setCandidates((prevCandidates) =>
//                 prevCandidates.map((candidate) =>
//                     candidate.id === id ? { ...candidate, votes: candidate.votes + 1 } : candidate
//                 )
//             );

//             alert('Your vote has been cast!');
//         } catch (error: any) {
//             console.error('Error: ', error);

//             // Handle revert error if any
//             let revertMessage = "An error occurred";
//             if (error?.message?.includes("revert")) {
//                 revertMessage = error.message.split("revert ")[1] || "Unknown error.";
//             }

//             alert(`Vote transaction failed: ${revertMessage}`);
//         } finally {
//             setIsProcessing(false);
//         }
//     };

//     return (
//         <div className="m-8 voting-page bg-prime-clr/80 min-h-[80%] w-[90%] mx-8 rounded-md max-w-screen-2xl flex flex-col items-center p-8 space-y-8">
//             <div className="flex space-x-8">
//                 {candidates.map((candidate) => (
//                     <CandidateProfile
//                         key={candidate.id}
//                         profileImage={image} // Replace with actual image path
//                         name={candidate.name}
//                         department={candidate.department}
//                         batch={candidate.batch}
//                         onVote={() => handleVote(candidate.id)}
//                     />
//                 ))}
//             </div>
//             <VoteBoard candidates={candidates} totalVotes={totalVotes} />
//         </div>
//     );
// };

// export default VotingPage;

'use client';
import CandidateProfile from '@/components/candidatesProfile';
import VoteBoard from '@/components/voteBoard';
import { getContractInstance } from '@/utils/web3Utils';
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import image from '@/public/assets/images/web-bg.svg';

interface Candidate {
    id: number;
    name: string;
    department: string;
    batch: string;
    votes: number;
}

const VotingPage = () => {
    const [candidates, setCandidates] = useState<Candidate[]>([
        { id: 1, name: 'Sufiyan', department: 'Engineering', batch: '2023', votes: 10 },
        { id: 2, name: 'Tahir', department: 'Science', batch: '2022', votes: 1 },
    ]);
    const [electionDetails, setElectionDetails] = useState<{
        name: string;
        description: string;
        startDate: string;
        endDate: string;
    } | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);

    const totalVotes = candidates.reduce((sum, candidate) => sum + candidate.votes, 0);

    const fetchElectionDetails = async () => {
        try {
            setIsLoading(true);
            const contract = getContractInstance();
            const details: any = await contract.methods.getElectionDetails().call();

            // Assuming your contract returns the following details
            setElectionDetails({
                name: details.name,
                description: details.description,
                startDate: new Date(parseInt(details.startDate) * 1000).toLocaleString(),
                endDate: new Date(parseInt(details.endDate) * 1000).toLocaleString(),
            });
        } catch (error) {
            console.error("Failed to fetch election details:", error);
            setElectionDetails(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchElectionDetails();
    }, []);

    const handleVote = async (id: number) => {
        setIsProcessing(true);
        try {
            if (!window.ethereum) {
                alert("Please install MetaMask to vote.");
                return;
            }

            const web3WithMetamask = new Web3(window.ethereum);
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            const userAddress = accounts[0];

            if (!userAddress) {
                alert("Wallet not connected. Please try again.");
                return;
            }

            const contract = getContractInstance();
            contract.setProvider(web3WithMetamask.currentProvider);

            await contract.methods.vote(id).send({ from: userAddress });

            setCandidates((prevCandidates) =>
                prevCandidates.map((candidate) =>
                    candidate.id === id ? { ...candidate, votes: candidate.votes + 1 } : candidate
                )
            );

            alert('Your vote has been cast!');
        } catch (error: any) {
            console.error('Error: ', error);
            let revertMessage = "An error occurred";
            if (error?.message?.includes("revert")) {
                revertMessage = error.message.split("revert ")[1] || "Unknown error.";
            }
            alert(`Vote transaction failed: ${revertMessage}`);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="m-8 voting-page bg-prime-clr/80 min-h-[80%] w-[90%] mx-8 rounded-md max-w-screen-2xl flex flex-col items-center p-8 space-y-8">
            {/* Election Details */}
            <div className="w-full text-center bg-gray-100 p-4 rounded-md shadow">
                {isLoading ? (
                    <p>Loading election details...</p>
                ) : electionDetails ? (
                    <>
                        <h1 className="text-2xl font-bold">{electionDetails.name}</h1>
                        <p className="text-lg">{electionDetails.description}</p>
                        <p className="text-sm text-gray-600">
                            <strong>Start Date:</strong> {electionDetails.startDate}
                        </p>
                        <p className="text-sm text-gray-600">
                            <strong>End Date:</strong> {electionDetails.endDate}
                        </p>
                    </>
                ) : (
                    <p className="text-red-500">Failed to load election details.</p>
                )}
            </div>

            {/* Candidates */}
            <div className="flex space-x-8">
                {candidates.map((candidate) => (
                    <CandidateProfile
                        key={candidate.id}
                        profileImage={image} // Replace with actual image path
                        name={candidate.name}
                        department={candidate.department}
                        batch={candidate.batch}
                        onVote={() => handleVote(candidate.id)}
                    />
                ))}
            </div>
            <VoteBoard candidates={candidates} totalVotes={totalVotes} />
        </div>
    );
};

export default VotingPage;

'use client';
import React, { useState } from 'react';
import CandidateProfile from '@/components/candidatesProfile';
import VoteBoard from '@/components/voteBoard';
import image from '@/public/assets/images/web-bg.svg'

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

    const totalVotes = candidates.reduce((sum, candidate) => sum + candidate.votes, 0);

    const handleVote = (id: number) => {
        setCandidates((prevCandidates) =>
            prevCandidates.map((candidate) =>
                candidate.id === id ? { ...candidate, votes: candidate.votes + 1 } : candidate
            )
        );
    };

    return (
        <div className="voting-page bg-prime-clr/80 min-h-[80%] w-[90%] mx-8 rounded-md max-w-screen-2xl flex flex-col items-center p-8 space-y-8">
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

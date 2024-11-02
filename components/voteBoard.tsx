interface Candidate {
    id: number;
    name: string;
    votes: number;
}

interface VoteBoardProps {
    candidates: Candidate[];
    totalVotes: number;
}

const VoteBoard = ({ candidates, totalVotes }: VoteBoardProps) => {
    return (
        <div className="total-votes bg-gray-800 bg-opacity-80 rounded-lg p-6 m-4 text-white shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">TOTAL VOTES</h2>
            <div className="flex flex-col space-y-2">
                {candidates.map((candidate, index) => (
                    <div key={index} className="flex justify-between py-2 border-b border-gray-700">
                        <p className="font-medium">{candidate.name}</p>
                        <p>{candidate.votes} votes</p>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-6">
                <div className="text-center bg-purple-600 p-6 rounded-lg w-32">
                    <p className="text-3xl font-bold">{totalVotes}</p>
                    <p className="uppercase text-sm">Total Votes</p>
                </div>
            </div>
        </div>
    );
};


export default VoteBoard;

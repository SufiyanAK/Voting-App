import Image, { StaticImageData } from "next/image";

interface CandidateProfileProps {
    profileImage: StaticImageData;
    name: string;
    department: string;
    batch: string;
    onVote: () => void;
}

const CandidateProfile = ({ profileImage, name, department, batch, onVote }: CandidateProfileProps) => {
    return (
        <div className="candidate-profile bg-gray-800 bg-opacity-80 rounded-lg p-6 m-4 text-white flex flex-col items-center shadow-lg">
            <Image src={profileImage} alt="Candidate Profile" className="size-32 rounded-md mb-4" />
            <h2 className="text-lg font-semibold mb-2">CANDIDATES PROFILE</h2>
            <div className="text-center space-y-2">
                <p>Name: {name}</p>
                <p>Department: {department}</p>
                <p>Batch: {batch}</p>
            </div>
            <button
                onClick={onVote}
                className="mt-4 px-6 py-2 bg-white text-gray-800 rounded-md font-semibold hover:bg-gray-300 transition"
            >
                Vote
            </button>
        </div>
    );
};

export default CandidateProfile;

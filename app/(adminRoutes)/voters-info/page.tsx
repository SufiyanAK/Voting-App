import React from 'react';

const VotersInfo = () => {
    const dummyVoters = [
        { id: 1, name: 'Tahir Rehan', email: 'Tahir@example.com' },
        { id: 2, name: 'Abdul saboor', email: 'abdullah@example.com' },
        { id: 3, name: 'Ehsan Ali khan', email: 'ehsan@example.com' },
    ];

    return (
        <div className="border border-white w-[90%] h-[90%] rounded-md text-white p-4 space-y-8">
            <div className="space-x-4 text-center">
                <button className="px-6 py-2 border border-white hover:bg-white hover:text-black text-4xl rounded-md duration-200">
                    Voter&apos;s verification
                </button>
                {/* <button className="px-6 py-2 border border-white hover:bg-white hover:text-black text-4xl rounded-md duration-200">
                    Voter&apos;s List
                </button> */}
            </div>
            <div className="space-y-4">
                {dummyVoters.map((voter) => (
                    <div
                        key={voter.id}
                        className="flex items-end gap-4 border-2 border-white p-4 rounded-md"
                    >
                        <div className="flex-1">
                            <p className="text-2xl p-2">{voter.name}</p>
                            <hr className="h-0.5 bg-white" />
                            <p className="text-2xl p-2">{voter.email}</p>
                            <hr className="h-0.5 bg-white" />
                        </div>
                        <div className="space-x-4">
                            <button className="px-4 py-2 border bg-white text-black hover:bg-transparent hover:border-white hover:text-white text-2xl rounded-md duration-200">
                                Confirm
                            </button>
                            <button className="px-4 py-2 border bg-white text-black hover:bg-transparent hover:border-white hover:text-white text-2xl rounded-md duration-200">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VotersInfo;

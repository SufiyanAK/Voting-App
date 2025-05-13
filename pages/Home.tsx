// 'use client'
// import Link from "next/link";
// const Home = () => {

//     return (
//         <div className='relative h-full w-full'>
//             <div className='absolute top-0 left-0 h-full w-full bg-black/40'></div>
//             <div className='relative z-50 w-full md:w-3/5 text-text-clr h-full mx-auto text-center space-y-6 flex flex-col justify-center items-center'>
//                 <h1 className='text-xl sm:text-2xl md:text-3xl xl:text-4xl 2xl:text-8xl font-bold'>Secure Vote</h1>
//                 <p className='text-3xl'>
//                     A voting system is a method used to collect and count votes in elections or decision-making processes. It involves voter registration, ballot design, casting votes, and counting the votes to determine the outcome.
//                 </p>

//                 {/* <Link href="/register" className='text-2xl font-bold bg-white text-black hover:bg-black hover:text-text-clr duration-200 px-6 py-2 rounded-md'>Register</Link> */}
//                 <Link href="/signup" className="text-2xl font-bold bg-white text-black hover:bg-black hover:text-white duration-500 px-6 py-2 rounded-md border-2 border-transparent hover:shadow-[0_0_10px_2px_rgba(255,255,255,0.8)] hover:shadow-white">Register</Link>

//                 {/* <p className='text-3xl text-stone-400'>Note: Registration will closed after 11 PM</p> */}
//             </div>
//         </div>
//     )
// }

// export default Home

'use client';
import { getContractInstance } from "@/utils/web3Utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Home = () => {
    const [isElectionActive, setIsElectionActive] = useState(false);
    const [loading, setLoading] = useState(true);

    // Fetch election details
    const fetchElectionDetails = async () => {
        try {
            setLoading(true);
            const contract = getContractInstance();
            const electionDetails: any = await contract.methods.getElectionDetails().call();
            console.log(electionDetails)
            // Assuming `electionDetails` has an `isActive` field
            setIsElectionActive(electionDetails?.isOngoing);
            console.log('i ran', isElectionActive)
        } catch (error) {
            console.error("Error fetching election details:", error);
            setIsElectionActive(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchElectionDetails();
    }, []);

    return (
        <div className="relative h-full w-full">
            <div className="absolute top-0 left-0 h-full w-full bg-black/40"></div>
            <div className="relative z-50 w-full md:w-3/5 text-text-clr h-full mx-auto text-center space-y-6 flex flex-col justify-center items-center">
                <h1 className="text-xl sm:text-2xl md:text-3xl xl:text-4xl 2xl:text-8xl font-bold">
                    Secure Vote
                </h1>
                <p className="text-3xl">
                    A voting system is a method used to collect and count votes in elections or decision-making processes. It involves voter registration, ballot design, casting votes, and counting the votes to determine the outcome.
                </p>

                {/* Register Button */}
                <Link
                    href="/signup"
                    className="text-2xl font-bold bg-white text-black hover:bg-black hover:text-white duration-500 px-6 py-2 rounded-md border-2 border-transparent hover:shadow-[0_0_10px_2px_rgba(255,255,255,0.8)] hover:shadow-white"
                >
                    Register
                </Link>

                {/* Conditional Vote Now Button */}
                {!loading && isElectionActive && (
                    <Link
                        href="/votes"
                        className="text-2xl font-bold bg-green-500 text-white hover:bg-green-700 duration-500 px-6 py-2 rounded-md border-2 border-transparent hover:shadow-[0_0_10px_2px_rgba(0,255,0,0.8)] hover:shadow-green-500"
                    >
                        Vote Now
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Home;

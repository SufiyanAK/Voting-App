import React from 'react'

const CreateElection = () => {
    return (
        <div className='border-2 border-white w-[90%] h-[90%] rounded-md text-center text-white p-4 space-y-8 flex flex-col items-center justify-center gap-4'>
            <h2 className='text-5xl font-bold leading-normal'>Empowering Voices,<br />Shaping Futures</h2>
            <p className='text-3xl text-[#DDDDDD] w-[40ch]'>
                Vote for Change. Shape Tomorrow. Every Voice Matters. Join Us in Building a Better Future.
                Together, Let's Make a Difference.
            </p>
            <div className='space-x-4'>
                <button className='px-4 py-2 border bg-white text-black hover:bg-transparent hover:border-white hover:text-white text-2xl rounded-md duration-200'>Cast Your Vote</button>
                <button className='px-4 py-2 border bg-white text-black hover:bg-transparent hover:border-white hover:text-white text-2xl rounded-md duration-200'>Meet the Candidates</button>
            </div>
        </div>
    )
}

export default CreateElection
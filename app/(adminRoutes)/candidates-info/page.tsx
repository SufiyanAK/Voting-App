const CandidateInfo = () => {
    return (
        <div className='border-2 border-white w-[90%] h-[90%] rounded-md text-white p-4 space-y-8'>
            <div className='space-x-4 text-center h-fit'>
                <button className='px-6 py-2 border border-white hover:bg-white hover:text-black text-4xl rounded-md duration-200'>Candidate Registration</button>
                <button className='px-6 py-2 border border-white hover:bg-white hover:text-black text-4xl rounded-md duration-200'>Candidates List</button>
            </div>
            <div className='flex flex-col gap-4 border-2 border-white p-4 rounded-md h-4/5'>
                <div className='flex-1 flex flex-col gap-4 items-center'>
                    <input className='text-2xl p-2 bg-transparent outline-none border-2 border-white rounded-md placeholder:text-white w-[500px]' type='text' placeholder='Name' />
                    <input className='text-2xl p-2 bg-transparent outline-none border-2 border-white rounded-md placeholder:text-white w-[500px]' type='email' placeholder='Email' />
                </div>

                <div className="flex items-center justify-center w-full">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:border-gray-600 ">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG (MAX. 800x400px)</p>
                        </div>
                        <input id="dropzone-file" type="file" accept="image/*" className="hidden" />
                    </label>
                </div>

                <div className='space-x-4 text-center'>
                    <button className='px-4 py-2 border bg-white text-black hover:bg-transparent hover:border-white hover:text-white text-3xl rounded-md duration-200'>Confirm</button>
                    <button className='px-4 py-2 border bg-white text-black hover:bg-transparent hover:border-white hover:text-white text-3xl rounded-md duration-200'>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default CandidateInfo
'use client'

import ImageUploader from "@/components/ImageUploader"
import { useState } from "react";

const CandidateInfo = () => {
    const [image, setImage] = useState<File | null>(null)

    const handleImageChange = (file: File | null) => {
        setImage(file);
        // setFormStates(prevFormStates => ({ ...prevFormStates, [type]: file }));
        // setChangedFields({ ...changedFields, [type]: file });
    };
    return (
        <div className='border-2 border-white w-[90%] h-[90%] rounded-md text-white p-4 space-y-8'>
            <div className='space-x-4 text-center h-fit'>
                <button className='px-6 py-2 border border-white hover:bg-white hover:text-black text-4xl rounded-md duration-200'>Candidate Registration</button>
                {/* <button className='px-6 py-2 border border-white hover:bg-white hover:text-black text-4xl rounded-md duration-200'>Candidates List</button> */}
            </div>
            <div className='flex flex-col gap-4 border-2 border-white p-4 rounded-md h-4/5'>
                <div className='flex-1 flex flex-col gap-4 items-center'>
                    <input className='text-2xl p-2 bg-transparent outline-none border-2 border-white rounded-md placeholder:text-white w-[500px]' type='text' placeholder='Name' />
                    <input className='text-2xl p-2 bg-transparent outline-none border-2 border-white rounded-md placeholder:text-white w-[500px]' type='email' placeholder='Email' />
                </div>

                <ImageUploader
                    label="Upload Image Here"
                    title="drop-image"
                    image={image}
                    onImageChange={(file) => handleImageChange(file)}
                />

                <div className='space-x-4 text-center'>
                    <button className='px-4 py-2 border bg-white text-black hover:bg-transparent hover:border-white hover:text-white text-3xl rounded-md duration-200'>Confirm</button>
                    <button className='px-4 py-2 border bg-white text-black hover:bg-transparent hover:border-white hover:text-white text-3xl rounded-md duration-200'>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default CandidateInfo
import Image from "next/image";
import { ChangeEvent, FC } from "react";

interface ImageUploaderProps {
    title: string;
    label: string;
    image: File | null;
    onImageChange: (file: File | null) => void;
}

const ImageUploader: FC<ImageUploaderProps> = ({ image, label, title, onImageChange }) => {
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        onImageChange(file);
    };

    return (

        <div className="flex items-center justify-center">
            <div className="flex flex-col items-center ">
                <label htmlFor={title} className="w-full text-center">
                    <div className="bg-white border-2 border-dashed border-gray-300 rounded-md w-full h-60 flex items-center justify-center mb-2">
                        {image ? (
                            <Image
                                width={50}
                                height={50}
                                src={URL.createObjectURL(image)}
                                alt="Employee"
                                className="w-full h-full rounded-md"
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG (MAX. 800x400px)</p>
                            </div>
                            // <span className="text-gray-400">Drop {title}</span>
                        )}
                    </div>
                </label>

                <input id={title} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </div>
        </div>
    )
}

export default ImageUploader
import { Button } from "@/components/button"

const Home = () => {
    return (
        <div className='relative h-full w-full'>
            <div className='absolute top-0 left-0 h-full w-full bg-black/40'></div>
            <div className='relative z-50 w-full md:w-3/5 text-text-clr h-full mx-auto text-center space-y-6 flex flex-col justify-center items-center'>
                <h1 className='text-xl sm:text-2xl md:text-3xl xl:text-4xl 2xl:text-8xl font-bold'>Secure Vote</h1>
                <p className='text-3xl'>
                    A voting system is a method used to collect and count votes in elections or decision-making processes. It involves voter registration, ballot design, casting votes, and counting the votes to determine the outcome.
                </p>
                <Button text="Register" classname='text-2xl font-bold bg-white text-black hover:bg-black hover:text-text-clr duration-200 px-6 py-2 rounded-md' />
                <p className='text-3xl text-stone-400'>Note: Registration will closed after 11 PM</p>
            </div>
        </div>
    )
}

export default Home
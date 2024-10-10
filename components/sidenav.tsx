import Link from "next/link"

export const Sidenav = () => {
    const navItem = [
        { name: 'voters Info', path: '/voters-info' },
        { name: 'Candidates Info', path: '/candidates-info' },
        { name: 'Result', path: '/result' },
        { name: 'Create Election', path: '/create-election' },
    ]

    return (
        <nav className='w-[400px] relative text-text-clr flex justify-center'>
            <div className="h-full w-full absolute opacity-90 bg-prime-clr"></div>
            <div className="relative mt-12 z-50 w-4/5 flex flex-col gap-y-8">
                <h4 className="text-4xl font-bold text-center hover:text-5xl duration-200">
                    <Link className="cursor-pointer" href='/admin-home'>
                        Menu
                    </Link>
                </h4>
                <ul className=" space-y-6">
                    {
                        navItem.map((item) => (
                            <li className="h-20 uppercase text-xl font-bold border border-white rounded-xl cursor-pointer transition-transform duration-200 hover:-translate-y-2" key={item.name}>
                                <Link className="px-6 size-full flex items-center " href={item.path}>{item.name}</Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </nav>
    )
}
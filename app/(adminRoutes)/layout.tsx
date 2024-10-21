import { Sidenav } from "@/components/sidenav"
import { ReactNode } from "react"

const AdminLayout = ({ children }: {
    children: ReactNode
}) => {
    return (
        <>
            <Sidenav />
            <main className="h-full flex-1">
                <section className='h-full mx-8 flex justify-center items-center'>
                    <div className='h-[90%] w-full bg-prime-clr bg-opacity-90 rounded-md flex justify-center items-center'>
                        {children}
                    </div>
                </section>
            </main>
        </>
    )
}

export default AdminLayout
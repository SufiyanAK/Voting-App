import { Sidenav } from "@/components/sidenav"
import { ReactNode } from "react"

const AdminLayout = ({ children }: {
    children: ReactNode
}) => {
    return (
        <>
            <Sidenav />
            <main>
                {children}
            </main>
        </>
    )
}

export default AdminLayout
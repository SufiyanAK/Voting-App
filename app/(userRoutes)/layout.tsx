import { ReactNode } from "react"

const UserLayout = ({ children }: {
    children: ReactNode
}) => {
    return (
        <main className="h-full w-full">
            {children}
        </main>
    )
}

export default UserLayout
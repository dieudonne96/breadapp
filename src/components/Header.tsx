import { useSession } from "next-auth/react"
import type { FC} from "react";
import { useEffect } from "react"
import { signOut, signIn } from "next-auth/react"
import Link from "next/link"
import { useUser } from "../hooks/useUser"
import { useAtom } from "jotai"
import { userAtom } from "../provider/atom"
import { useRouter } from "next/router"

const Header: FC = () => {

    const router = useRouter()

    const { data: session, status } = useSession()
    const { data, isValidating } = useUser(session?.user?.id)
    const [auth, setAuth] = useAtom(userAtom)

    useEffect(() => {
        if(data) {
            setAuth(data)
        }else{
            router.replace('/');
            setAuth(null)
        }
    }, [data])

    const handleSignOut = () => {
        if(status === "authenticated") {
            signOut()
        }else{
            signIn()
        }
    }

    const goHome = () => {
        router.replace("/")
    }

    return (
        <div className="navbar bg-neutral text-neutral-content">
            <div className="flex-1">
                <a onClick={goHome} className={"btn btn-ghost normal-case text-xl " + `${isValidating && 'loading'}`}>
                    {
                       auth && (auth?.business?.name ?? " WEB 3.0")
                    }
                </a>
            </div>
            <div className="navbar-end">
                {
                    status === "authenticated" && (
                    <ul className="menu menu-horizontal p-0">
                        <li><Link href={'/dashboard/users'}>Users</Link></li>
                        <li><Link href={'/dashboard/product'}>Products</Link></li>
                    </ul>
                    )
                }
                <a onClick={handleSignOut} className="btn">{status === "authenticated" ? "Logout" : "Login"}</a>
            </div>
        </div>
    )
}

export default Header
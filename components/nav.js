import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession, signOut } from 'next-auth/react'

export default function Nav() {
    const { data: session, status } = useSession();
    const router = useRouter();

    function logoutHandler() {
        signOut();
    }

    return (
        <nav className="bg-white">
            <div className="flex items-center justify-between h-12 md:h-14 px-2 sm:px-6 lg:px-8">
                <div className="nav-primary flex items-center h-full">
                    <Link href="/" className={`mr-8 ${router.pathname === '/' ? 'nav-active' : ''}`}>Home</Link>
                    <Link href="/about" className={`mr-8 ${router.pathname === '/About' ? 'nav-active' : ''}`}>About Us</Link>
                    <Link href="/services" className={`mr-8 ${router.pathname === '/Services' ? 'nav-active' : ''}`}>Services</Link>
                    <Link href="/blog" className={`mr-8 ${router.pathname === '/Blog' ? 'nav-active' : ''}`}>Blog</Link>
                    <Link href="/contact" className={`${router.pathname === '/Contact' ? 'nav-active' : ''}`}>Contact</Link>
                </div>
                <div className="nav-profile">
                    <div className="nav-primary flex items-center h-full">
                        {status !== 'authenticated' && (
                            <Link href='/signup'>Login</Link>
                        )}
                        {status === 'authenticated' && (
                            <Link href='/profile'>Profile</Link>
                        )}
                        {status === 'authenticated' && (
                            <Link href='/' onClick={logoutHandler}>Logout</Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}
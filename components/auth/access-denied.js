import { signIn } from 'next-auth/react'
import Link from 'next/link'

export default function AccessDenied() {
    return (
        <div>
            <h1>Acccess Denied</h1>
            <p>
                <Link
                    href="/api/auth/signup"
                    onClick={(e) => {
                        e.preventDefault()
                        signIn()
                    }}>
                    You must be signed in to view this page
                </Link>
            </p>
        </div>
    )
}
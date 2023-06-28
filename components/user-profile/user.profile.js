import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react'

export default function UserProfile() {
    const { data: session, status } = useSession();
    const [user, setUser] = useState('');

    if (session) console.log('profile session', session);

    useEffect(() => {
        if (session) setUser(session.user);
    }, [session]);

    return (
        <div>
            <h1>Welcome Back, {`${user.firstName} ${user.lastName}`}</h1>
        </div>
    )
}
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import UserProfile from '@/components/user-profile/user.profile'

export default function ProfilePage() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === 'loading') setIsLoading(true);

        if (status === 'authenticated') {
            setIsLoading(false);
        } 
        else {
            router.replace('/');
        }
    }, [router]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return <UserProfile />;
}
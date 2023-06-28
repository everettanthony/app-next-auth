import { SessionProvider } from 'next-auth/react'
import Layout from '@/components/layout'
import '../styles/globals.css'

export default function MyApp({Component, pageProps: { session, ...pageProps }}) {
    return (
        <SessionProvider session={session} refetchInterval={0}>
            <Layout>
                <Component { ...pageProps} />
            </Layout>
        </SessionProvider>
    )
}
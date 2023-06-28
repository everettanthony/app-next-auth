import Head from 'next/head'
import HomePage from './home'

export default function Index() {
    return (
        <div>
            <Head>
                <title>Next JS App with Authentication</title>
            </Head>
            <HomePage />
        </div>
    )
}
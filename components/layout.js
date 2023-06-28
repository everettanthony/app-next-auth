import Header from './header'

export default function Layout({ children }) {
    return (
      <div>
        <Header />
        <main className="px-6 py-4 sm:px-10 sm:py-8">{children}</main>
      </div>
    )
  }
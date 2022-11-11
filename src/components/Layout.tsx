const Layout = ({ children }: any) => {
    return (
        <main className="container mx-auto flex min-h-screen flex-col p-4">
            {children}
        </main>
    )
}
export default Layout
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Layout from "../../components/Layout";

const Dashboard: NextPage = () => {
    
    const { data: session, status } = useSession()

    return(
        <Layout>
            <h1>Dashboard</h1>
        </Layout>
    )
}

export default Dashboard;
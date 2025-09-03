import { withAuth } from "../../lib/auth/withAuth";

function Dashboard() {
    return (
        <>
            <h1>Dashboard</h1>
        </>
    );
}

const ProtectedDashboardPage = withAuth(Dashboard);
export default ProtectedDashboardPage;
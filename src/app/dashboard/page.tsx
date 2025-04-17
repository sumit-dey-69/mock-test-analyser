import DashboardDisplay from "@/components/dashboard/dashboard-display";
import DashboradActionButtons from "@/components/dashboard/dashborad-action-buttons";

function Dashboard() {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-10">
      <DashboardDisplay />
      <DashboradActionButtons />
    </div>
  );
}

export default Dashboard;

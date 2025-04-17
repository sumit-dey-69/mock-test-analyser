import DashboardDisplay from "@/components/dashboard/dashboard-display";
import DashboradActionButtons from "@/components/dashboard/dashborad-action-buttons";

function Dashboard() {
  return (
    <div className="p-2">
      <DashboardDisplay />
      <DashboradActionButtons />
    </div>
  );
}

export default Dashboard;

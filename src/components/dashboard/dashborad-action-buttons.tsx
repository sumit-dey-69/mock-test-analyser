import ResetDB from "./reset-db";
import BackButton from "./back-button";

function DashboradActionButtons() {
  return (
    <div className="flex justify-between px-3">
      <BackButton />
      <ResetDB />
    </div>
  );
}

export default DashboradActionButtons;

import ResetDB from "./reset-db";
import BackButton from "./back-button";

function DashboradActionButtons() {
  return (
    <div className="mx-auto flex w-max gap-4 text-sm">
      <BackButton />
      <ResetDB />
    </div>
  );
}

export default DashboradActionButtons;

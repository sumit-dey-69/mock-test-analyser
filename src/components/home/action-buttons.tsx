import DownloadBtn from "./download-btn";
import ResetButton from "./reset-button";
import SubmitButton from "./submit-button";
import ToggleButton from "./toggle-button";

function ActionButtons() {
  return (
    <div className="mx-auto flex w-max gap-4 text-sm">
      <ResetButton />
      <DownloadBtn />
      <ToggleButton />
      <SubmitButton />
    </div>
  );
}
export default ActionButtons;

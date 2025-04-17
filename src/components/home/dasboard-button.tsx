import { redirect } from "next/navigation";

function DasboardButton() {
  return <button className="py-1 px-2 border rounded-md bg-neutral-200 text-black font-bold cursor-pointer hover:brightness-90" onClick={()=> redirect("/dashboard")}>Dashboard</button>;
}

export default DasboardButton;

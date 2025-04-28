import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";


function BackButton() {
    const router = useRouter();
  return (
    <button
      onClick={() => router.push("/")}
      className="inline-flex items-center text-blue-400 hover:text-blue-300 hover:underline hover:underline-offset-4 cursor-pointer focus:outline-none focus:underline focus:underline-offset-4 transition mb-4"
    >
      <ArrowLeft className="size-5 mr-2" />
      <span>Back</span>
    </button>
  );
}

export default BackButton;

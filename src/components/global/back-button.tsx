import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";


function BackButton() {
    const router = useRouter();
  return (
    <button
      onClick={() => router.push("/")}
      className="flex z-10 w-fit items-center text-blue-400 hover:text-blue-300 hover:underline hover:underline-offset-4 cursor-pointer focus:outline-none focus:underline focus:underline-offset-4 transition"
    >
      <ArrowLeft className="size-[1.25em] mr-[0.5em]" />
      <span>Back</span>
    </button>
  );
}

export default BackButton;

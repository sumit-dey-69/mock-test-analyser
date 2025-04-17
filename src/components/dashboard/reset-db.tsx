"use client";

function ResetDB() {
  const handleResetDB = () => {
    const res = fetch("/api/reset-db", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  return (
    <button
      onClick={handleResetDB}
      className="bg-red-500/90 hover:bg-red-700 text-white px-2 py-1 rounded-lg disabled:opacity-50 cursor-pointer"
    >
      Reset DB
    </button>
  );
}

export default ResetDB;

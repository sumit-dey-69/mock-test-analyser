// // "use client";

// // import useTimeSpent from "@/zustand/use-time-spent";
// // import { time } from "console";

// // function TestCodeInput() {
// //   const { timeSpent, setTimeSpent } = useTimeSpent();
// //   return (
// //     <div className="flex w-[14rem] items-end gap-2">
// //       <span className="whitespace-nowrap">Time:</span>
// //       <input
// //         type="text"
// //         onChange={(e) => setTimeSpent(e.target.value)}
// //         value={timeSpent}
// //         className="h-7 w-12 border-b-2 border-gray-700 p-2 focus:border-gray-500 focus:outline-none"
// //       />
// //     </div>
// //   );
// // }
// // export default TestCodeInput;
// import { useEffect, useState } from "react";
// import useTimeSpent from "../zustand/use-time-spent";

// type TimeSpentInputProps = {
//   questionNumber: number;
//   subject: string;
// };

// const TimeSpentInput = ({ questionNumber, subject }: TimeSpentInputProps) => {
//   const { times, setTimeSpent } = useTimeSpent();
//   const [time, setTime] = useState<string>("");

//   useEffect(() => {
//     const existingTime = times.find(
//       (entry) =>
//         entry.questionNumber === questionNumber && entry.subject === subject
//     );
//     if (existingTime) {
//       setTime(existingTime.timeSpent);
//     }
//   }, [questionNumber, subject, times]);

//   const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newTime = e.target.value;
//     setTime(newTime);
//     setTimeSpent(questionNumber, subject, newTime);
//   };

//   return (
//     <div className="flex items-center">
//       <label htmlFor="time-spent" className="mr-2">
//         Time Spent:
//       </label>
//       <input
//         id="time-spent"
//         type="text"
//         value={time}
//         onChange={handleTimeChange}
//         className="w-16 p-1 text-center border border-gray-700 rounded-md"
//         placeholder="Enter time"
//       />
//     </div>
//   );
// };

// export default TimeSpentInput;

// components/TimeSpentInput.tsx
"use client";
import { useEffect, useState } from "react";
import useQuestion, { Subjects } from "../../zustand/use-question";

type TimeSpentInputProps = {
  questionNumber: number;
  subject: Subjects;
};

const TimeSpentInput = ({ questionNumber, subject }: TimeSpentInputProps) => {
  const { questions, setTimeSpent } = useQuestion();
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    const currentQuestion = questions.find(
      (q) => q.number === questionNumber && q.subject === subject
    );
    if (currentQuestion) {
      setTime(currentQuestion.timeSpent);
    }
  }, [questionNumber, subject, questions]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10) || 0;
    setTime(value);
    setTimeSpent({ number: questionNumber, time: value, subject });
  };

  return (
    <div className="flex items-center">
      <label htmlFor={`time-${questionNumber}`} className="mr-2 text-sm">
        Time Spent:
      </label>
      <input
        id={`time-${questionNumber}`}
        type="number"
        value={time}
        onChange={handleChange}
        min={0}
        placeholder="minutes"
        className="w-14 p-0.5 text-center border border-gray-700 rounded-md"
      />
    </div>
  );
};

export default TimeSpentInput;

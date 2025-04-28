// "use client";
// import {
//   BookA,
//   Brain,
//   CircleCheck,
//   CircleX,
//   Cpu,
//   Info,
//   Radical,
//   Target,
// } from "lucide-react";
// import { roundOff } from "../../utils/function";
// import patternPerSection from "../../utils/pattern";
// import type { Subjects } from "../../zustand/use-question";
// import useQuestion from "../../zustand/use-question";

// const subjectMappings: { key: Subjects; label: string }[] = [
//   { key: "mathematics", label: "Maths" },
//   { key: "logicalReasoning", label: "Reasoning" },
//   { key: "computerScience", label: "Computer" },
//   { key: "generalEnglish", label: "English" },
// ];

// function ResultBox() {
//   const { questions } = useQuestion();
//   const overallCorrect = questions.filter(
//     (q) => q.performance === "correct"
//   ).length;
//   const overallIncorrect = questions.filter(
//     (q) => q.performance === "wrong"
//   ).length;
//   const overallUnattempted = questions.filter(
//     (q) => q.performance === "unattempted"
//   ).length;
//   const totalAttempted = overallCorrect + overallIncorrect;
//   const overallAccuracy =
//     totalAttempted > 0 ? (overallCorrect * 100) / totalAttempted : 0;
//   let totalMarksObtained = 0;
//   let totalPossibleMarks = 0;
//   subjectMappings.forEach(({ key }) => {
//     const { totalQuestions, marksPerCorrect, marksPerIncorrect } =
//       patternPerSection[key];
//     const correctCount = questions.filter(
//       (q) => q.subject === key && q.performance === "correct"
//     ).length;
//     const incorrectCount = questions.filter(
//       (q) => q.subject === key && q.performance === "wrong"
//     ).length;
//     totalMarksObtained +=
//       correctCount * marksPerCorrect + incorrectCount * marksPerIncorrect;
//     totalPossibleMarks += totalQuestions * marksPerCorrect;
//   });
//   return (
//     <div className="mx-auto grid w-full max-w-[50rem] grid-rows-[auto_1fr] gap-4">
//       <div className="grid h-max grid-cols-4 gap-4">
//         {subjectMappings.map(({ key, label }) => {
//           const correctCount = questions.filter(
//             (q) => q.subject === key && q.performance === "correct"
//           ).length;
//           const incorrectCount = questions.filter(
//             (q) => q.subject === key && q.performance === "wrong"
//           ).length;
//           const unattemptedCount = questions.filter(
//             (q) => q.subject === key && q.performance === "unattempted"
//           ).length;
//           const denom = correctCount + incorrectCount;
//           const subjectAccuracy = denom > 0 ? (correctCount * 100) / denom : 0;
//           const { marksPerCorrect, marksPerIncorrect } = patternPerSection[key];
//           const subjectMarks =
//             correctCount * marksPerCorrect + incorrectCount * marksPerIncorrect;
//           return (
//             <Box
//               key={key}
//               type={key}
//               label={label}
//               correctQuestions={correctCount}
//               incorrectQuestions={incorrectCount}
//               unattemptedQuestions={unattemptedCount}
//               subjectMarks={subjectMarks}
//               subjectAccuracy={subjectAccuracy}
//             />
//           );
//         })}
//       </div>
//       <div className="grid grid-rows-[1fr_auto] space-y-2">
//         <div className="m-auto grid w-[16rem] place-content-center gap-6 rounded-xl border border-gray-600 bg-gray-900 p-4">
//           <p className="mx-auto flex w-max items-end gap-1 italic">
//             <span className="text-4xl font-semibold">{totalMarksObtained}</span>
//             <span className="text-gray-400">/</span>
//             <span className="text-gray-400">{totalPossibleMarks}</span>
//           </p>
//           <div className="mx-auto flex w-max items-center gap-2">
//             <Target className="w-6 h-6 text-gray-400" />
//             <p className="text-2xl">
//               {Number.isNaN(overallAccuracy) ? "__" : roundOff(overallAccuracy)}
//               <span className="text-2xl italic">%</span>
//             </p>
//           </div>
//           <div className="flex gap-4 items-center">
//             <div className="flex flex-col items-center">
//               <CircleCheck className="w-4 h-4 text-green-400" />
//               <p className="text-sm">{overallCorrect}</p>
//             </div>
//             <div className="flex flex-col items-center">
//               <CircleX className="w-4 h-4 text-red-500" />
//               <p className="text-sm">{overallIncorrect}</p>
//             </div>
//             <div className="flex flex-col items-center">
//               <Info className="w-4 h-4 text-orange-400" />
//               <p className="text-sm">{overallUnattempted}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ResultBox;

// type BoxProps = {
//   type: Subjects;
//   label: string;
//   correctQuestions: number;
//   incorrectQuestions: number;
//   unattemptedQuestions: number;
//   subjectMarks: number;
//   subjectAccuracy: number;
// };

// function Box({
//   type,
//   label,
//   correctQuestions,
//   incorrectQuestions,
//   unattemptedQuestions,
//   subjectMarks,
//   subjectAccuracy,
// }: BoxProps) {
//   const totalQuestions =
//     correctQuestions + incorrectQuestions + unattemptedQuestions;
//   const getIcon = (subject: Subjects) => {
//     switch (subject) {
//       case "mathematics":
//         return <Radical className="w-full h-full" />;
//       case "computerScience":
//         return <Cpu className="w-full h-full" />;
//       case "logicalReasoning":
//         return <Brain className="w-full h-full" />;
//       case "generalEnglish":
//         return <BookA className="w-full h-full" />;
//       default:
//         return null;
//     }
//   };
//   return (
//     <div className="grid grid-rows-[auto_1fr] space-y-2">
//       <div className="relative rounded-md bg-gray-900 p-4">
//         <div className="absolute top-2 right-2 w-12 h-12 opacity-10">
//           {getIcon(type)}
//         </div>
//         <div className="grid gap-2 items-center">
//           <div className="flex items-center gap-1">
//             <CircleCheck className="w-4 h-4 text-green-400" />
//             <p className="text-sm">{correctQuestions}</p>
//           </div>
//           <div className="flex items-center gap-1">
//             <CircleX className="w-4 h-4 text-red-500" />
//             <p className="text-sm">{incorrectQuestions}</p>
//           </div>
//           <div className="flex items-center gap-1">
//             <Info className="w-4 h-4 text-orange-400" />
//             <p className="text-sm">{unattemptedQuestions}</p>
//           </div>
//           <div className="flex items-center gap-1">
//             <Target className="w-4 h-4" />
//             <p className="text-xs">
//               {Number.isNaN(subjectAccuracy) ? "__" : roundOff(subjectAccuracy)}
//               <span className="text-xs italic">%</span>
//             </p>
//           </div>
//         </div>
//         <p className="absolute right-3 bottom-2 text-sm italic">
//           {totalQuestions}
//         </p>
//       </div>
//     </div>
//   );
// }

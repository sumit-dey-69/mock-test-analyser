// "use client";
// import {
//   BookA,
//   Brain,
//   ChevronLeft,
//   ChevronRight,
//   Cpu,
//   Radical,
// } from "lucide-react";
// import { useEffect, useState } from "react";
// import { twMerge } from "tailwind-merge";
// import useQuestion from "../zustand/use-question";
// import useQuestionNumber from "../zustand/use-question-number";
// import {
//   CorrectBtn,
//   NotConfidentBtn,
//   OutOfBoxBtn,
//   UnattemptedBtn,
//   UnknownBtn,
//   WrongBtn,
// } from "./quiz-button";
// import TimeSpentInput from "./time-spent-input";

// function QuestionBox() {
//   const {
//     currentQuestionNumber,
//     currentSection,
//     changeSection,
//     nextQuestion,
//     previousQuestion,
//   } = useQuestionNumber();
//   const { questions, setQuestionStatus } = useQuestion();
//   const [hasResponded, setHasResponded] = useState(false);

//   const filteredQuestions = questions.filter(
//     (q) => q.subject === currentSection
//   );
//   const question = filteredQuestions[currentQuestionNumber - 1];

//   useEffect(() => {
//     const abortController = new AbortController();

//     if (
//       hasResponded &&
//       (question.performance === "correct" ||
//         question.performance === "wrong" ||
//         (question.performance === "unattempted" && question.remark !== null))
//     ) {
//       const timeout = setTimeout(() => {
//         nextQuestion();
//         setHasResponded(false);
//       }, 500);

//       return () => {
//         clearTimeout(timeout);
//         abortController.abort();
//       };
//     }
//   }, [hasResponded, question.performance, question.remark, nextQuestion]);

//   const sections = [
//     { name: "mathematics", icon: <Radical /> },
//     { name: "logicalReasoning", icon: <Brain /> },
//     { name: "computerScience", icon: <Cpu /> },
//     { name: "generalEnglish", icon: <BookA /> },
//   ] as const;

//   return (
//     <div className="mx-auto flex max-w-[30rem] flex-col h-[20rem] justify-between gap-4 rounded-md border border-gray-700 p-4">
//       <div className="flex justify-between items-center">
//         <p className="text-2xl font-medium">Q{question.number}.</p>

//         <TimeSpentInput questionNumber={question.number} subject={currentSection} />

//         <div className="flex gap-2">
//           {sections.map(({ name, icon }) => (
//             <button
//               key={name}
//               title={name}
//               onClick={() => changeSection(name)}
//               className={twMerge(
//                 "cursor-pointer p-2 transition-opacity hover:bg-gray-800 rounded-md",
//                 currentSection === name ? "opacity-100" : "opacity-40"
//               )}
//             >
//               {icon}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="flex w-max gap-6">
//         <CorrectBtn
//           onClick={() => {
//             setHasResponded(true);
//             setQuestionStatus({
//               number: question.number,
//               performance: "correct",
//               subject: currentSection,
//               remark: null,
//             });
//           }}
//           className={
//             question.performance === "correct" ? "bg-green-900/40" : undefined
//           }
//         />
//         <WrongBtn
//           onClick={() => {
//             setHasResponded(true);
//             setQuestionStatus({
//               number: question.number,
//               performance: "wrong",
//               subject: currentSection,
//               remark: null,
//             });
//           }}
//           className={
//             question.performance === "wrong" ? "bg-red-900/40" : undefined
//           }
//         />
//         <UnattemptedBtn
//           onClick={() => {
//             setHasResponded(false);
//             setQuestionStatus({
//               number: question.number,
//               performance: "unattempted",
//               subject: currentSection,
//               remark: null,
//             });
//           }}
//           className={
//             question.performance === "unattempted" && question.remark === null
//               ? "bg-orange-400/20"
//               : undefined
//           }
//         />
//       </div>

//       {question.performance != "unattempted" && (
//         <div className="min-w-[7.85rem] h-11"></div>
//       )}

//       {question.performance === "unattempted" && (
//         <div className="flex w-max flex-wrap gap-4">
//           <OutOfBoxBtn
//             onClick={() => {
//               setHasResponded(true);
//               setQuestionStatus({
//                 number: question.number,
//                 performance: "unattempted",
//                 subject: currentSection,
//                 remark: "out-of-box",
//               });
//             }}
//             className={
//               question.remark === "out-of-box" ? "bg-gray-800/40" : undefined
//             }
//           />
//           <UnknownBtn
//             onClick={() => {
//               setHasResponded(true);
//               setQuestionStatus({
//                 number: question.number,
//                 performance: "unattempted",
//                 subject: currentSection,
//                 remark: "unknown",
//               });
//             }}
//             className={
//               question.remark === "unknown" ? "bg-gray-800/40" : undefined
//             }
//           />
//           <NotConfidentBtn
//             onClick={() => {
//               setHasResponded(true);
//               setQuestionStatus({
//                 number: question.number,
//                 performance: "unattempted",
//                 subject: currentSection,
//                 remark: "not-confident",
//               });
//             }}
//             className={
//               question.remark === "not-confident" ? "bg-gray-800/40" : undefined
//             }
//           />
//         </div>
//       )}

//       <div className="flex justify-between">
//         <button
//           onClick={previousQuestion}
//           className="flex cursor-pointer items-center gap-1 rounded-md bg-gray-700 px-3 py-1.5 text-[0.8em] hover:brightness-150"
//         >
//           <ChevronLeft className="size-[1.2em]" />
//           Back
//         </button>
//         <button
//           onClick={nextQuestion}
//           className="flex cursor-pointer items-center gap-1 rounded-md bg-gray-700 px-3 py-1.5 text-[0.8em] hover:brightness-150"
//         >
//           Next
//           <ChevronRight className="size-[1.2em]" />
//         </button>
//       </div>
//     </div>
//   );
// }

// export default QuestionBox;

// components/QuestionBox.tsx
"use client";
import TimeSpentInput from "@/components/home/time-spent-input";
import {
  BookA,
  Brain,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Radical,
} from "lucide-react";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import useQuestion from "../../zustand/use-question";
import useQuestionNumber from "../../zustand/use-question-number";
import {
  CorrectBtn,
  NotConfidentBtn,
  OutOfBoxBtn,
  UnattemptedBtn,
  UnknownBtn,
  WrongBtn,
} from "./quiz-button";

function QuestionBox() {
  const {
    currentQuestionNumber,
    currentSection,
    changeSection,
    nextQuestion,
    previousQuestion,
  } = useQuestionNumber();
  const { questions, setQuestionStatus } = useQuestion();
  const [hasResponded, setHasResponded] = useState(false);

  const filteredQuestions = questions.filter(
    (q) => q.subject === currentSection
  );
  const question = filteredQuestions[currentQuestionNumber - 1];

  useEffect(() => {
    const abortController = new AbortController();

    if (
      hasResponded &&
      (question.performance === "correct" ||
        question.performance === "wrong" ||
        (question.performance === "unattempted" && question.remark !== null))
    ) {
      const timeout = setTimeout(() => {
        nextQuestion();
        setHasResponded(false);
      }, 500);

      return () => {
        clearTimeout(timeout);
        abortController.abort();
      };
    }
  }, [hasResponded, question.performance, question.remark, nextQuestion]);

  const sections = [
    { name: "mathematics", icon: <Radical /> },
    { name: "logicalReasoning", icon: <Brain /> },
    { name: "computerScience", icon: <Cpu /> },
    { name: "generalEnglish", icon: <BookA /> },
  ] as const;

  return (
    <div className="mx-auto flex max-w-[30rem] flex-col h-[20rem] justify-between gap-4 rounded-md border border-gray-700 p-4">
      <div className="flex justify-between items-center">
        <p className="text-2xl font-medium">Q{question.number}.</p>

        <TimeSpentInput
          questionNumber={question.number}
          subject={currentSection}
        />

        <div className="flex gap-2">
          {sections.map(({ name, icon }) => (
            <button
              key={name}
              title={name}
              onClick={() => changeSection(name)}
              className={twMerge(
                "cursor-pointer p-2 transition-opacity hover:bg-gray-800 rounded-md",
                currentSection === name ? "opacity-100" : "opacity-40"
              )}
            >
              {icon}
            </button>
          ))}
        </div>
      </div>

      <div className="flex w-max gap-6">
        <CorrectBtn
          onClick={() => {
            setHasResponded(true);
            setQuestionStatus({
              number: question.number,
              performance: "correct",
              subject: currentSection,
              remark: null,
            });
          }}
          className={
            question.performance === "correct" ? "bg-green-900/40" : undefined
          }
        />
        <WrongBtn
          onClick={() => {
            setHasResponded(true);
            setQuestionStatus({
              number: question.number,
              performance: "wrong",
              subject: currentSection,
              remark: null,
            });
          }}
          className={
            question.performance === "wrong" ? "bg-red-900/40" : undefined
          }
        />
        <UnattemptedBtn
          onClick={() => {
            setHasResponded(false);
            setQuestionStatus({
              number: question.number,
              performance: "unattempted",
              subject: currentSection,
              remark: null,
            });
          }}
          className={
            question.performance === "unattempted" && question.remark === null
              ? "bg-orange-400/20"
              : undefined
          }
        />
      </div>

      {question.performance !== "unattempted" && (
        <div className="min-w-[7.85rem] h-11"></div>
      )}

      {question.performance === "unattempted" && (
        <div className="flex w-max flex-wrap gap-4">
          <OutOfBoxBtn
            onClick={() => {
              setHasResponded(true);
              setQuestionStatus({
                number: question.number,
                performance: "unattempted",
                subject: currentSection,
                remark: "out-of-box",
              });
            }}
            className={
              question.remark === "out-of-box" ? "bg-gray-800/40" : undefined
            }
          />
          <UnknownBtn
            onClick={() => {
              setHasResponded(true);
              setQuestionStatus({
                number: question.number,
                performance: "unattempted",
                subject: currentSection,
                remark: "unknown",
              });
            }}
            className={
              question.remark === "unknown" ? "bg-gray-800/40" : undefined
            }
          />
          <NotConfidentBtn
            onClick={() => {
              setHasResponded(true);
              setQuestionStatus({
                number: question.number,
                performance: "unattempted",
                subject: currentSection,
                remark: "not-confident",
              });
            }}
            className={
              question.remark === "not-confident" ? "bg-gray-800/40" : undefined
            }
          />
        </div>
      )}

      <div className="flex justify-between">
        <button
          onClick={previousQuestion}
          className="flex cursor-pointer items-center gap-1 rounded-md bg-gray-800 px-3 py-1.5 text-[0.8em] hover:brightness-150"
        >
          <ChevronLeft className="size-[1.2em]" />
          Back
        </button>
        <button
          onClick={nextQuestion}
          className="flex cursor-pointer items-center gap-1 rounded-md bg-gray-800 px-3 py-1.5 text-[0.8em] hover:brightness-150"
        >
          Next
          <ChevronRight className="size-[1.2em]" />
        </button>
      </div>
    </div>
  );
}

export default QuestionBox;

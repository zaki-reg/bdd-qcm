"use client";

import { useState, useMemo } from "react";
import { MCQCard } from "@/components/mcq-card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import type { MCQData } from "@/types/mcq";
import {
  Trophy,
  RotateCcw,
  TrendingUp,
  CheckCircle2,
  XCircle,
  ChevronRight,
} from "lucide-react";

interface QuizResults {
  [questionId: string]: {
    selectedChoices: string[];
    isCorrect: boolean;
  };
}

export function MCQQuiz({ data }: { data: MCQData }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<QuizResults>({});
  const [isComplete, setIsComplete] = useState(false);

  const currentQuestion = data.questions[currentIndex];
  const progress = ((currentIndex + 1) / data.questions.length) * 100;
  const score = Object.values(results).filter((r) => r.isCorrect).length;
  const percentage = isComplete
    ? ((score / data.questions.length) * 100).toFixed(1)
    : 0;

  const correctChoiceIds = useMemo(() => {
    return currentQuestion.choices.filter((c) => c.is_correct).map((c) => c.id);
  }, [currentQuestion.choices]);

  const currentResult = results[currentQuestion.id];
  const isFullyCorrect = currentResult?.isCorrect;

  const handleAnswer = (
    questionId: string,
    selectedChoices: string[],
    isCorrect: boolean
  ) => {
    setResults((prev) => ({
      ...prev,
      [questionId]: { selectedChoices, isCorrect },
    }));
  };

  const handleNext = () => {
    if (currentIndex < data.questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setIsComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setResults({});
    setIsComplete(false);
  };

  const getGrade = () => {
    const percent = Number(percentage);
    if (percent >= 90)
      return {
        text: "Excellent!",
        color: "text-emerald-400",
        bgColor: "bg-emerald-500/10",
      };
    if (percent >= 75)
      return {
        text: "Great Job!",
        color: "text-blue-400",
        bgColor: "bg-blue-500/10",
      };
    if (percent >= 60)
      return {
        text: "Good!",
        color: "text-amber-400",
        bgColor: "bg-amber-500/10",
      };
    return {
      text: "Keep Practicing!",
      color: "text-rose-400",
      bgColor: "bg-rose-500/10",
    };
  };

  if (isComplete) {
    const grade = getGrade();
    return (
      <div className="w-full max-w-2xl mx-auto p-6 animate-scale-in">
        <div className="bg-card/50 backdrop-blur border border-white/10 rounded-2xl p-8 space-y-6 text-center">
          <Trophy className="w-16 h-16 mx-auto text-amber-400 animate-scale-in" />

          <div className="space-y-2 animate-fade-in">
            <h2 className="text-3xl font-bold">Quiz Complete!</h2>
            <div
              className={`inline-block px-4 py-2 rounded-lg ${grade.bgColor}`}
            >
              <p className={`text-2xl font-semibold ${grade.color}`}>
                {grade.text}
              </p>
            </div>
          </div>

          <div className="py-8 animate-slide-up">
            <div className="text-7xl font-bold mb-2">
              {score}
              <span className="text-4xl text-muted-foreground">
                /{data.questions.length}
              </span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <p className="text-2xl font-semibold text-emerald-400">
                {percentage}%
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-4 animate-fade-in">
            <div className="flex items-center justify-between text-sm p-3 rounded-lg bg-white/5">
              <span className="text-muted-foreground">Correct Answers</span>
              <Badge
                variant="outline"
                className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
              >
                {score}
              </Badge>
            </div>
            <div className="flex items-center justify-between text-sm p-3 rounded-lg bg-white/5">
              <span className="text-muted-foreground">Incorrect Answers</span>
              <Badge
                variant="outline"
                className="bg-rose-500/10 text-rose-400 border-rose-500/30"
              >
                {data.questions.length - score}
              </Badge>
            </div>
            <div className="flex items-center justify-between text-sm p-3 rounded-lg bg-white/5">
              <span className="text-muted-foreground">Total Questions</span>
              <Badge variant="outline">{data.questions.length}</Badge>
            </div>
          </div>

          <Button
            onClick={handleRestart}
            size="lg"
            className="w-full mt-6 text-base font-semibold transition-all active:scale-[0.98]"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Restart Quiz
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold">{data.metadata.domain}</h2>
            <p className="text-sm text-muted-foreground">
              {data.metadata.source}
            </p>
          </div>
          <Badge variant="outline" className="text-base px-4 py-1">
            {currentIndex + 1} / {data.questions.length}
          </Badge>
        </div>

        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between items-center">
            <p className="text-xs text-muted-foreground">
              {progress.toFixed(0)}% Complete
            </p>
            <p className="text-xs font-medium text-muted-foreground">
              Score: {score}/{currentIndex}
            </p>
          </div>
        </div>
      </div>

      <MCQCard
        key={currentQuestion.id}
        question={currentQuestion}
        questionNumber={currentIndex + 1}
        totalQuestions={data.questions.length}
        onAnswer={handleAnswer}
      />

      {currentResult && (
        <div className="max-w-4xl mx-auto space-y-4 animate-slide-up">
          <Button
            onClick={handleNext}
            size="lg"
            className="w-full text-base font-semibold transition-all active:scale-[0.98]"
          >
            {currentIndex < data.questions.length - 1 ? (
              <>
                Next Question
                <ChevronRight className="w-4 h-4 ml-2" />
              </>
            ) : (
              "View Results"
            )}
          </Button>

          <div
            className={`p-4 rounded-lg border-2 ${
              isFullyCorrect
                ? "bg-emerald-500/10 border-emerald-500/30"
                : "bg-rose-500/10 border-rose-500/30"
            }`}
          >
            <div className="flex items-start gap-3">
              {isFullyCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-semibold mb-1">
                  {isFullyCorrect ? "Correct!" : "Incorrect"}
                </p>
                {!isFullyCorrect && (
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p className="break-words">
                      Correct answer{correctChoiceIds.length > 1 ? "s" : ""}:{" "}
                      <span className="font-semibold">
                        {correctChoiceIds
                          .map((id) => {
                            const choice = currentQuestion.choices.find(
                              (c) => c.id === id
                            );
                            return `${choice?.id}. ${choice?.text}`;
                          })
                          .join(", ")}
                      </span>
                    </p>
                  </div>
                )}
                <p className="text-xs text-muted-foreground mt-2">
                  Source: {currentQuestion.source_document}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

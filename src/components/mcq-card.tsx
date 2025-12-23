"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import type { Question } from "@/types/mcq";
import { CheckCircle2, XCircle, AlertCircle, BookOpen } from "lucide-react";
import { motion, ScaleIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

interface MCQCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (
    questionId: string,
    selectedChoices: string[],
    isCorrect: boolean
  ) => void;
}

export function MCQCard({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
}: MCQCardProps) {
  const [selectedChoices, setSelectedChoices] = useState<string[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);

  const correctChoiceIds = useMemo(() => {
    return question.choices.filter((c) => c.is_correct).map((c) => c.id);
  }, [question.choices]);

  const handleToggleChoice = (choiceId: string) => {
    if (isAnswered) return;

    setSelectedChoices((prev) =>
      prev.includes(choiceId)
        ? prev.filter((id) => id !== choiceId)
        : [...prev, choiceId]
    );
  };

  const handleSubmit = () => {
    if (selectedChoices.length === 0) return;

    const isCorrect =
      correctChoiceIds.length === selectedChoices.length &&
      correctChoiceIds.every((id) => selectedChoices.includes(id));

    setIsAnswered(true);
    onAnswer(question.id, selectedChoices, isCorrect);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      case "medium":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      case "hard":
        return "bg-rose-500/10 text-rose-400 border-rose-500/30";
      default:
        return "";
    }
  };

  const getChoiceStatus = (choiceId: string) => {
    if (!isAnswered) return "default";
    const isCorrect = correctChoiceIds.includes(choiceId);
    const isSelected = selectedChoices.includes(choiceId);

    if (isCorrect && isSelected) return "correct";
    if (isCorrect && !isSelected) return "missed";
    if (!isCorrect && isSelected) return "incorrect";
    return "default";
  };

  return (
    <ScaleIn>
      <Card className="w-full max-w-4xl mx-auto border-white/10 bg-card/50 backdrop-blur">
        <CardHeader className="space-y-4 pb-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono text-muted-foreground">
                {questionNumber} of {totalQuestions}
              </span>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <BookOpen className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Chapter: {question.topic}</span>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Badge
                variant="outline"
                className={getDifficultyColor(question.difficulty)}
              >
                {question.difficulty.toUpperCase()}
              </Badge>
              {correctChoiceIds.length > 1 && (
                <Badge
                  variant="outline"
                  className="bg-purple-500/10 text-purple-400 border-purple-500/30"
                >
                  MULTIPLE
                </Badge>
              )}
            </div>
          </div>
          <CardTitle className="text-xl sm:text-2xl font-semibold leading-relaxed">
            {question.question}
          </CardTitle>
          {correctChoiceIds.length > 1 && !isAnswered && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 text-sm text-muted-foreground bg-purple-500/5 border border-purple-500/20 rounded-lg p-3"
            >
              <AlertCircle className="w-4 h-4 text-purple-400 flex-shrink-0" />
              <span>Select all correct answers</span>
            </motion.div>
          )}
        </CardHeader>

        <CardContent className="space-y-6">
          <StaggerContainer className="space-y-3">
            {question.choices.map((choice) => {
              const status = getChoiceStatus(choice.id);
              const isSelected = selectedChoices.includes(choice.id);

              return (
                <StaggerItem key={choice.id}>
                  <motion.div
                    onClick={() => handleToggleChoice(choice.id)}
                    whileTap={!isAnswered ? { scale: 0.98 } : undefined}
                    className={`group relative flex items-start space-x-4 p-4 rounded-lg border-2 transition-colors duration-200 ${status === "correct"
                        ? "border-emerald-500 bg-emerald-500/10"
                        : status === "incorrect"
                          ? "border-rose-500 bg-rose-500/10"
                          : status === "missed"
                            ? "border-amber-500 bg-amber-500/10"
                            : isSelected && !isAnswered
                              ? "border-primary bg-primary/5"
                              : "border-white/10 hover:border-white/20 hover:bg-white/5"
                      } ${!isAnswered
                        ? "cursor-pointer touch-manipulation"
                        : "cursor-default"
                      }`}
                  >
                    <Checkbox
                      id={`choice-${choice.id}`}
                      checked={isSelected}
                      disabled={isAnswered}
                      className={`mt-0.5 pointer-events-none flex-shrink-0 ${status === "correct"
                          ? "border-emerald-500 data-[state=checked]:bg-emerald-500"
                          : status === "incorrect"
                            ? "border-rose-500 data-[state=checked]:bg-rose-500"
                            : status === "missed"
                              ? "border-amber-500"
                              : ""
                        }`}
                    />
                    <Label
                      htmlFor={`choice-${choice.id}`}
                      className="flex-1 text-base leading-relaxed pointer-events-none select-none"
                    >
                      <span className="font-semibold mr-2">{choice.id}.</span>
                      <span className="break-words">{choice.text}</span>
                    </Label>

                    {status === "correct" && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      >
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      </motion.div>
                    )}
                    {status === "incorrect" && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      >
                        <XCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />
                      </motion.div>
                    )}
                    {status === "missed" && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      >
                        <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                      </motion.div>
                    )}
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          {!isAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              <Button
                onClick={handleSubmit}
                disabled={selectedChoices.length === 0}
                size="lg"
                className="w-full text-base font-semibold transition-all active:scale-[0.98] touch-manipulation"
              >
                Submit Answer
                {selectedChoices.length > 0
                  ? ` (${selectedChoices.length} selected)`
                  : ""}
              </Button>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </ScaleIn>
  );
}

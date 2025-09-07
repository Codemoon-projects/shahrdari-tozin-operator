"use client";

import * as React from "react";
import { Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useModals } from "@/hooks/useModal";
import { ModalStep } from "@/store/core/modals";

interface StepProps {
  title: string;
  description?: string;
  isCompleted?: boolean;
  isActive?: boolean;
}

const Step: React.FC<StepProps> = ({
  title,
  description,
  isCompleted,
  isActive,
}) => {
  return (
    <div className="flex items-center gap-4">
      <div className="relative flex items-center justify-center">
        <div
          className={cn(
            "w-8 h-8 rounded-full border-2 flex items-center justify-center",
            isCompleted
              ? "border-primary bg-primary text-white"
              : isActive
              ? "border-primary"
              : "border-muted"
          )}
        >
          {isCompleted ? (
            <Check className="w-4 h-4" />
          ) : (
            <span className="text-sm font-medium">{title[0]}</span>
          )}
        </div>
      </div>
      <div>
        <p
          className={cn(
            "text-sm font-medium",
            isActive || isCompleted
              ? "text-foreground"
              : "text-muted-foreground"
          )}
        >
          {title}
        </p>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
};

export function Stepper() {
  const {
    step: currentStep,
    selectedCar,
    empltyWeghting,
    fullWeghting,
    actionType,
  } = useModals();

  const steps = [
    {
      title: "پلاک",
      isCompleted: currentStep === 1 || currentStep === 2 || currentStep === 3,
      step: ModalStep.PLAQUE,
    },
    ...(actionType?.type === "empty"
      ? [
          {
            step: ModalStep.WEIGHTING_EMPTY,
            title: "وزن خالی",
            isCompleted: currentStep === 1 || currentStep === 3,
          },
          {
            title: "وزن پر",
            isCompleted: currentStep === 3,
            step: ModalStep.WEIGHTING_FULL,
          },
        ]
      : [
          {
            title: "وزن پر",
            isCompleted: currentStep === 3 || currentStep === 2,
            step: ModalStep.WEIGHTING_FULL,
          },
          {
            step: ModalStep.WEIGHTING_EMPTY,
            title: "وزن خالی",
            isCompleted: currentStep === 3,
          },
        ]),
    {
      step: ModalStep.CONFIRM,
      title: "تایید",
      isCompleted: false,
    },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto" dir="ltr">
      <div className="flex flex-row justify-between items-start md:items-center gap-4 mb-8">
        {steps.map((step, index) => (
          <React.Fragment key={step.title}>
            <Step
              title={step.title}
              isCompleted={step.isCompleted}
              isActive={step.step === currentStep}
            />
            {index < steps.length - 1 && (
              <ChevronRight className="hidden md:block text-muted-foreground" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

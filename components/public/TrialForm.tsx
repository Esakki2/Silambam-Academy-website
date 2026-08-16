"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  trialRegistrationSchema,
  type TrialRegistrationInput,
} from "@/lib/validations/trial";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function TrialForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<TrialRegistrationInput>({
    resolver: zodResolver(trialRegistrationSchema),
    defaultValues: {
      consent: undefined as unknown as true,
    },
  });

  const age = watch("age");

  async function onSubmit(data: TrialRegistrationInput) {
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/trial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Submission failed");
      }
      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-gold/40 bg-gold/10 p-8 text-center">
        <h3 className="font-display text-2xl text-gold mb-3">
          Registration Received
        </h3>
        <p className="text-muted">
          Thank you. Our team will contact you shortly to schedule your trial
          class.
        </p>
        <Button
          className="mt-6"
          variant="outline"
          onClick={() => setStatus("idle")}
        >
          Submit another
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
      noValidate
    >
      <div className="grid sm:grid-cols-2 gap-5">
        <Field
          label="Student Name *"
          error={errors.student_name?.message}
        >
          <input
            {...register("student_name")}
            className={inputClass}
            placeholder="Full name"
            autoComplete="name"
          />
        </Field>
        <Field label="Age" error={errors.age?.message}>
          <input
            type="number"
            {...register("age")}
            className={inputClass}
            placeholder="Age"
            min={3}
            max={80}
          />
        </Field>
      </div>

      {(age !== undefined && !Number.isNaN(Number(age)) && Number(age) < 18) && (
        <Field
          label="Parent / Guardian Name *"
          error={errors.parent_guardian_name?.message}
        >
          <input
            {...register("parent_guardian_name")}
            className={inputClass}
            placeholder="Required for minors"
          />
        </Field>
      )}

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Phone *" error={errors.phone?.message}>
          <input
            {...register("phone")}
            type="tel"
            className={inputClass}
            placeholder="+91 ..."
            autoComplete="tel"
          />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input
            {...register("email")}
            type="email"
            className={inputClass}
            placeholder="optional@email.com"
            autoComplete="email"
          />
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Preferred Class">
          <select {...register("preferred_class")} className={inputClass}>
            <option value="">Select class</option>
            <option value="Kids">Kids</option>
            <option value="Teens">Teens</option>
            <option value="Adults">Adults</option>
            <option value="Beginners">Beginners</option>
            <option value="Advanced">Advanced</option>
          </select>
        </Field>
        <Field label="Preferred Day / Time">
          <input
            {...register("preferred_day_time")}
            className={inputClass}
            placeholder="e.g. Weekday evening"
          />
        </Field>
      </div>

      <Field label="Previous Martial Arts Experience">
        <textarea
          {...register("previous_experience")}
          className={cn(inputClass, "min-h-[80px] resize-y")}
          placeholder="Optional"
        />
      </Field>

      <Field label="Message">
        <textarea
          {...register("message")}
          className={cn(inputClass, "min-h-[100px] resize-y")}
          placeholder="Any questions or notes"
        />
      </Field>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          {...register("consent")}
          className="mt-1 h-4 w-4 accent-gold"
        />
        <span className="text-sm text-muted">
          I consent to Team J Academy contacting me regarding trial classes and
          academy information. *
        </span>
      </label>
      {errors.consent && (
        <p className="text-earth-red text-sm">{errors.consent.message}</p>
      )}

      {status === "error" && (
        <p className="text-earth-red text-sm">{errorMsg}</p>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full sm:w-auto"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Submitting..." : "Book Trial Class"}
      </Button>
    </form>
  );
}

const inputClass =
  "w-full rounded-md border border-border bg-charcoal-light px-4 py-2.5 text-off-white placeholder:text-muted/60 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm text-muted mb-1.5">{label}</label>
      {children}
      {error && <p className="mt-1 text-earth-red text-sm">{error}</p>}
    </div>
  );
}

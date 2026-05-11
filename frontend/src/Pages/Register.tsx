import { useForm } from "react-hook-form";
import { registerSchema, type RegisterData } from "../schemas/RegisterSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../components/ui/FormInput";
import Button from "../components/ui/Button";
import { genericSubmitHandler } from "../lib/formSubmitHandler";
import { useState } from "react";

function passwordStrength(password: string): number {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[(){}[\]_?<>!@#$%^&*+=;:"'\\|`~.]/.test(password)) score++;
  return score;
}

const levels: Record<number, { strength: string; color: string }> = {
  0: { strength: "none", color: "bg-gray-500" },
  1: { strength: "poor", color: "bg-red-500" },
  2: { strength: "fair", color: "bg-orange-500" },
  3: { strength: "good", color: "bg-yellow-500" },
  4: { strength: "excellent", color: "bg-green-500" },
};

const StrengthBar = ({ score }: { score: number }) => (
  <div className="flex gap-1 w-full mb-2">
    {[1, 2, 3, 4].map((level) => (
      <div
        key={level}
        className={`h-2 flex-1 rounded ${
          score >= level ? levels[score].color : "bg-gray-500"
        }`}
      ></div>
    ))}
  </div>
);

const RegisterPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<RegisterData>({
    mode: "onSubmit",
    resolver: zodResolver(registerSchema),
  });

  const password = watch("password") || "";
  const score = passwordStrength(password);

  interface ResponseData {
    id: string;
    name: string;
    email: string;
  }

  async function onsubmitHandler<T>(data: T) {
    await genericSubmitHandler<T, ResponseData>(data, "/auth/register");
  }

  return (
    <div className="flex flex-col border border-border-default rounded-2xl p-10 max-w-md ">
      <div className="flex flex-col justify-center items-center mb-5">
        <p className="logo">
          Task<span>Flow</span>
        </p>
        <h1 className="text-3xl font-medium">Create your account</h1>
        <p className="text-text-secondary">
          Start optimizing your workflow now
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onsubmitHandler)}
        className={"flex flex-col items-center justify-center w-full"}
      >
        <FormInput
          label="UserName"
          required={true}
          error={errors.name?.message}
          type="text"
          placeholder="doeJohn69"
          {...register("name")}
        />
        <FormInput
          label="E-mail"
          error={errors.email?.message}
          type="email"
          placeholder="johndoe123@example.com"
          {...register("email")}
        />
        <FormInput
          label="Password"
          error={errors.password?.message}
          type="password"
          placeholder="type a strong password"
          {...register("password")}
        />
        {/* Strength bar */}
        {password && <StrengthBar score={score} />}
        <FormInput
          label="Confirm Password"
          error={errors.confirmPassword?.message}
          type="password"
          placeholder="confirm password"
          {...register("confirmPassword")}
        />

        <Button variant="primary" label="Submit" type="submit" />
      </form>
    </div>
  );
};
export default RegisterPage;

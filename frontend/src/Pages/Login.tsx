import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../components/ui/FormInput";
import { LoginSchema, type LoginData } from "../schemas/LoginSchema";
import Button from "../components/ui/Button";
import { genericSubmitHandler } from "../lib/formSubmitHandler";
import { axiosInstance } from "../lib/axios";
import type { AxiosError, AxiosResponse } from "axios";
import type { ErrorResponse } from "../shared/types/ErrorResponse";
import toast from "react-hot-toast";
import type { SuccessResponse } from "../shared/types/SuccessResponse";

interface loginResponseData {
  id: string;
  name: string;
  email: string;
  avatar_initials: string;
  created_at: string;
  updated_at: string;
}

const LoginPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginData>({
    mode: "onSubmit",
    resolver: zodResolver(LoginSchema),
  });

  async function onSubmitHandler<T>(data: T) {
    const result = await genericSubmitHandler<T, loginResponseData>(
      data,
      "/auth/login",
    );
    console.log(result);
  }

  return (
    <div className="flex flex-col border border-border-default rounded-2xl p-10 max-w-md ">
      <div className="flex flex-col justify-center items-center mb-5">
        <p className="logo">
          Task<span>Flow</span>
        </p>
        <h1 className="text-3xl font-medium">Welcome Back</h1>
        <p className="text-text-secondary">Sign in to your account</p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="flex flex-col items-center justify-center"
      >
        <FormInput
          label="E-mail"
          error={errors.email?.message}
          type="email"
          placeholder="Enter your e-mail"
          {...register("email")}
        />
        <FormInput
          label="Password"
          error={errors.password?.message}
          type="password"
          placeholder="Enter your password"
          {...register("password")}
        />
        <Button
          className="w-full"
          variant="primary"
          label="Submit"
          type="submit"
        />
      </form>
    </div>
  );
};
export default LoginPage;

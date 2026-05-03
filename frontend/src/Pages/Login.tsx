import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../components/ui/FormInput";
import { LoginSchema, type LoginData } from "../schemas/LoginSchema";
import Button from "../components/ui/Button";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { genericSubmitHandler } from "../lib/formSubmitHandler";

const LoginPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginData>({
    mode: "onSubmit",
    resolver: zodResolver(LoginSchema),
  });

  interface ResponseData {
    id: string;
    name: string;
    email: string;
    avatar_initials: string | null;
  }

  async function onSubmitHandler<T>(data: T) {
    const result = await genericSubmitHandler<T, ResponseData>(
      data,
      "/auth/login",
    );

    return result;
  }

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <FormInput
        label="E-mail"
        error={errors.email?.message}
        type="email"
        {...register("email")}
      />
      <FormInput
        label="Password"
        error={errors.password?.message}
        type="password"
        {...register("password")}
      />
      <Button variant="primary" label="Submit" type="submit" />
    </form>
  );
};
export default LoginPage;

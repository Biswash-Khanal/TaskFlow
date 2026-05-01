import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../components/ui/FormInput";
import { LoginSchema, type LoginData } from "../schemas/LoginSchema";

const LoginPage = () => {
  const {
    register,
    formState: { errors },
  } = useForm<LoginData>({
    mode: "all",
    resolver: zodResolver(LoginSchema),
  });

  return (
    <form>
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
    </form>
  );
};
export default LoginPage;

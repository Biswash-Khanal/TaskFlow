import { useForm } from "react-hook-form";
import { registerSchema, type RegisterData } from "../schemas/RegisterSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../components/ui/FormInput";
import Button from "../components/ui/Button";
import { genericSubmitHandler } from "../lib/formSubmitHandler";

const RegisterPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterData>({
    mode: "onSubmit",
    resolver: zodResolver(registerSchema),
  });

  interface ResponseData {
    id: string;
    name: string;
    email: string;
  }

  async function onsubmitHandler<T>(data: T) {
    await genericSubmitHandler<T, ResponseData>(data, "/auth/register");
  }

  return (
    <form onSubmit={handleSubmit(onsubmitHandler)}>
      <FormInput
        label="UserName"
        required={true}
        error={errors.name?.message}
        type="text"
        {...register("name")}
      />
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
      <FormInput
        label="Confirm Password"
        error={errors.confirmPassword?.message}
        type="password"
        {...register("confirmPassword")}
      />

      <Button variant="danger" label="Submit" type="submit" />
    </form>
  );
};
export default RegisterPage;

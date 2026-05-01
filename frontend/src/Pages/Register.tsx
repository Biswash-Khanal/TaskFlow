import { FormProvider, useForm } from "react-hook-form";
import { registerSchema, type RegisterData } from "../schemas/RegisterSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../components/ui/FormInput";
import Button from "../components/ui/Button";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterData>({
    mode: "onSubmit",
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: RegisterData) {
    try {
      console.log("onsubmit ran!");
      const { name, email, password } = data;
      console.log("onsubmit is running, data recieved:", data);
      const result = await axiosInstance.post("/auth/register", {
        name,
        email,
        password,
      });

      console.log(
        "onsubmit is running, sent data to api, api response =:",
        result,
      );
      // Axios wraps server response in result.data
      if (result.data.success) {
        toast.success("Registered Successfully!");
      } else {
        toast.error(result.data.message || "Registration failed");
      }

      console.log("onsubmit try block end");
    } catch (error: any) {
      if (error.response) {
        // Express sent back a 4xx/5xx
        toast.error(error.response.data.message || "Server error");
      } else if (error.request) {
        // No response received (timeout, network error)
        toast.error("No response from server");
      } else {
        // Something else went wrong
        toast.error(error.message);
      }
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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

import { forgotPasswordSchema } from "@/schema/auth";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";

import * as z from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";
import { useForgotPasswordMutation } from "@/store/slices/userApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { useEffect } from "react";

type formInputs = z.infer<typeof forgotPasswordSchema>;

function ForgotPassword() {
  const [forgotPasswordMutation, { isLoading }] = useForgotPasswordMutation();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const navigate = useNavigate();

  const form = useForm<formInputs>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<formInputs> = async (data) => {
    try {
      await forgotPasswordMutation(data).unwrap();
      form.reset();
      toast.success("Email sent successfully.");
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  useEffect(() => {
    if (userInfo) navigate("/");
  }, [navigate, userInfo]);

  return (
    /* Center the container vertically and horizontally */
    <div className="min-h-[80vh] flex flex-col justify-center items-center px-6">
      <div className="w-full max-w-[450px]">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-3xl font-bold italic">
              <Link to="/" className="hover:opacity-80 transition-opacity">
                SHOPNEST
              </Link>
            </CardTitle>
            <CardDescription className="text-center">
              Enter your email to get password reset mail
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="example@gmail.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full cursor-pointer"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Forgot Password"}
                </Button>
              </form>
            </Form>
            <p className="text-xs text-center font-medium mt-4">
              Back to
              <Link
                to={"/login"}
                className="underline ps-1 hover:text-primary transition-colors"
              >
                Login
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ForgotPassword;

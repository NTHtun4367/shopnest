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
import { useNavigate } from "react-router";
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
      toast.success("Email send.");
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  useEffect(() => {
    if (userInfo) navigate("/");
  }, [navigate, userInfo]);

  return (
    <div className="max-w-[450px] lg:mx-auto mx-6 my-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">SHOPNEST</CardTitle>
          <CardDescription className="text-center">
            Enter your email to get password reset mail
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
              <Button type="submit" className="w-full" disabled={isLoading}>
                Forgot Password
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default ForgotPassword;

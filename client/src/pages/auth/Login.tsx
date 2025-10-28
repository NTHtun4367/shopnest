import { loginSchema } from "@/schema/auth";
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
import { useLoginMutation } from "@/store/slices/userApi";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "@/store/slices/auth";
import type { RootState } from "@/store";
import { useEffect } from "react";

type formInputs = z.infer<typeof loginSchema>;

function Login() {
  const [loginMutation, { isLoading }] = useLoginMutation();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const form = useForm<formInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<formInputs> = async (data) => {
    try {
      const response = await loginMutation(data).unwrap();
      dispatch(setUserInfo(response));
      form.reset();
      toast.success("Login successful.");
      navigate("/");
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
            Enter your information to login
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="mb-2">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="******" {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Link to={"/forgot-password"} className="text-xs font-medium underline">Forgot password?</Link>
              <Button type="submit" className="w-full mt-2" disabled={isLoading}>
                Login
              </Button>
            </form>
          </Form>
          <p className="text-xs text-center font-medium mt-4">
            Don't have an account?
            <Link to={"/register"} className="underline ps-1">
              Register
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;

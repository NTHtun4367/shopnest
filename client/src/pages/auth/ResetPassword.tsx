import { resetPasswordSchema } from "@/schema/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import * as z from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate, useParams } from "react-router";
import {
  useLogoutMutation,
  useResetPasswordMutation,
} from "@/store/slices/userApi";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { clearUserInfo } from "@/store/slices/auth";

type formInputs = z.infer<typeof resetPasswordSchema>;

function ResetPassword() {
  const [resetPasswordMutation, { isLoading }] = useResetPasswordMutation();
  const [logoutMutation] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const form = useForm<formInputs>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<formInputs> = async (data) => {
    try {
      const response = await resetPasswordMutation({
        newPassword: data.newPassword,
        token: params.id!,
      }).unwrap();
      await logoutMutation({});
      dispatch(clearUserInfo());
      form.reset();
      toast.success(response.message);
      navigate("/");
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  return (
    /* Center the container vertically and horizontally */
    <div className="min-h-[80vh] flex flex-col justify-center items-center px-6">
      <div className="w-full max-w-[450px]">
        <Card>
          <CardHeader>
            {/* Consistent Brand Title with Link */}
            <CardTitle className="text-center text-3xl font-bold italic">
              <Link to="/" className="hover:opacity-80 transition-opacity">
                SHOPNEST
              </Link>
            </CardTitle>
            <CardDescription className="text-center">
              Please enter your new password below
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
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="******"
                          {...field}
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="******"
                          {...field}
                          type="password"
                        />
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
                  {isLoading ? "Resetting..." : "Change Password"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ResetPassword;

import { useForm, type SubmitHandler } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import z from "zod";
import { passwordUpdateSchema } from "@/schema/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { usePasswordUpdateMutation } from "@/store/slices/userApi";

type formInputs = z.infer<typeof passwordUpdateSchema>;

function PasswordUpdateForm() {
  const form = useForm<formInputs>({
    resolver: zodResolver(passwordUpdateSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const watchedNewPassword = form.watch("newPassword");
  const watchedConfirmPassword = form.watch("confirmPassword");

  const [passwordUpdateMutation, { isLoading }] = usePasswordUpdateMutation();

  const onSubmit: SubmitHandler<formInputs> = async (data) => {
    try {
      const response = await passwordUpdateMutation({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      }).unwrap();
      form.reset();
      toast.success(response.message);
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Password</CardTitle>
        <CardDescription>You can update your password here.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Old Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
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
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={
                watchedNewPassword !== watchedConfirmPassword || isLoading
              }
            >
              Update
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default PasswordUpdateForm;

import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "../ui/button";
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
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import type z from "zod";
import { emailUpdateSchema } from "@/schema/user";
import { useEmailUpdateMutation } from "@/store/slices/userApi";
import { toast } from "sonner";
import { useEffect } from "react";

interface EmailUpdateFormProps {
  email: string;
}

type formInput = z.infer<typeof emailUpdateSchema>;

function EmailUpdateForm({ email }: EmailUpdateFormProps) {
  const form = useForm<formInput>({
    resolver: zodResolver(emailUpdateSchema),
    defaultValues: {
      email,
    },
  });

  const watchedEmail = form.watch("email");

  const [emailUpdateMutation, { isLoading }] = useEmailUpdateMutation();

  const onSubmit: SubmitHandler<formInput> = async (data) => {
    try {
      const response = await emailUpdateMutation(data).unwrap();
      toast.success(response.message);
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  useEffect(() => {
    form.reset({ email });
  }, [email]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Email Address</CardTitle>
        <CardDescription>
          You can view and update your email address here.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="mt-2"
              disabled={email === watchedEmail || isLoading}
            >
              Update
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default EmailUpdateForm;

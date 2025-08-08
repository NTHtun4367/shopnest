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
import { nameUpdateSchema } from "@/schema/user";
import { useNameUpdateMutation } from "@/store/slices/userApi";
import { toast } from "sonner";
import { useEffect } from "react";

interface NameUpdatFormProps {
  name: string;
}

type formInput = z.infer<typeof nameUpdateSchema>;

function NameUpdatForm({ name }: NameUpdatFormProps) {
  const form = useForm<formInput>({
    resolver: zodResolver(nameUpdateSchema),
    defaultValues: {
      name,
    },
  });

  const watchedName = form.watch("name");

  const [nameUpdateMutation, { isLoading }] = useNameUpdateMutation();

  const onSubmit: SubmitHandler<formInput> = async (data) => {
    try {
      const response = await nameUpdateMutation(data).unwrap();
      toast.success(response.message);
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  useEffect(() => {
    form.reset({ name });
  }, [name]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Name</CardTitle>
        <CardDescription>
          You can view and update your name here.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
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
              disabled={name === watchedName || isLoading}
            >
              Update
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default NameUpdatForm;

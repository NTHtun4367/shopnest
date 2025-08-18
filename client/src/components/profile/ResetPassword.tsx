import { useForgotPasswordMutation } from "@/store/slices/userApi";
import { Button } from "../ui/button";
import { toast } from "sonner";

interface ResetPasswordProps {
  email: string;
}

function ResetPasswordForm({ email }: ResetPasswordProps) {
  const [forgotPasswordMutation, { isLoading }] = useForgotPasswordMutation();

  const changePasswordHandler = async () => {
    try {
      const response = await forgotPasswordMutation({
        email,
      }).unwrap();
      toast.success(response.message);
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <Button
      onClick={changePasswordHandler}
      disabled={isLoading}
      className="w-full mt-4 cursor-pointer"
    >
      Change Password
    </Button>
  );
}

export default ResetPasswordForm;

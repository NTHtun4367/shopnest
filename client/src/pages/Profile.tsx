import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  useCurrentUserQuery,
  useUploadAvatarMutation,
} from "@/store/slices/userApi";
import { useRef, useState } from "react";
import { toast } from "sonner";

function Profile() {
  const { data: userInfo, refetch } = useCurrentUserQuery();
  const [uploadAvatarMutation, { isLoading }] = useUploadAvatarMutation();
  const [avatar, setAvatar] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const imageOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result as string);
      }
    };

    reader.readAsDataURL(e.target.files![0]);
  };

  const avatarUploadHandler = async () => {
    if (!avatar) {
      toast.warning("Please select your avatar first.");
      return;
    }
    try {
      await uploadAvatarMutation({ image_url: avatar });
      setAvatar(null);

      if (inputRef.current) {
        inputRef.current.value = "";
      }

      refetch();
      toast.success("Avatar uploaded.");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>
          You can upload own avatar and edit your information.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-1/2">
          <Card>
            <CardContent>
              <div className="w-full flex gap-4">
                <div className="w-1/2 flex flex-col items-center">
                  <Avatar className="w-22 h-22">
                    <AvatarImage
                      src={avatar ?? userInfo?.avatar[0]?.url ?? ""}
                    />
                    {!userInfo?.avatar[0]?.url && (
                      <AvatarFallback>
                        {userInfo?.username?.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <Input
                    className="my-4"
                    type="file"
                    accept="images/*"
                    onChange={imageOnChangeHandler}
                    ref={inputRef}
                  />
                </div>
                <div className="w-1/2 space-y-3">
                  <h2 className="text-xl font-bold">Your Info</h2>
                  <p className="font-medium text-sm">
                    Username -{" "}
                    <span className="font-semibold">{userInfo?.username}</span>
                  </p>
                  <p className="font-medium text-sm">
                    Email -{" "}
                    <span className="font-semibold">{userInfo?.email}</span>
                  </p>
                  <Button
                    onClick={avatarUploadHandler}
                    disabled={isLoading || !avatar}
                  >
                    Upload
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}

export default Profile;

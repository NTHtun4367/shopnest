import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import EmailUpdateForm from "@/components/profile/EmailUpdateForm";
import Loader from "@/components/Loader";
import NameUpdatForm from "@/components/profile/NameUpdateForm";

import { useCurrentUserQuery } from "@/store/slices/userApi";
import AvatarUploadForm from "@/components/profile/AvatarUploadForm";

function Profile() {
  const { data: userInfo, isLoading } = useCurrentUserQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>
              You can upload own avatar and edit your information.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full">
              <AvatarUploadForm />
            </div>
            <div className="w-full flex gap-4 mt-4">
              <EmailUpdateForm email={userInfo?.email!} />
              <NameUpdatForm name={userInfo?.name!} />
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}

export default Profile;

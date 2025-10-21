import type { RootState } from "@/store";
import { useCurrentUserQuery } from "@/store/slices/userApi";
import type React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function IsAdmin({ children }: { children: React.ReactNode }) {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const navigate = useNavigate();
  const { data: user, isError, isLoading } = useCurrentUserQuery();

  useEffect(() => {
    if (isLoading) return;
    if (!userInfo || isError || user?.role !== "admin") navigate("/");
  }, [userInfo, isError, user, navigate]);

  return <>{children}</>;
}

export default IsAdmin;

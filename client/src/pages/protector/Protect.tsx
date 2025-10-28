import type { RootState } from "@/store";
import { clearUserInfo } from "@/store/slices/auth";
import { useCurrentUserQuery } from "@/store/slices/userApi";
import type React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

function Protect({ children }: { children: React.ReactNode }) {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const navigate = useNavigate();
  const { isError } = useCurrentUserQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo || isError) {
      navigate("/");
      dispatch(clearUserInfo());
    }
  }, [userInfo, isError]);

  return <>{children}</>;
}

export default Protect;

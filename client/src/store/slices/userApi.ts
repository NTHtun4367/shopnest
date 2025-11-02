import type { User } from "@/types/user";
import { apiSlice } from "./api";

interface loginInput {
  email: string;
  password: string;
}

interface registerInput extends loginInput {
  name: string;
}

interface avatarUploadInput {
  image_url: string;
}

interface emailUpdateInput {
  email: string;
}

interface nameUpdateInput {
  name: string;
}

interface passwordUpdateInputs {
  oldPassword: string;
  newPassword: string;
}

interface forgotPasswordInput {
  email: string;
}

interface resetPasswordInputs {
  token: string;
  newPassword: string;
}

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data: registerInput) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    login: builder.mutation({
      query: (data: loginInput) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
    currentUser: builder.query<User, void>({
      query: () => ({
        url: "/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    uploadAvatar: builder.mutation({
      query: (data: avatarUploadInput) => ({
        url: "/upload",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    emailUpdate: builder.mutation({
      query: (data: emailUpdateInput) => ({
        url: "/update-email",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    nameUpdate: builder.mutation({
      query: (data: nameUpdateInput) => ({
        url: "/update-name",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    passwordUpdate: builder.mutation({
      query: (data: passwordUpdateInputs) => ({
        url: "/update-password",
        method: "POST",
        body: data,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data: forgotPasswordInput) => ({
        url: "/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data: resetPasswordInputs) => ({
        url: `/reset-password/${data.token}`,
        method: "POST",
        body: {
          newPassword: data.newPassword,
        },
      }),
    }),
    getAllUsers: builder.query<User[], undefined>({
      query: () => "/users/all",
      providesTags: ["User"],
    }),
    changeUserStatus: builder.mutation({
      query: ({ userId, status }) => ({
        url: `/users/${userId}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useCurrentUserQuery,
  useUploadAvatarMutation,
  useEmailUpdateMutation,
  useNameUpdateMutation,
  usePasswordUpdateMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetAllUsersQuery,
  useChangeUserStatusMutation,
} = userApiSlice;

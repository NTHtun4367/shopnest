export interface User {
  name: string;
  email: string;
  role: "customer" | "admin";
  avatar: [
    {
      url: string;
      public_alt: string;
    }
  ];
}

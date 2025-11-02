export interface User {
  _id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
  status: "active" | "ban";
  avatar: [
    {
      url: string;
      public_alt: string;
    }
  ];
}

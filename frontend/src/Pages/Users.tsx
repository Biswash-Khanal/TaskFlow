import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../lib/axios";

interface Users {
  id: string;
  name: string;
  avatar_initials: string;
  email: string;
  created_at: Date;
}

const UsersPage = () => {
  const { isPending, isError, error, data } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axiosInstance.get("/users");
      console.log(response);
      return response.data.data as Users[];
    },
  });

  if (isError) {
    console.error(error);
  }

  if (isPending || isError) {
    return <div>Loading....</div>;
  }

  return (
    <>
      <h1>Users</h1>
      <ul>
        {data.map((user: Users) => (
          <li
            key={user.id}
          >{`id:${user.id}  name:${user.name}  email:${user.email}  avatar_initials:${user.avatar_initials}  created_at:${user.created_at}`}</li>
        ))}
      </ul>
    </>
  );
};
export default UsersPage;

import dynamic from "next/dynamic";
import Login from "../../components/login/Login"

export const metadata = {
  title: "login || Chat Bot Help",
  description: "Chat Bot Help",
};

const index = () => {
  return (
    <>
      <Login />
    </>
  );
};
export default dynamic(() => Promise.resolve(index));

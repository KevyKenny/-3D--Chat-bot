import dynamic from "next/dynamic";
import RegisterUserDetails from "../../components/Register-user-details/RegisterUserDetails"

export const metadata = {
  title: "register to Chat Bot Help",
  description: "Chat Bot Help",
};

const index = () => {
  return (
    <>
      <RegisterUserDetails />
    </>
  );
};
export default dynamic(() => Promise.resolve(index));

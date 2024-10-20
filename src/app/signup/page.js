import dynamic from "next/dynamic";
import SignUp from "../../components/SignUp/SignUp"

export const metadata = {
  title: "SignUp || Chat Bot Help",
  description: "Chat Bot Help",
};

const index = () => {
  return (
    <>
      <SignUp />
    </>
  );
};
export default dynamic(() => Promise.resolve(index));

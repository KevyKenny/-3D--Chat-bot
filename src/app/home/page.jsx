import dynamic from "next/dynamic";
import Home from "../../components/home"

export const metadata = {
  title: "home || Chat Bot Help",
  description: "Chat Bot Help",
};

const index = () => {
  return (
    <>
      <Home />
    </>
  );
};
export default dynamic(() => Promise.resolve(index));
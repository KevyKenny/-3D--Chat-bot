import dynamic from "next/dynamic";
import TrainModel from "../../components/train-model";

export const metadata = {
  title: "train-model",
  description: "Chat Bot Help",
};

const index = () => {
  return (
    <>
      <TrainModel />
    </>
  );
};
export default dynamic(() => Promise.resolve(index));

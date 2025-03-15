import Lottie from "react-lottie";
import animationData from "../../../assets/loader.json";

export const Loader = () => {
  return (
    <div>
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: animationData,
          rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
          },
        }}
        height={32}
        width={32}
        isStopped={false}
        isPaused={false}
      />
    </div>
  );
};

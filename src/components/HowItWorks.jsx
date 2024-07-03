import { useGSAP } from "@gsap/react";
import { chipImg, frameImg, frameVideo } from "../utils";
import gsap from "gsap";
import { useRef } from "react";
import { animateWithGsap } from "../utils/animations";

const HowItWorks = () => {
  const videoRef = useRef();

  useGSAP(() => {
    gsap.from("#chip", {
      scrollTrigger: {
        trigger: "#chip",
        start: "10% bottom",
      },
      opacity: 0,
      scale: 2,
      ease: "power2.inOut",
      duration: 2,
    }),
      animateWithGsap(".g_fadeIn", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.inOut",
      });
  }, []);

  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <div className="flex-center my-20 w-full" id="chip">
          <img src={chipImg} alt="chipImg" width={180} height={180} />
        </div>

        <div className="flex flex-col items-center">
          <h2 className="hiw-title">
            A17 Pro Chip.
            <br />A monster win for gaming.
          </h2>
          <p className="hiw-subtitle">
            It&apos;s here. The biggest design in history of Apple GPUs.
          </p>
        </div>

        <div className="mt-10 md:mt-20 mb-14">
          <div className="relative h-full flex-center">
            <div className="overflow-hidden">
              <img
                src={frameImg}
                alt="frameImg"
                className="bg-transparent relative z-20"
              />
            </div>
            <div className="hiw-video">
              <video
                className="pointer-events-none"
                playsInline
                muted
                autoPlay
                preload="none"
                ref={videoRef}
              >
                <source src={frameVideo} type="video/mp4" />
              </video>
            </div>
          </div>

          <p className="text-gray text-center font-semibold mt-3">
            Honkai: Star Rail
          </p>

          <div className="hiw-text-container mt-10">
            <div className="flex flex-col justify-center flex-1 gap-5">
              <p className="hiw-text g_fadeIn">
                A17 Pro is an entirely new class of iPhone chip that delivers
                our{" "}
                <span className="text-white">
                  best graphics performance by far.
                </span>
              </p>

              <p className="hiw-text g_fadeIn">
                Mobiles{" "}
                <span className="text-white">
                  games will look and feel so immersive
                </span>
                with incredibly detailed environments and characters.
              </p>
            </div>

            <div className="flex flex-col justify-center flex-1 g_fadeIn">
              <p className="hiw-text">New</p>
              <p className="hiw-bigtext">Pro-class GPU</p>
              <p className="hiw-text">with 6 cores</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

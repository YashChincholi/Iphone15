import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { rightImg, watchImg } from "../utils";
import VideoCarousel from "./VideoCarousel";

const Highlights = () => {
  useGSAP(() => {
    gsap.to("#title", { opacity: 1, y: 0 }),
      gsap.to(".link", { opacity: 1, y: 0, duration: 1, stagger: 0.25 });
  }, []);

  return (
    <section
      id="highlights"
      className="w-screen h-full bg-zinc overflow-hidden common-padding"
    >
      <div className="screen-max-width">
        <div className="mb-12 md:flex items-end justify-between w-full">
          <h1 className="section-heading" id="title">
            Get the highlihgts.
          </h1>
          <div className="flex flex-wrap items-end gap-6">
            <p className="link">
              Watch the film
              <img src={watchImg} alt="watch" className="pl-2" />
            </p>
            <p className="link">
              Watch the event
              <img src={rightImg} alt="right" className="pl-2" />
            </p>
          </div>
        </div>
        <VideoCarousel />
      </div>
    </section>
  );
};

export default Highlights;

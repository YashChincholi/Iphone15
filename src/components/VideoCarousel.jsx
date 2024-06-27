import { useEffect, useRef, useState } from "react";
import { hightlightsSlides } from "../constants";
import gsap from "gsap";
import { pauseImg, playImg, replayImg } from "../utils";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

const VideoCarousel = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video;
  const [loadedData, setLoadedData] = useState([]);

  useGSAP(() => {
    gsap.to("#slider", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: "power2.inOut",
    }),
      gsap.to("#video", {
        scrollTrigger: {
          trigger: "#video",
          toggleActions: "restart none none none",
        },
        onComplete: () => {
          setVideo((prev) => ({
            ...prev,
            isPlaying: true,
            startPlay: true,
          }));
        },
      });
  }, [videoId, isEnd]);

  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        startPlay && videoRef.current[videoId].play();
      }
    }
  }, [loadedData, startPlay, isPlaying, videoId]);

  const handelLoadedMetaData = (e) => setLoadedData((prev) => [...prev, e]);

  useEffect(() => {
    let currentProgress = 0;
    const span = videoSpanRef.current;

    //   animate the progress bar
    let anim = gsap.to(span[videoId], {
      onUpdate: () => {
        const progress = Math.ceil(anim.progress() * 100);
        if (progress != currentProgress) {
          currentProgress = progress;

          gsap.to(videoDivRef.current[videoId], {
            width:
              window.innerWidth < 760
                ? "10vw"
                : window.innerWidth < 1200
                ? "10vw"
                : "4vw",
          }),
            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: "white",
            });
        }
      },
      onComplete: () => {
        if (isPlaying) {
          gsap.to(videoDivRef.current[videoId], {
            width: "12px",
          }),
            gsap.to(span[videoId], {
              background: "#afafaf",
            });
        }
      },
    });

    if (videoId === 0) anim.restart();

    const animUpdate = () => {
      anim.progress(
        videoRef.current[videoId].currentTime /
          hightlightsSlides[videoId].videoDuration
      );
    };

    if (isPlaying) gsap.ticker.add(animUpdate);
    else gsap.ticker.remove(animUpdate);
  }, [startPlay, videoId, isPlaying]);
  const handelProcess = (type, i) => {
    switch (type) {
      case "video-end":
        setVideo((prev) => ({ ...prev, isEnd: true, videoId: i + 1 }));
        break;

      case "video-last":
        setVideo((prev) => ({ ...prev, isLastVideo: true }));
        break;
      case "video-reset":
        setVideo((prev) => ({ ...prev, isLastVideo: false, videoId: 0 }));
        break;
      case "play":
        setVideo((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
        break;
      case "pause":
        setVideo((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
        break;

      default:
        return video;
    }
  };

  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((list, i) => (
          <div key={list.id} id="slider" className="pr-10 sm:pr-20">
            <div className="video-carousel_container">
              <div className="w-full h-full bg-black rounded-3xl overflow-hidden flex-center">
                <video
                  id="video"
                  playsInline={true}
                  muted
                  className={`${
                    list.id === 3 && "translate-x-44"
                  } pointer-events-none`}
                  preload="true"
                  ref={(element) => (videoRef.current[i] = element)}
                  onEnded={() =>
                    i !== 3
                      ? handelProcess("video-end", i)
                      : handelProcess("video-last")
                  }
                  onClick={() => {
                    setVideo((prevVideo) => ({
                      ...prevVideo,
                      isPlaying: true,
                    }));
                  }}
                  onLoadedMetadata={(e) => handelLoadedMetaData(e)}
                >
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>
              <div className="absolute top-12 left-[5%] z-10">
                {list.textLists.map((text) => (
                  <p className="md:text-2xl text-xl font-medium" key={text}>
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="relative flex-center mt-10">
        <div className="py-5 px-7 bg-gray-300 rounded-full flex-center backdrop-blur">
          {videoRef.current.map((_, i) => (
            <span
              className="h-3 w-3 bg-gray-200 relative mx-2 rounded-full cursor-pointer"
              key={i}
              ref={(element) => (videoDivRef.current[i] = element)}
            >
              <span
                className="absolute h-full w-full rounded-full"
                ref={(element) => (videoSpanRef.current[i] = element)}
              />
            </span>
          ))}
        </div>
        <button className="control-btn">
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
            onClick={
              isLastVideo
                ? () => handelProcess("video-reset")
                : !isPlaying
                ? () => handelProcess("play")
                : () => handelProcess("pause")
            }
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;

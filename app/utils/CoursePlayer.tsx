import React, { FC, useEffect, useRef, useState } from "react";
import axios from "axios";

type Props = {
  videoUrl: string;
  title: string;
};

const CoursePlayer: FC<Props> = ({ videoUrl }) => {
  const [videoData, setVideoData] = useState({
    otp: "",
    playbackInfo: "",
  });

  useEffect(() => {
    axios
      // .post("https://LMS-lms-7728bbd846c2.herokuapp.com/api/v1/getVdoCipherOTP", {
      .post(`${process.env.NEXT_PUBLIC_SERVER_URI}getVdoCipherOTP`, {
        videoId: videoUrl,
      })
      .then((res) => {
        setVideoData(res.data);
        // console.log("API Response:", res.data);
      });
  }, [videoUrl]);

  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe: any = iframeRef.current;

    const iframDocument = iframe?.contentDocument;

    const video = iframDocument?.getElementsByTagName("Video")[0];

    if (video) {
      video.addEventListener("timeupdate", () => {
        // Get the current time of the video
        const currentTime = video.currentTime;
        console.log(
          "Current Playing Time: " + currentTime.toFixed(2) + " seconds"
        );
      });
    }

    // Cleanup function to remove the event listener when the component is unmounted
    return () => {
      if (video) {
        video.removeEventListener("timeupdate", () => {});
      }
    };
  }, []);

  return (
    <div
      style={{ position: "relative", paddingTop: "56.25%", overflow: "hidden" }}
    >
      {videoData.otp && videoData.playbackInfo !== "" && (
        <iframe
          ref={iframeRef}
          id="myIframe"
          src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData.playbackInfo}&player=${process.env.NEXT_PUBLIC_PLAYER_ID}`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: 0,
          }}
          allowFullScreen={true}
          allow="encrypted-media"
        ></iframe>
      )}
    </div>
  );
};

export default CoursePlayer;

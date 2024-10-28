"use client";

import React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import ReactAudioPlayer from "react-audio-player";
import "./podcast.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPause,
  faPlay,
  faRotateBack,
  faRotateForward,
  faVolumeHigh,
} from "@fortawesome/free-solid-svg-icons";

const PodcastPlayer = () => {
  const [episodes, setEpisodes] = useState([]);
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isVolumeVisible, setIsVolumeVisible] = useState(false);
  const [volume, setVolume] = useState(1);
  const [lastPlayTime, setLastPlayTime] = useState(0);
  const [hasSent60SecEvent, setHasSent60SecEvent] = useState(false);
  const [hasSentCompleteEvent, setHasSentCompleteEvent] = useState(false);

  const audioRef = useRef(null);
  const backendUrl = process.env.NEXT_PUBLIC_PODCAST_API;

  useEffect(() => {
    if ("mediaSession" in navigator && currentEpisode) {
      const metadata = {
        title: currentEpisode.title || "Episodio desconocido",
        artist: "Café Creativo",
        album: "Café Creativo",
      };

      if (currentEpisode.imageUrl) {
        metadata.artwork = [
          {
            src: currentEpisode.imageUrl,
            sizes: "512x512",
            type: "image/jpeg",
          },
        ];
      }

      navigator.mediaSession.metadata = new MediaMetadata(metadata);

      navigator.mediaSession.setActionHandler("play", () => {
        audioRef.current?.audioEl.current?.play();
        setIsPlaying(true);
      });

      navigator.mediaSession.setActionHandler("pause", () => {
        audioRef.current?.audioEl.current?.pause();
        setIsPlaying(false);
      });

      navigator.mediaSession.setActionHandler("seekbackward", () => {
        handleSkip(-15);
      });

      navigator.mediaSession.setActionHandler("seekforward", () => {
        handleSkip(30);
      });
    }
  }, [currentEpisode]);

  const handleTimeUpdate = useCallback(() => {
    const current = audioRef.current?.audioEl.current.currentTime;
    setCurrentTime(current);

    if (!hasSent60SecEvent && current >= 60) {
      send60SecondListenEvent();
      setHasSent60SecEvent(true);
    }

    if (!hasSentCompleteEvent && current / duration >= 0.8) {
      sendCompleteListenEvent();
      setHasSentCompleteEvent(true);
    }
  }, [hasSent60SecEvent, hasSentCompleteEvent, duration]);

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.audioEl.current.duration);
  };

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await fetch(backendUrl);
        const episodesData = await response.json();

        // Mapeamos los datos correctamente para extraer audioUrl e imageUrl
        const episodes = episodesData.map((item) => ({
          title: item.title,
          audioUrl: item.enclosure.url,
          imageUrl:
            item.itunes?.image ||
            "https://d3t3ozftmdmh3i.cloudfront.net/staging/podcast_uploaded_nologo/1636506/1636506-1713733779208-14b89918f43a.jpg",
        }));

        setEpisodes(episodes);
        setCurrentEpisode(episodes[0]);
      } catch (error) {
        console.error("Error fetching podcast episodes:", error);
      }
    };

    fetchEpisodes();
  }, [backendUrl]);

  useEffect(() => {
    const audioElement = audioRef.current?.audioEl.current;

    if (audioElement) {
      audioElement.addEventListener("timeupdate", handleTimeUpdate);
      audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener("timeupdate", handleTimeUpdate);
        audioElement.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
      }
    };
  }, [currentEpisode, handleTimeUpdate]);

  const handleEpisodeClick = (episode) => {
    setCurrentEpisode(episode);
    setIsPlaying(false);
    setHasSent60SecEvent(false);
    setHasSentCompleteEvent(false);
  };

  const handleSkip = (seconds) => {
    if (audioRef.current) {
      audioRef.current.audioEl.current.currentTime += seconds;
    }
  };

  const togglePlayPause = () => {
    const now = Date.now();
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.audioEl.current.pause();
      } else {
        audioRef.current.audioEl.current.play();
        if (now - lastPlayTime >= 3600000) {
          setHasSent60SecEvent(false);
        }
      }
      setIsPlaying(!isPlaying);
      setLastPlayTime(now);
    }
  };

  const cyclePlaybackRate = () => {
    const rates = [0.5, 1, 1.5, 2];
    const currentRateIndex = rates.indexOf(playbackRate);
    const nextRate = rates[(currentRateIndex + 1) % rates.length];
    setPlaybackRate(nextRate);
    if (audioRef.current) {
      audioRef.current.audioEl.current.playbackRate = nextRate;
    }
  };

  const handleVolumeChange = (e) => {
    const volumeValue = e.target.value;
    setVolume(volumeValue);
    if (audioRef.current) {
      audioRef.current.audioEl.current.volume = volumeValue;
    }
  };

  const toggleVolumeVisibility = () => {
    setIsVolumeVisible(!isVolumeVisible);
  };

  const send60SecondListenEvent = () => {
    if (window.gtag) {
      window.gtag("event", "listen_60_seconds", {
        event_category: "Podcast",
        event_label: currentEpisode?.title,
        value: 60,
      });
    }
  };

  const sendCompleteListenEvent = () => {
    if (window.gtag) {
      window.gtag("event", "complete_listen", {
        event_category: "Podcast",
        event_label: currentEpisode?.title,
        value: 80,
      });
    }
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h > 0 ? h + ":" : ""}${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 w-full">
      {/* Columna 1: Reproductor */}
      <section className="col-span-1 md:col-span-3 p-4 md:p-8 border-b md:border-b-0 md:border-r">
        {currentEpisode && (
          <div className="flex flex-col items-center">
            {/* Episode Cover */}
            <Image
              src={currentEpisode.imageUrl}
              alt={currentEpisode.title}
              width={512}
              height={512}
              className="w-48 h-48 object-cover mb-8 border border-black md:w-96 md:h-96"
            />
            {/* Episode Title */}
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
              {currentEpisode.title}
            </h2>
            {/* Progress and Time */}
            <div className="w-64 mb-6 md:w-96">
              <div className="flex items-center justify-between">
                <span className="text-xs md:text-base">
                  {formatTime(currentTime)}
                </span>
                <input
                  type="range"
                  className="w-full mx-4 accent-black"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={(e) =>
                    (audioRef.current.audioEl.current.currentTime =
                      e.target.value)
                  }
                />
                <span className="text-xs md:text-base">
                  {formatTime(duration)}
                </span>
              </div>
              {/* ReactAudioPlayer (hidden) */}
              <div style={{ display: "none" }}>
                <ReactAudioPlayer
                  ref={audioRef}
                  src={currentEpisode.audioUrl}
                  autoPlay={isPlaying}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onLoadedMetadata={(e) => setDuration(e.target.duration)}
                  onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
                  onEnded={() => {
                    setIsPlaying(false);
                    setCurrentTime(0);
                  }}
                  volume={volume}
                  playbackRate={playbackRate}
                />
              </div>
            </div>
            {/* Control Buttons */}
            <div className="flex justify-around w-64 text-2xl md:w-96">
              {/* Speed Control */}
              <button
                onClick={cyclePlaybackRate}
                className="w-8 text-base text-center"
              >
                {playbackRate}x
              </button>
              {/* Backward 15s */}
              <button onClick={() => handleSkip(-15)}>
                <FontAwesomeIcon
                  icon={faRotateBack}
                  className="w-6 h-6 align-middle"
                />
              </button>
              {/* Play-Pause */}
              <button
                onClick={togglePlayPause}
                className="bg-black text-yellow px-4 py-3.5 rounded-full"
              >
                {isPlaying ? (
                  <FontAwesomeIcon
                    icon={faPause}
                    className="w-7 h-7 align-middle"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faPlay}
                    className="w-7 h-7 align-middle"
                  />
                )}
              </button>
              {/* Forward 30s */}
              <button onClick={() => handleSkip(30)}>
                <FontAwesomeIcon
                  icon={faRotateForward}
                  className="w-6 h-6 align-middle"
                />
              </button>
              {/* Volume Control */}
              <div className="relative flex items-center">
                <button onClick={toggleVolumeVisibility}>
                  <FontAwesomeIcon
                    icon={faVolumeHigh}
                    className="w-6 h-6 align-middle"
                  />
                </button>
                {isVolumeVisible && (
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    onChange={handleVolumeChange}
                    defaultValue="1"
                    className="accent-black absolute top-20 -right-1 w-60 h-2 md:left-4 md:transform md:-rotate-90 md:w-20 md:top-7"
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Columna 2: Lista de episodios */}
      <section className="col-span-1 p-4 md:p-8 items-center max-h-96 md:max-h-[756px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        <ul>
          {episodes.map((episode, index) => (
            <li
              key={index}
              className="cursor-pointer mb-4"
              onClick={() => handleEpisodeClick(episode)}
            >
              <div className="flex items-center">
                <Image
                  key={index}
                  src={episode.imageUrl}
                  alt={episode.title}
                  width={360}
                  height={360}
                  className="w-12 h-12 object-cover rounded-full border border-black md:w-16 md:h-16"
                />
                <div className="flex flex-col justify-center">
                  <p className="text-lg font-bold leading-none ml-4 hover:underline">
                    {episode.title}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default PodcastPlayer;

import { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaStop } from "react-icons/fa";

import january from "../data/january";
import shuffleArray from "../utils/shuffleArray";

const initialShuffledJanuary = shuffleArray([...january]);

const Quotes = () => {
  const pageTitle = "Châm ngôn sống";

  useEffect(() => {
    document.title = pageTitle;

    return () => {
      document.title = "Peter";
    };
  }, [pageTitle]);

  const [playingIndex, setPlayingIndex] = useState(null);
  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const audioRef = useRef(null);
  const queueRef = useRef([]);
  const queueIndexRef = useRef(0);

  const playSound = (fileName, index) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    if (playingIndex === index) {
      setPlayingIndex(null);
      return;
    }

    audioRef.current = new Audio(`/assets/audio/january/${fileName}`);
    audioRef.current.onended = () => setPlayingIndex(null);
    audioRef.current.play();
    setPlayingIndex(index);
    setIsPlayingAll(false);
  };

  const playAll = () => {
    const audios = initialShuffledJanuary
      .map((item, index) => ({ ...item, index }))
      .filter((item) => item.audio && item.audio.length > 4);

    if (audios.length === 0) return;

    queueRef.current = audios;
    queueIndexRef.current = 0;
    setIsPlayingAll(true);
    playNextInQueue();
  };

  const stopAll = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setPlayingIndex(null);
    setIsPlayingAll(false);
    setIsPaused(false);
    queueRef.current = [];
    queueIndexRef.current = 0;
  };

  const togglePlayPauseAll = () => {
    if (isPlayingAll && !isPaused) {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPaused(true);
      }
    } else if (isPaused) {
      if (audioRef.current) {
        audioRef.current.play();
        setIsPaused(false);
      }
    } else {
      playAll();
    }
  };

  const playNextInQueue = () => {
    const current = queueRef.current[queueIndexRef.current];
    if (!current) {
      setPlayingIndex(null);
      setIsPlayingAll(false);
      setIsPaused(false);
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const audio = new Audio(`/assets/audio/january/${current.audio}`);
    audioRef.current = audio;
    setPlayingIndex(current.index);
    audio.play();
    setIsPaused(false);

    audio.onended = () => {
      queueIndexRef.current += 1;
      playNextInQueue();
    };
  };

  return (
    <div className="mx-4 px-4 mt-4">
      <h1 className="font-semibold text-lg">Rèn luyện tư duy mỗi ngày</h1>
      <hr className="border-t border-red-500 w-1/3 my-4" />

      <div className="h-20 max-w-xs flex justify-stretch items-center">
        <button
          onClick={togglePlayPauseAll}
          className="mb-2 mr-2 px-4 py-2 rounded-lg border border-blue-500 hover:bg-blue-100"
        >
          {isPlayingAll
            ? isPaused
              ? "▶️ Resume"
              : "⏸ Pause All"
            : "▶️ Play All"}
        </button>

        {isPlayingAll && (
          <button
            onClick={stopAll}
            className="ml-4 mb-4 mt-2 px-4 py-2 rounded-lg border border-red-500 text-red-600 hover:bg-red-100 flex justify-between items-center"
          >
            <FaStop /> <span className="ml-2">Stop</span>
          </button>
        )}
      </div>

      <div className="space-y-4 max-w-xl">
        {initialShuffledJanuary.map((item, index) => (
          <div
            key={index}
            className="flex items-start justify-between gap-4 border-b pb-3"
          >
            <pre className="whitespace-pre-wrap flex-1 font-sans">
              {index + 1}. {item.quote}
            </pre>
            {item.audio.length > 4 && (
              <button
                onClick={() => playSound(item.audio, index)}
                className="shrink-0 p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
                aria-label={
                  playingIndex === index ? "Pause audio" : "Play audio"
                }
              >
                {playingIndex === index ? <FaPause /> : <FaPlay />}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quotes;

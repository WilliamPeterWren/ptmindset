import { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaStop } from "react-icons/fa";

import january from "../../data/quotes/january";
import february from "../../data/quotes/february";
import march from "../../data/quotes/march";
import april from "../../data/quotes/april";

import shuffleArray from "../../utils/shuffleArray";

const combinedQuotes = [...january, ...february, ...march, ...april];
// const combinedQuotes = [...march];

const initialShuffledQuotes = shuffleArray([...combinedQuotes]);

const Quotes = () => {
  const pageTitle = "Châm ngôn sống";

  useEffect(() => {
    document.title = pageTitle;

    return () => {
      document.title = "Peter";
    };
  }, [pageTitle]);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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

    audioRef.current = new Audio(`/assets/audio/${fileName}`);
    audioRef.current.onended = () => setPlayingIndex(null);
    audioRef.current.play();
    setPlayingIndex(index);
    setIsPlayingAll(false);
  };

  const playAll = () => {
    const audios = initialShuffledQuotes
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

  const playNextInQueue = async () => {
    const current = queueRef.current[queueIndexRef.current];
    if (!current) {
      setPlayingIndex(null);
      setIsPlayingAll(false);
      setIsPaused(false);
      return;
    }

    if (!current.audio || !current.audio.endsWith(".mp3")) {
      queueIndexRef.current += 1;
      playNextInQueue();
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const audio = new Audio(`/assets/audio/${current.audio}`);
    audioRef.current = audio;
    setPlayingIndex(current.index);
    await delay(500);

    try {
      if (current.audio.length > 10) {
        await audio.play();
        setIsPaused(false);
      }
    } catch (error) {
      console.error("Playback error:", error);
    }

    audio.onended = () => {
      queueIndexRef.current += 1;
      playNextInQueue();
    };
  };

  return (
    <div className="mx-4 px-4 pt-4 bg-customLightDark">
      <h1 className="font-semibold text-lg">Rèn luyện tư duy mỗi ngày</h1>
      <hr className="border-t border-red-500 w-1/3 my-4" />

      <div className="h-20 max-w-xs flex justify-stretch items-center">
        <button
          onClick={togglePlayPauseAll}
          className="mb-2 mr-2 px-4 py-2 text-blue-500 rounded-lg border border-blue-500 hover:bg-blue-100 "
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
        {initialShuffledQuotes.map((item, index) => {
          if (item.quote.length > 5) {
            return (
              <div
                key={index}
                className="flex items-start justify-between gap-4 border-b pb-3"
              >
                <pre className="whitespace-pre-wrap flex-1 font-sans">
                  {index + 1}. {item.quote}
                </pre>
                {item.audio.length > 10 && (
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
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default Quotes;

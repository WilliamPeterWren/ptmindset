import { useState, useEffect } from "react";

import mindset from "../../data/mindset/mindset";
import mindset2 from "../../data/mindset/mindset2";
import mindset3 from "../../data/mindset/mindset3";
import mindset4 from "../../data/mindset/mindset4";
import mindset5 from "../../data/mindset/mindset5";
import mindset6 from "../../data/mindset/mindset6";
import mindset7 from "../../data/mindset/mindset7";

import shuffleArray from "../../utils/shuffleArray";

const combinedMindsets = [
  ...mindset,
  ...mindset2,
  ...mindset3,
  ...mindset4,
  ...mindset5,
  ...mindset6,
  ...mindset7,
];

function Videos() {
  const pageTitle = "Videos";

  useEffect(() => {
    document.title = pageTitle;

    return () => {
      document.title = "Peter";
    };
  }, [pageTitle]);

  const [initialShuffledMindsets] = useState(() =>
    shuffleArray([...combinedMindsets])
  );

  const half = Math.ceil(initialShuffledMindsets.length / 2);
  const firstHalf = initialShuffledMindsets.slice(0, half);
  const secondHalf = initialShuffledMindsets.slice(half);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % initialShuffledMindsets.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? initialShuffledMindsets.length - 1 : prev - 1
    );
  };

  const currentClip = initialShuffledMindsets[currentIndex];

  return (
    <div className="mx-4 px-4 pt-4 bg-customLightDark min-h-screen">
      <h1 className="font-semibold text-lg">
        Học thêm gì đó - Kho: {initialShuffledMindsets.length} clips
      </h1>
      <hr className="border-t border-red-500 my-4 w-full" />

      <div className="w-full flex flex-col lg:flex-row justify-items items-start gap-4">
        <div className="w-full lg:w-1/4">
          <p className="border-b border-l border-blue-500 p-2 rounded-lg text-sm lg:text-base">
            Danh sách 1
          </p>

          <div className="mt-4 max-h-[150px] sm:max-h-[200px] lg:max-h-[700px] overflow-y-auto overflow-x-hidden pr-2">
            <ul className="space-y-2">
              {firstHalf.map((item, index) =>
                item.name.length > 0 ? (
                  <li
                    key={index}
                    className={` border p-2 rounded-md text-sm lg:text-base ${
                      currentIndex === index
                        ? "bg-yellow-800 text-white"
                        : "hover:bg-yellow-800 hover:text-white border-yellow-800"
                    }`}
                  >
                    <button
                      className="text-left w-full"
                      onClick={() => setCurrentIndex(index)}
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}
            </ul>
          </div>
        </div>

        {currentClip.id !== null &&
          currentClip.id.length !== 0 &&
          currentClip.mimeType === "video/mp4" && (
            <div className="w-full flex flex-col items-center justify-center mt-4 sm:h-full md:h-full ">
              <div className="w-full aspect-[1/1] sm:aspect-[9/16]">
                <iframe
                  src={`https://drive.google.com/file/d/${currentClip.id}/preview`}
                  allow="autoplay"
                  allowFullScreen
                  className="w-full h-full rounded-lg border border-gray-300"
                  title={currentClip.name}
                />
              </div>

              <span className="text-sm font-semibold text-blue-300 mt-4 w-full text-center">
                {currentClip.name}
              </span>

              <div className="flex mt-4 gap-4 justify-center items-center w-full max-w-md">
                <button
                  onClick={handlePrev}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Next
                </button>
              </div>
            </div>
          )}

        <div className="w-full lg:w-1/4">
          <p className="border-b border-l border-blue-500 p-2 rounded-lg text-sm lg:text-base">
            Danh sách 2
          </p>

          <div className="mt-4 max-h-[150px] sm:max-h-[200px] lg:max-h-[700px] overflow-y-auto overflow-x-hidden pr-2">
            <ul className="space-y-2">
              {secondHalf.map((item, index) =>
                item.name.length > 0 ? (
                  <li
                    key={index}
                    className={` border p-2 rounded-md text-sm lg:text-base ${
                      currentIndex === index + half
                        ? "bg-yellow-800 text-white"
                        : "hover:bg-yellow-800 hover:text-white border-yellow-800"
                    }`}
                  >
                    <button
                      className="text-left w-full"
                      onClick={() => setCurrentIndex(index + half)}
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Videos;

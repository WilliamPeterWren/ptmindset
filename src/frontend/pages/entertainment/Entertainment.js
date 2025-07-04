import { useState, useEffect } from "react";

import entertainment from "../../data/entertainment/entertainment";
import entertainment2 from "../../data/entertainment/entertainment2";
import entertainment3 from "../../data/entertainment/entertainment3";

import shuffleArray from "../../utils/shuffleArray";

const combinedEntertainments = [
  ...entertainment,
  ...entertainment2,
  ...entertainment3,
];

function Entertainment() {
  const pageTitle = "Entertainment";

  useEffect(() => {
    document.title = pageTitle;
    return () => {
      document.title = "Peter";
    };
  }, []);

  const [shuffledEntertainments] = useState(() =>
    shuffleArray([...combinedEntertainments])
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  const half = Math.ceil(shuffledEntertainments.length / 2);
  const firstHalf = shuffledEntertainments.slice(0, half);
  const secondHalf = shuffledEntertainments.slice(half);
  const currentClip = shuffledEntertainments[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % shuffledEntertainments.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? shuffledEntertainments.length - 1 : prev - 1
    );
  };

  const renderList = (items, offset = 0) => (
    <ul className="space-y-2">
      {items.map((item, i) =>
        item.name ? (
          <li
            key={i + offset}
            className={`border p-2 rounded-md text-sm lg:text-base ${
              currentIndex === i + offset
                ? "bg-yellow-800 text-white"
                : "hover:bg-yellow-800 hover:text-white border-yellow-800"
            }`}
          >
            <button
              className="text-left w-full"
              onClick={() => setCurrentIndex(i + offset)}
            >
              {item.name}
            </button>
          </li>
        ) : null
      )}
    </ul>
  );

  return (
    <div className="mx-4 px-4 pt-4 bg-customLightDark min-h-screen">
      <h1 className="font-semibold text-lg">
        Giải trí điiii - Kho: {shuffledEntertainments.length} clips
      </h1>
      <hr className="border-t border-red-500 my-4 w-full" />

      <div className="w-full flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-1/4">
          <p className="border-b border-l border-blue-500 p-2 rounded-lg text-sm lg:text-base">
            Danh sách 1
          </p>
          <div className="mt-4 max-h-[700px] overflow-y-auto overflow-x-hidden pr-2">
            {renderList(firstHalf, 0)}
          </div>
        </div>

        {currentClip?.id && currentClip.mimeType === "video/mp4" && (
          <div className="w-full flex flex-col items-center justify-center">
            <div className="w-full aspect-[9/16] max-w-[450px] mx-auto">
              <iframe
                src={`https://drive.google.com/file/d/${currentClip.id}/preview`}
                allow="autoplay"
                allowFullScreen
                className="w-full h-full rounded-lg border border-gray-300"
                title={currentClip.name}
              />
            </div>

            <div className="flex mt-4 gap-4 justify-between items-center w-full max-w-md">
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
          <div className="mt-4 max-h-[700px] overflow-y-auto overflow-x-hidden pr-2">
            {renderList(secondHalf, half)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Entertainment;

import React, { useState, useMemo } from "react";
import { youtubeVideos } from "../../data/embed/videos";
import shuffleArray from "../../utils/shuffleArray";

function English() {
  const shuffledVideos = useMemo(() => shuffleArray([...youtubeVideos]), []);
  const [selectedVideo, setSelectedVideo] = useState(shuffledVideos[0]);
  const [note, setNote] = useState("");

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
      <h1 className="font-semibold text-lg sm:text-xl lg:text-2xl text-center sm:text-left">
        Học tiếng anh từ những người thành công – Clip YouTube
      </h1>

      <hr className="border-t border-red-500 w-1/2 sm:w-1/3 my-4 mx-auto sm:mx-0" />

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full lg:w-1/4">
          <p className="font-medium mb-2">Danh sách</p>
          <div className="mt-4 max-h-64 sm:max-h-96 lg:max-h-[800px] overflow-y-auto">
            <ul className="space-y-2">
              {shuffledVideos
                .filter((video) => video.videoId.length > 5)
                .map((video, index) => (
                  <li key={index}>
                    <button
                      className={`w-full text-left px-3 py-2 rounded-lg transition ${
                        selectedVideo.videoId === video.videoId
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 hover:bg-gray-300 text-black"
                      }`}
                      onClick={() => setSelectedVideo(video)}
                    >
                      {video.title}
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full lg:w-3/4">
          <div className="w-full rounded-lg overflow-hidden shadow mb-4">
            <iframe
              className="w-full h-[240px] sm:h-[360px] lg:h-[500px]"
              src={`https://www.youtube.com/embed/${selectedVideo.videoId}`}
              title={selectedVideo.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>

          <textarea
            className="text-black w-full min-h-[200px] sm:min-h-[280px] lg:min-h-[320px] border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={`Hãy ghi lại những gì bạn nghe được...\nCài chặn quảng cáo nếu cần thiết!\nHoặc bạn có thể bấm đến cuối clip rồi bấm replay để tự tắt quảng cáo.`}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default English;

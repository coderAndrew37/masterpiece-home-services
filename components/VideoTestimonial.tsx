"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlay, FiX, FiVideo } from "react-icons/fi";

export interface VideoItem {
  id: number;
  title: string;
  description: string;
  videoUrl?: string;
  thumbnailUrl?: string;
}

interface VideoTestimonialProps {
  video: VideoItem;
}

const VideoTestimonial: React.FC<VideoTestimonialProps> = ({ video }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Fallback thumbnail if none is provided
  const thumbnail =
    video.thumbnailUrl && video.thumbnailUrl.trim() !== ""
      ? video.thumbnailUrl
      : "/images/residential-1.jpg";

  return (
    <>
      {/* Main Card Component */}
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.2 }}
        onClick={() => setIsPlaying(true)}
        className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
      >
        {/* Thumbnail Container */}
        <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-900">
          <Image
            src={thumbnail}
            alt={video.title || "Video Testimonial"}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
          />

          {/* Dark Image Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />

          {/* Play Button Trigger */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Outer Pulse Effect */}
              <div className="absolute -inset-2 bg-blue-600/40 rounded-full animate-ping opacity-75 group-hover:opacity-100" />
              
              {/* Play Icon Circle */}
              <div className="relative w-14 h-14 rounded-full bg-blue-700 text-white flex items-center justify-center shadow-xl shadow-blue-700/40 group-hover:bg-blue-600 group-hover:scale-110 transition-all">
                <FiPlay className="w-6 h-6 ml-1 fill-white" />
              </div>
            </div>
          </div>

          {/* Top Video Badge */}
          <span className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 border border-white/10">
            <FiVideo className="w-3 h-3 text-blue-400" /> Customer Story
          </span>
        </div>

        {/* Card Text Content */}
        <div className="p-6">
          <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors mb-2 leading-snug">
            {video.title}
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            {video.description}
          </p>
        </div>
      </motion.div>

      {/* Video Lightbox Modal */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsPlaying(false)}
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsPlaying(false)}
                className="absolute top-4 right-4 z-20 text-white/80 hover:text-white bg-slate-950/60 p-2.5 rounded-full backdrop-blur-md transition-colors"
                aria-label="Close Video Modal"
              >
                <FiX className="w-5 h-5" />
              </button>

              {/* Embed / Video Display */}
              <div className="relative aspect-video w-full bg-black flex items-center justify-center">
                {video.videoUrl ? (
                  <iframe
                    src={video.videoUrl}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                ) : (
                  /* Fallback when no MP4/YouTube URL is supplied */
                  <div className="relative w-full h-full">
                    <Image
                      src={thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover opacity-40"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
                      <div className="w-16 h-16 rounded-full bg-blue-700/80 backdrop-blur-md flex items-center justify-center mb-4">
                        <FiPlay className="w-7 h-7 ml-1 text-white fill-white" />
                      </div>
                      <h4 className="text-xl font-bold mb-1">{video.title}</h4>
                      <p className="text-sm text-slate-300 max-w-md">
                        {video.description}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VideoTestimonial;
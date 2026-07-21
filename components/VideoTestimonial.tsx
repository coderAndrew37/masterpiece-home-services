"use client";
import React from "react";
import { motion } from "framer-motion";
import { FiPlay } from "react-icons/fi";

interface Video {
  id: number;
  title: string;
  description: string;
}

interface VideoTestimonialProps {
  video: Video;
}

const VideoTestimonial: React.FC<VideoTestimonialProps> = ({ video }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <div className="relative">
        <div className="bg-gray-200 border-2 border-dashed rounded-t-xl w-full h-48" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-blue-700 text-white w-16 h-16 rounded-full flex items-center justify-center">
            <FiPlay className="text-2xl ml-1" />
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-blue-900 mb-2">{video.title}</h3>
        <p className="text-gray-700">{video.description}</p>
      </div>
    </motion.div>
  );
};

export default VideoTestimonial;

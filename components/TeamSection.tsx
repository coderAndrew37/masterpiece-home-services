"use client";
import React from "react";
import { motion } from "framer-motion";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  img: string;
}

interface TeamSectionProps {
  title: string;
  teamMembers: TeamMember[];
}

const TeamSection: React.FC<TeamSectionProps> = ({ title, teamMembers }) => {
  return (
    <div className="my-20">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-blue-900 mb-4"
        >
          {title}
        </motion.h2>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "80px" }}
          viewport={{ once: true }}
          className="h-1 bg-blue-700 mx-auto mb-6"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="bg-gray-200 border-2 border-dashed w-full h-64" />
            <div className="p-6">
              <h3 className="text-xl font-bold text-blue-900 mb-1">
                {member.name}
              </h3>
              <p className="text-blue-700 mb-4">{member.role}</p>
              <p className="text-gray-700">{member.bio}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TeamSection;

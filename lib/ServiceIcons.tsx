// src/lib/serviceIcons.tsx
import React from 'react';
import { FiHome, FiDroplet, FiSun, FiZap, FiShield, FiCalendar } from 'react-icons/fi';

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  FiHome,
  FiDroplet,
  FiSun,
  FiZap,
  FiShield,
  FiCalendar,
};

export function getServiceIcon(iconName: string, className = 'w-5 h-5'): React.ReactElement {
  const Icon = ICONS[iconName] ?? FiHome;
  return <Icon className={className} />;
}
import sunnyLofiAudio from "~/assets/sunny-lofi.mp3";
import leanGrooveAudio from "~/assets/lean-groove.mp3";
import brightLoungeAudio from "~/assets/bright-lounge.mp3";
import cozyChillhopAudio from "~/assets/cozy-chillhop.mp3";
import upliftingSunsetAudio from "~/assets/uplifting-sunset.mp3";
import oceanDriftAudio from "~/assets/ocean-drift.mp3";
import midnightStrollAudio from "~/assets/midnight-stroll.mp3";
import forestRetreatAudio from "~/assets/forest-retreat.mp3";
import dreamyStarlightAudio from "~/assets/dreamy-starlight.mp3";

import brightLoungeCover from "~/assets/bright-lounge.jpg";
import cozyChillhopCover from "~/assets/cozy-chillhop.jpg";
import dreamyStarlightCover from "~/assets/dreamy-starlight.jpg";
import leanGrooveCover from "~/assets/lean-groove.jpg";
import midnightStrollCover from "~/assets/midnight-stroll.jpg";
import oceanDriftCover from "~/assets/ocean-drift.jpg";
import sunnyLofiCover from "~/assets/sunny-lofi.jpg";
import upliftingSunsetCover from "~/assets/uplifting-sunset.jpg";
import forestRetreatCover from "~/assets/forest-retreat.jpg";

export type Category = {
  id: string;
  title: string;
  description: string;
  audioSrc: string;
  cover: string;
};

export const categories: Category[] = [
  {
    id: "1",
    title: "Sunny Lofi",
    description: "Warm, upbeat daytime vibes",
    audioSrc: sunnyLofiAudio,
    cover: sunnyLofiCover,
  },
  {
    id: "2",
    title: "Lean Groove",
    description: "Smooth, relaxed rhythmic flow",
    audioSrc: leanGrooveAudio,
    cover: leanGrooveCover,
  },
  {
    id: "3",
    title: "Bright Lounge",
    description: "Lively, airy chill sessions",
    audioSrc: brightLoungeAudio,
    cover: brightLoungeCover,
  },
  {
    id: "4",
    title: "Cozy Chillhop",
    description: "Snug, mellow beat retreats",
    audioSrc: cozyChillhopAudio,
    cover: cozyChillhopCover,
  },
  {
    id: "5",
    title: "Uplifting Sunset",
    description: "Inspiring, golden hour melodies",
    audioSrc: upliftingSunsetAudio,
    cover: upliftingSunsetCover,
  },
  {
    id: "6",
    title: "Midnight Stroll",
    description: "Serene, nature-inspired escapes",
    audioSrc: midnightStrollAudio,
    cover: midnightStrollCover,
  },
  {
    id: "7",
    title: "Ocean Drift",
    description: "Gentle, wave-like relaxation",
    audioSrc: oceanDriftAudio,
    cover: oceanDriftCover,
  },
  {
    id: "8",
    title: "Forest Retreat",
    description: "Serene, nature-inspired escapes",
    audioSrc: forestRetreatAudio,
    cover: forestRetreatCover,
  },
  {
    id: "9",
    title: "Dreamy Starlight",
    description: "Ethereal, nighttime wonder beats",
    audioSrc: dreamyStarlightAudio,   
    cover: dreamyStarlightCover,
  },
];

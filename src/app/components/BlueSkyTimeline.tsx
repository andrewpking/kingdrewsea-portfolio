"use client";

import { useEffect, useRef } from "react";

interface BlueskyTimelineProps {
  feedUrl: string;
  height?: number;
}

const BlueskyTimeline: React.FC<BlueskyTimelineProps> = ({
  feedUrl,
  height = 600,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const getHtml = async (url: string) => {
    const response = await fetch(url);
    return response.status !== 200
      ? "<p><strong>No feed data could be located</p></strong>"
      : response.text();
  };

  useEffect(() => {
    // Add stylesheet
    const linkElement = document.createElement("link");
    linkElement.rel = "stylesheet";
    linkElement.href = "https://embedbsky.com/embedbsky.com-master-min.css";
    document.head.appendChild(linkElement);

    // Cleanup function to remove stylesheet when component unmounts
    return () => {
      document.head.removeChild(linkElement);
    };
  }, []); // Run once on mount

  useEffect(() => {
    const fetchAndSetContent = async () => {
      if (!containerRef.current) return;

      const timestamp = new Date().toISOString();
      const urlWithTimestamp = `${feedUrl}${
        feedUrl.includes("?") ? "&" : "?"
      }v=${timestamp}`;

      try {
        const html = await getHtml(urlWithTimestamp);
        containerRef.current.innerHTML = html;
      } catch (error) {
        console.error("Error fetching Bluesky timeline:", error);
        if (containerRef.current) {
          containerRef.current.innerHTML =
            "<p><strong>Error loading feed</strong></p>";
        }
      }
    };

    fetchAndSetContent();
  }, [feedUrl]); // Run once on mount

  return (
    <div
      ref={containerRef}
      className="w-96 bg-white rounded-lg shadow-md p-4"
      style={{
        height: `${height}px`,
      }}
      id="embedbsky-com-timeline-embed"
    />
  );
};

export default BlueskyTimeline;

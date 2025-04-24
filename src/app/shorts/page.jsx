'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { getShorts } from '@/store/slices/videoSlice.js';
import { Heart, MessageCircle, Share2, ThumbsDown, ArrowDown } from "lucide-react";

function Page() {
  const [shorts, setShorts] = useState([]);
  const [currentShort, setCurrentShort] = useState(null);
  const [index, setIndex] = useState(0);
  const [nextToken, setNextToken] = useState(null);
  const [status, setStatus] = useState({ like: false, dislike: false });
  const dispatch = useDispatch();

  const fetchShorts = useCallback(async (token = null) => {
    const res = await dispatch(getShorts(token));
    const shortsData = res?.payload?.shorts?.map((short) => ({
      videoId: short.id.videoId,
      title: short.snippet.title,
      thumbnail: short.snippet.thumbnails.medium.url,
      channelTitle: short.snippet.channelTitle,
    }));
    return { shortsData, nextPageToken: res?.payload?.nextPageToken };
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      const { shortsData, nextPageToken } = await fetchShorts();
      setShorts(shortsData);
      setCurrentShort(shortsData[0]);
      setNextToken(nextPageToken);
    })();
  }, [fetchShorts]);

  const handleNext = async () => {
    const newIndex = index + 1;

    if (newIndex === shorts.length - 1 && nextToken) {
      const { shortsData, nextPageToken } = await fetchShorts(nextToken);
      setShorts((prev) => [...prev, ...shortsData]);
      setNextToken(nextPageToken);
    }

    setIndex(newIndex);
    setCurrentShort(shorts[newIndex]);
  };

  const toggleStatus = (key) => {
    setStatus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if(!shorts) return <div className='text-gray-500 text-sm p-4'>Request Limit exceeded. Server will take some time to cool down.</div>
  return (
    <>
      {shorts.length > 0 && (
        <div className="relative h-[90vh] w-full max-w-md mx-auto overflow-hidden p-4 sm:p-0">
          <div className="h-full w-full bg-gradient-to-b from-black/90 to-white/20 flex items-center justify-center">
            <iframe
              src={`https://www.youtube.com/embed/${currentShort?.videoId}`}
              allow="autoplay"
              className="rounded-md h-full w-full"
            />
          </div>

          <div className="absolute right-4 bottom-12 md:bottom-4 flex flex-col items-center gap-10">
            <ActionButton
              icon={Heart}
              label="Like"
              active={status.like}
              onClick={() => toggleStatus('like')}
            />
            <ActionButton
              icon={ThumbsDown}
              label="Dislike"
              active={status.dislike}
              onClick={() => toggleStatus('dislike')}
            />
            <ActionButton icon={MessageCircle} label="Comment" />
            <ActionButton icon={Share2} label="Share" />
            <ArrowDown onClick={handleNext} className="h-6 w-6 cursor-pointer" />
          </div>
        </div>
      )}
    </>
  );
}

const ActionButton = ({ icon: Icon, label, active, onClick }) => (
  <div
    className="flex cursor-pointer flex-col items-center"
    onClick={onClick}
  >
    <Icon className={`h-6 w-6 ${active ? 'fill-white' : ''}`} />
    <span className="text-xs">{label}</span>
  </div>
);

export default Page;
'use client';

import { FaMicrophone } from 'react-icons/fa';
import React, { useState, useEffect, useRef } from 'react';

const SpeechToText: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const [transcript, setTranscript] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognitionAPI =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognitionAPI) {
        recognitionRef.current = new SpeechRecognitionAPI();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'ko-KR';

        recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
          const currentTranscript = Array.from(event.results)
            .map((result) => result[0].transcript)
            .join('');
          setTranscript(currentTranscript);

          // 사용자가 말을 멈추면 1초 후에 인식을 중지
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => {
            if (recognitionRef.current) {
              recognitionRef.current.stop();
              setIsListening(false);
              setIsExpanded(false);
              alert(`음성 인식 결과: ${currentTranscript}`);
            }
          }, 500);
        };

        recognitionRef.current.onerror = (event: SpeechRecognitionError) => {
          console.error('Speech recogntion error', event.error);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const toggleListening = () => {
    if (isListening) {
      setIsExpanded(false);
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    } else {
      setTranscript('');
      setIsExpanded(true);
      if (recognitionRef.current) {
        recognitionRef.current.start();
      }
    }
    setIsListening(!isListening);
  };

  return (
    <div
      className={`w-full bg-hanaPrimary flex justify-center rounded-tl-[16px] rounded-tr-[16px] rounded-bl-[0px] rounded-br-[0px] ${
        isExpanded ? 'h-[240px]' : 'h-[72px]'
      } transition-all duration-500 ease-in-out fixed bottom-0 left-0`}
    >
      {isExpanded && (
        <div className='w-full text-center text-white mt-[70px] text-lg font-bold overflow-hidden'>
          {transcript || '음성인식 된 내용이 나타납니다.'}
        </div>
      )}
      <div
        className='flex items-center justify-center w-[77px] h-[77px] border border-hanaPrimary rounded-full bg-white cursor-pointer absolute bottom-[38px] left-1/2 transform -translate-x-1/2'
        // ref={recognitionRef}
        onClick={toggleListening}
      >
        <FaMicrophone className='text-hanaPrimary w-[41.3px] h-[41.3px]' />
      </div>
    </div>
  );
};

export default SpeechToText;

'use client';

import { useVoiceInputSession } from '@/contexts/VoiceContext';
import { FaMicrophone } from 'react-icons/fa';
import { useState, useEffect, useRef, useCallback } from 'react';

const SpeechToText = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { setResult } = useVoiceInputSession();
  const setResultCallback = useCallback(
    (text: string) => {
      setResult(text);
    },
    [setResult]
  );

  const handleRecognitionResult = useCallback(
    (event: SpeechRecognitionEvent) => {
      const currentTranscript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join('');
      setTranscript(currentTranscript);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        if (recognitionRef.current) {
          recognitionRef.current.stop();
          setIsListening(false);
          setIsExpanded(false);
          setResultCallback(currentTranscript);
        }
      }, 4000);
    },
    [setResultCallback]
  );

  useEffect(() => {
    if (typeof window !== 'undefined' && !recognitionRef.current) {
      const SpeechRecognitionAPI =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognitionAPI) {
        recognitionRef.current = new SpeechRecognitionAPI();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'ko-KR';

        recognitionRef.current.onresult = handleRecognitionResult;

        recognitionRef.current.onerror = (event: SpeechRecognitionError) => {
          console.error('Speech recognition error', event.error);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [handleRecognitionResult]);

  const toggleListening = useCallback(() => {
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
    setIsListening((prev) => !prev);
  }, [isListening]);

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
        onClick={toggleListening}
      >
        <FaMicrophone className='text-hanaPrimary w-[41.3px] h-[41.3px]' />
      </div>
    </div>
  );
};

export default SpeechToText;

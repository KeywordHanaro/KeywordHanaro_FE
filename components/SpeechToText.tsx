'use client';

import { useVoiceInputSession } from '@/contexts/VoiceContext';
import { FaMicrophone } from 'react-icons/fa';
import { useState, useEffect, useRef, useCallback } from 'react';

interface SpeechToTextProps {
  autoStart?: boolean;
  placeholder?: string;
}

const SpeechToText = ({
  autoStart = false,
  placeholder = '음성인식 된 내용이 나타납니다.',
}: SpeechToTextProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  // const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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

      if (
        recognitionRef.current &&
        event.results[event.results.length - 1].isFinal
      ) {
        recognitionRef.current.stop();
        setResultCallback(currentTranscript);
        setIsExpanded(false);
        setIsListening(false);
      }
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

    // return () => {
    //   if (timeoutRef.current) clearTimeout(timeoutRef.current);
    // };
  }, [handleRecognitionResult]);

  useEffect(() => {
    if (autoStart && !isListening && recognitionRef.current) {
      try {
        setTranscript('');
        setIsExpanded(true);
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        if (
          error instanceof Error &&
          error.message.includes('already started')
        ) {
          recognitionRef.current.stop();
          setTimeout(() => {
            recognitionRef.current?.start();
          }, 100);
        } else {
          console.error('Speech recognition error:', error);
        }
      }
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (error) {
          console.error('Error stopping recognition:', error);
        }
      }
      
      // if (timeoutRef.current) {
      //   clearTimeout(timeoutRef.current);
      // }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoStart]);

  const toggleListening = useCallback(() => {
    if (isListening) {
      setIsExpanded(false);
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (error) {
          console.error('Error stopping recognition:', error);
        }
      }
    } else {
      setTranscript('');
      setIsExpanded(true);
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch (error) {
          console.error('Error starting recognition:', error);
        }
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
          {transcript || placeholder}
        </div>
      )}
      <div
        className='microphone-button flex items-center justify-center w-[77px] h-[77px] border border-hanaPrimary rounded-full bg-white cursor-pointer absolute bottom-[38px] left-1/2 transform -translate-x-1/2'
        onClick={toggleListening}
        tabIndex={-1}
      >
        <FaMicrophone className='text-hanaPrimary w-[41.3px] h-[41.3px]' />
      </div>
    </div>
  );
};

export default SpeechToText;

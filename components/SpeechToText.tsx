'use client';

import { useVoiceInputSession } from '@/contexts/VoiceContext';
import { AnimatePresence, motion } from 'motion/react';
import { FaMicrophone } from 'react-icons/fa';
import Image from 'next/image';
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
  const synthRef = useRef<SpeechSynthesis | null>(null);

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
        setTranscript('');
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

    // TTS 초기화
    if (typeof window !== 'undefined' && !synthRef.current) {
      synthRef.current = window.speechSynthesis;
    }
  }, [handleRecognitionResult]);

  useEffect(() => {
    if (autoStart && !isListening && recognitionRef.current) {
      try {
        // Placeholder를 TTS로 읽어주기
        speakPlaceholder(placeholder);
      } catch (error) {
        console.error('Error in auto start:', error);
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
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoStart]);

  const speakPlaceholder = useCallback((text: string) => {
    setIsExpanded(true);
    if (!synthRef.current) return;
    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = 'ko-KR';
    const voices = window.speechSynthesis.getVoices();
    const googleKoreanVoice = voices.find(
      (voice) => voice.name === 'Google 한국의'
    );

    if (googleKoreanVoice) {
      utterance.voice = googleKoreanVoice;
    }

    utterance.onend = () => {
      setIsListening((prev) => !prev);
      startListening(); // TTS가 끝난 후 STT 시작
    };

    synthRef.current.speak(utterance);
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      setTranscript('');

      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        console.error('Error starting recognition:', error);
      }
    }
  };

  const toggleListening = useCallback(() => {
    if (isListening) {
      setIsExpanded(false);
      setIsListening((prev) => !prev);
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (error) {
          console.error('Error stopping recognition:', error);
        }
      }
    } else {
      speakPlaceholder(placeholder); // TTS로 placeholder 읽기
    }
  }, [speakPlaceholder, isListening, placeholder]);

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
        <AnimatePresence mode='wait'>
          <motion.div
            key={isListening ? 'microphone' : 'chatbot'}
            initial={{ rotateY: -90 }}
            animate={{ rotateY: 0 }}
            exit={{ rotateY: 90 }}
            transition={{
              duration: 0.2,
              type: 'keyframes',
              stiffness: 150,
            }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {isListening ? (
              <motion.div
                animate={{
                  scale: [1, 1, 1, 1, 1],
                  rotate: [0, -30, 30, 0],
                  borderRadius: ['0%', '50%', '50%', '0%'],
                }}
                transition={{
                  duration: 1.5,
                  ease: 'easeInOut',
                  repeat: Infinity,
                }}
              >
                <FaMicrophone className='text-hanaPrimary w-[41.3px] h-[41.3px]' />
              </motion.div>
            ) : (
              <Image
                src='/images/icons/chatbot.svg'
                alt='chatbot'
                width={41.3}
                height={41.3}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SpeechToText;

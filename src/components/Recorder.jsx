import { useEffect, useRef, useState } from "react";
import MicIcon from "../assets/mic.png";

export default function Recorder({
  onIntermediate,
  onFinal,
  silenceTimeout = 3500,
}) {
  const [isSupported, setIsSupported] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState(null);

  const recognitionRef = useRef(null);
  const finalTranscriptRef = useRef("");
  const silenceTimerRef = useRef(null);

  useEffect(() => {
    const SpeechRec =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRec) {
      setIsSupported(false);
      return;
    }

    const rec = new SpeechRec();
    rec.lang = "en-US";
    rec.interimResults = true;
    rec.continuous = true;

    rec.onresult = (event) => {
      let interim = "";
      let finalChunk = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];

        if (result.isFinal) {
          finalChunk += result[0].transcript;
        } else {
          interim += result[0].transcript;
        }
      }

      // Send live partial text
      if (interim.trim()) {
        onIntermediate?.(interim.trim());
      }

      // Append final text
      if (finalChunk.trim()) {
        finalTranscriptRef.current = (
          finalTranscriptRef.current +
          " " +
          finalChunk
        ).trim();

        onFinal?.(finalTranscriptRef.current.trim());
      }

      resetSilenceTimer();
    };

    rec.onerror = (ev) => {
      setError(ev.error);
      stopListening();
    };

    rec.onend = () => {
      setIsListening(false);

      // On manual or auto stop, send final transcript
      if (finalTranscriptRef.current.trim()) {
        onFinal?.(finalTranscriptRef.current.trim());
      }

      clearSilenceTimer();
    };

    recognitionRef.current = rec;

    // Cleanup on unmount
    return () => {
      try {
        rec.stop();
      } catch {}
      clearSilenceTimer();
    };
  }, []);

  function startListening() {
    setError(null);
    finalTranscriptRef.current = "";

    try {
      recognitionRef.current.start();
      setIsListening(true);
      resetSilenceTimer();
    } catch (e) {
      console.warn("Speech recognition already running");
    }
  }

  function stopListening() {
    try {
      recognitionRef.current.stop();
    } catch {}
    clearSilenceTimer();
  }

  function resetSilenceTimer() {
    clearSilenceTimer();
    silenceTimerRef.current = setTimeout(() => {
      stopListening();
    }, silenceTimeout);
  }

  function clearSilenceTimer() {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
  }

  if (!isSupported) {
    return (
      <div className="text-yellow-400">
        Speech Recognition not supported. Use Chrome/Edge.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={() => (isListening ? stopListening() : startListening())}
        className={`
          w-24 h-24 rounded-full flex items-center justify-center
          transition-all duration-200
          ${isListening ? "bg-red-600" : "bg-blue-500"}
        `}
      >
        <img src={MicIcon} className="w-12 h-12 invert" alt="mic" />
      </button>

      <div className="text-sm text-gray-300">
        {isListening ? "Listening…" : "Click mic to start"}
      </div>

      {error && <div className="text-red-400 text-xs mt-2">Error: {error}</div>}
    </div>
  );
}

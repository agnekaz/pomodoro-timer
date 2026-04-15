import { useState, useEffect, useRef } from 'react';
import type { TimerState } from './types';
import '../App.scss'

export default function Timer() {
    const [state, setState] = useState<TimerState>({
        workDuration: 25*60,
        breakDuration: 5*60,
        longBreakDuration: 15*60,
        currentTime: 25*60,
        currentSession: 'work',
        timerStatus: 'idle',
        sessionCount: 0,
    });

    const timerRef = useRef<ReturnType<typeof window.setInterval> | null>(null);
    const didSwitchRef = useRef(false);

    useEffect(() => {
        if (state.timerStatus !== 'running') {
            if (timerRef.current) window.clearInterval(timerRef.current);
            timerRef.current = null;
            return;
        }
        if (timerRef.current) window.clearInterval(timerRef.current);
        timerRef.current = window.setInterval(() => {
            setState((prev) => ({
                ...prev,
                currentTime: Math.max(0, prev.currentTime - 1),
            }));
        }, 1000);

        return () => {
            if (timerRef.current) window.clearInterval(timerRef.current);
            timerRef.current = null;
        };
    }, [state.timerStatus]);

    useEffect(() => {
        if (state.currentTime > 0) {
            didSwitchRef.current = false;
            return;
        }
        if (state.timerStatus !== 'running') return;
        if (didSwitchRef.current) return;

        didSwitchRef.current = true;
        if (timerRef.current) window.clearInterval(timerRef.current);
        timerRef.current = null;
        handleSwitchSession();
    }, [state.currentTime, state.timerStatus]);

    const startPauseTimer = () : void => {
        if (state.timerStatus === 'running'){
            setState((prevState) => ({
                ...prevState,
                timerStatus: 'paused',
            }));
        }else{
            setState((prevState) => ({
                ...prevState,
                timerStatus: 'running',
            }));
        }
    };
     const handleSwitchSession = () : void => {
        setState((prevState) => {
            if (prevState.currentSession !== 'work') {
                return {
                    ...prevState,
                    currentSession: 'work',
                    currentTime: prevState.workDuration,
                    timerStatus: 'idle',
                };
            }

            const nextCount = prevState.sessionCount + 1;
            const shouldLongBreak = nextCount % 4 === 0;

            return {
                ...prevState,
                sessionCount: nextCount,
                currentSession: shouldLongBreak ? 'long break' : 'break',
                currentTime: shouldLongBreak ? prevState.longBreakDuration : prevState.breakDuration,
                timerStatus: 'idle',
            };
        });
     }

     const formatTime = (time: number) : string => {
        const minutes = Math.floor(time/60);
        const remainingSeconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
     }
    return (
        <>
        
        <div className="timer-container">
            <span className="session-type">{state.currentSession}</span>
            <span className="time-left">{formatTime(state.currentTime)}</span>
            <span className="session-count">Session {state.sessionCount + 1}</span>
            <button onClick={startPauseTimer}>{state.timerStatus === 'running' ? 'Pause' : 'Start'}</button>
        </div>
        
        </>
    );
    
}
import { useState, useEffect, useRef } from 'react';
import type { TimerState } from './types';

export default function Timer() {
    const [state, setState] = useState<TimerState>({
        workDuration: 25*60,
        breakDuration: 5*60,
        currentTime: 25*60,
        currentSession: 'work',
        timerStatus: 'idle',
    });

    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (state.timerStatus === 'running' && state.currentTime>0){
            timerRef.current = setInterval(() => {
                setState((prevState) => ({
                    ...prevState,
                    currentTime: prevState.currentTime - 1,
                }));
            }, 1000);
        } else if(state.currentTime === 0){
            clearInterval(timerRef.current as ReturnType<typeof setInterval>);
            handleSwitchSession();
        }
        return () => clearInterval(timerRef.current as ReturnType<typeof setInterval>);
    }, [state.timerStatus, state.currentTime]);

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
            const isWorkSession = prevState.currentSession === 'work';
            return{
                ...prevState,
                currentSession: isWorkSession ? 'break' : 'work',
                currentTime: isWorkSession ? state.breakDuration : state.workDuration,
            }
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
            <div className="timer-display">
                <span className="session-type">{state.currentSession}</span>
                <span className="time-left">{formatTime(state.currentTime)}</span>
                <button onClick={startPauseTimer}>Start/pause</button>
            </div>
        </div>
        </>
    );
    
}
import { useEffect, useReducer, useCallback } from 'react';

export type TimerStatus = 'idle' | 'running' | 'paused';
type SessionType = 'work' | 'break' | 'longBreak';

interface TimerState {
    currentTime: number;
    currentSession: SessionType;
    timerStatus: TimerStatus;
    sessionCount: number; // completed work sessions
}

type Action = 
    | { type: 'TICK' }
    | { type: 'START' }
    | { type: 'PAUSE' }
    | { type: 'SWITCH_SESSION' };


const config = {
    workDuration: 25*60,
    breakDuration: 5*60,
    longBreakDuration: 15*60,
}

const initialState: TimerState = {
    currentTime: config.workDuration,
    currentSession: 'work',
    timerStatus: 'idle',
    sessionCount: 0,
}

const reducer = (state: TimerState, action: Action) => {
    switch (action.type) {
        case 'TICK':
            return {
                ...state,
                currentTime: Math.max(0, state.currentTime -1),
            };

            case 'START':
                return { ...state, timerStatus: 'running'};
            
            case 'PAUSE':
                return { ...state, timerStatus: 'paused'};
            
            case 'SWITCH_SESSION': {
                if(state.currentSession !== 'work'){
                    return {
                        ...state,
                        currentSession: 'work',
                        currentTime: config.workDuration,
                        timerStatus: 'idle',
                    };
                }

                const nextCount = state.sessionCount + 1;
                const isLongBreak = nextCount % 4 === 0;

                return {
                    ...state,
                    sessionCount: nextCount,
                    currentSession: isLongBreak ? 'longBreak' : 'break',
                    currentTime: isLongBreak ? config.longBreakDuration : config.breakDuration,
                    timerStatus: 'idle',
                }
            }
            default:
                return state;
    }
}

export function usePomodoroTimer() {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if(state.timerStatus !== 'running') return;

        const id = setInterval(() => {
            dispatch({ type: 'TICK'});
        }, 1000);

        return () => clearInterval(id);
    }, [state.currentTime, state.timerStatus]);

    useEffect(() => {
        if(state.currentTime === 0 && state.timerStatus === 'running'){
            dispatch({ type: 'SWITCH_SESSION'});
        }
    }, [state.currentTime, state.timerStatus]);

    const startTimer = useCallback(() => {
        dispatch({ type: 'START'});
    }, []);

    const pauseTimer = useCallback(() => {
        dispatch({ type: 'PAUSE'});
    }, []);

    const toggleSession = useCallback(() => {
        dispatch({ type: state.timerStatus === 'running' ? 'PAUSE' : 'START',});
    }, [state.timerStatus]);

    return {
        state,
        startTimer,
        pauseTimer,
        toggleSession,
    }
}
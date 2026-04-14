
export type TimerStatus = 'idle' | 'running' | 'paused';
export type SessionType = 'work' | 'break';

export interface TimerState {
    workDuration: number;
    breakDuration: number;
    currentTime: number;
    currentSession: SessionType;
    timerStatus: TimerStatus;
}


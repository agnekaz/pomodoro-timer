
export type TimerStatus = 'idle' | 'running' | 'paused';
export type SessionType = 'work' | 'break' | 'long break';

export interface TimerState {
    workDuration: number;
    breakDuration: number;
    longBreakDuration: number;
    currentTime: number;
    currentSession: SessionType;
    timerStatus: TimerStatus;
    sessionCount: number; // completed work sessions
}


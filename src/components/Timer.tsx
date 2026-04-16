import { usePomodoroTimer } from '../hooks/usePomodoroTimer';
import '../App.scss'
import { formatTime } from '../utils/formatTime';

export default function Timer() {
  const {state, toggleSession} = usePomodoroTimer();
     
    return (
        <>
        <div className="timer-container">
            <span className="session-type">{state.currentSession}</span>
            <span className="time-left">{formatTime(state.currentTime)}</span>
            <span className="session-count">Session {state.sessionCount + 1}</span>
            <button onClick={toggleSession}>{state.timerStatus === 'running' ? 'Pause' : 'Start'}</button>
        </div>
        </>
    );
    
}
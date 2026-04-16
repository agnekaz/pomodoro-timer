export const formatTime = (time: number) : string => {
    const minutes = Math.floor(time/60);
    const remainingSeconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
 }
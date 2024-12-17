import {useState} from 'react';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFS from 'react-native-fs'; // 파일 시스템 접근

const audioRecorderPlayer = new AudioRecorderPlayer();

const useRecord = () => {
  const [recording, setRecording] = useState<boolean>(false);
  const [recordDuration, setRecordDuration] = useState({
    recordSecs: 0,
    recordTime: '00:00:00',
  });
  const [playerDuration, setPlayerDuration] = useState({
    currentPositionSec: 0,
    currentDurationSec: 0,
    playTime: '00:00:00',
    duration: '00:00:00',
  });
  // 녹음 시작
  const handleStartRecord = async () => {
    if (audioRecorderPlayer) {
      setRecording(true);
      setPlayerDuration({
        ...playerDuration,
        currentPositionSec: 0,
        currentDurationSec: 0,
        playTime: '00:00:00',
        duration: '00:00:00',
      });
      await audioRecorderPlayer.startRecorder();
    }
    audioRecorderPlayer.addRecordBackListener(e => {
      setRecordDuration({
        ...recordDuration,
        recordSecs: e.currentPosition,
        recordTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
      });
    });
  };

  // 녹음 중지
  const handleStopRecord = async () => {
    if (audioRecorderPlayer) {
      setRecording(false);
      const result = await audioRecorderPlayer.stopRecorder(); // 파일 경로 반환
      console.log('Recording saved at:', result); // 파일 경로 출력
      audioRecorderPlayer.removeRecordBackListener();
      setRecordDuration({...recordDuration, recordSecs: 0});
    }
    // audioRecorderPlayer.removeRecordBackListener();
    // setRecordDuration({...recordDuration, recordSecs: 0});
  };

  // 음성 재생
  const soundStart = async () => {
    await audioRecorderPlayer.startPlayer();
    audioRecorderPlayer.addPlayBackListener(e => {
      setPlayerDuration({
        currentPositionSec: e.currentPosition,
        currentDurationSec: e.duration,
        playTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
        duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
      });
    });
  };

  return {
    recording,
    handleStartRecord,
    handleStopRecord,
    soundStart,
  };
};

export default useRecord;

const alarmMessages = [
  {
    title: '🎶 TJ 신곡이 매일 업데이트 되는 것을 아시나요?',
    message: '[이달의 노래방 신곡]에서 매일 업데이트 되는 신곡을 확인해보세요!',
  },
  {
    title: '🎶 게시판에 새로운 글이 올라왔어요!',
    message: '[게시판]에서 다른 사용자들과 함께 노래에 대하여 이야기를 해봐요!',
  },
  {
    title: '🎶 무슨 노래를 부를지 모르겠다면?',
    message:
      '[최근 보관한 노래]에서 다른 사람들이 보관함에 담은 노래를 확인해보세요!',
  },
  {
    title: '🎶 보관함에 노래를 저장하면 노래를 추천해준다는 걸 아시나요?',
    message:
      '[보관함]에 노래를 보관하고 [AI’s pick]에서 추천 노래를 확인해보세요!',
  },
  {
    title: '🎶 일주일간 노래방에 갔다오셨나요?',
    message: '싱송생송이 도움이 되었으면 좋겠어요~',
  },
] as const;
const alarmDays = [1, 2, 4, 6, 7] as const;

export {alarmMessages, alarmDays};

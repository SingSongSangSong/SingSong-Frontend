function formatDateString(dateString: string) {
  // 문자열을 년, 월, 일, 시로 분리
  const [year, month, day, hour] = dateString.split('-');

  // 원하는 형식으로 재구성
  const formattedDate = `${parseInt(month)}월 ${parseInt(
    day,
  )}일 ${hour}시 기준`;

  return formattedDate;
}

const formatDateComment = (createdAt: string) => {
  const now = new Date();
  const date = new Date(createdAt);

  const diffMs = now - date;
  const diffMinutes = Math.floor(diffMs / 60000); // 밀리초 -> 분
  const diffHours = Math.floor(diffMs / 3600000); // 밀리초 -> 시간

  const isToday =
    now.getDate() === date.getDate() &&
    now.getMonth() === date.getMonth() &&
    now.getFullYear() === date.getFullYear();

  if (isToday) {
    if (diffMinutes < 60) {
      return `${diffMinutes}분 전`;
    } else {
      return `${diffHours}시간 전`;
    }
  } else {
    const year = String(date.getFullYear()).slice(-2); // 마지막 두 자리 연도
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월
    const day = String(date.getDate()).padStart(2, '0'); // 일

    return `${year}.${month}.${day}`;
  }
};

export {formatDateString, formatDateComment};

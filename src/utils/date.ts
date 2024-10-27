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

  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / 60000); // 밀리초 -> 분
  const diffHours = Math.floor(diffMs / 3600000); // 밀리초 -> 시간

  if (diffMinutes <= 0) {
    return '방금';
  }

  if (diffHours < 24) {
    if (diffMinutes < 60) {
      return `${diffMinutes}분 전`;
    } else {
      return `${diffHours}시간 전`;
    }
  } else {
    const isCurrentYear = now.getFullYear() === date.getFullYear();
    const year = String(date.getFullYear()).slice(-2); // 마지막 두 자리 연도
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월
    const day = String(date.getDate()).padStart(2, '0'); // 일

    if (isCurrentYear) {
      return `${month}/${day}`;
    } else {
      return `${year}/${month}/${day}}`;
    }
  }
};

const formatDate = (createdAt: string): string => {
  const date = new Date(createdAt);
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월을 2자리로 만듦 (01, 02, ..., 12)
  const day = String(date.getDate()).padStart(2, '0'); // 일을 2자리로 만듦 (01, 02, ..., 31)
  return `${month}.${day}`; // MM.DD 형식으로 반환
};

const formatDatePost = (createdAt: string) => {
  const now = new Date();
  const date = new Date(createdAt);

  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / 60000); // 밀리초 -> 분
  const diffHours = Math.floor(diffMs / 3600000); // 밀리초 -> 시간

  if (diffMinutes <= 0) {
    return '방금';
  }

  if (diffHours < 24) {
    if (diffMinutes < 60) {
      return `${diffMinutes}분 전`;
    } else {
      return `${diffHours}시간 전`;
    }
  } else {
    const isCurrentYear = now.getFullYear() === date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월
    const day = String(date.getDate()).padStart(2, '0'); // 일
    const hours = String(date.getHours()).padStart(2, '0'); // 시간 (24시간 형식)
    const minutes = String(date.getMinutes()).padStart(2, '0'); // 분

    if (isCurrentYear) {
      return `${month}/${day} ${hours}:${minutes}`;
    } else {
      const year = String(date.getFullYear()).slice(-2); // 마지막 두 자리 연도
      return `${year}/${month}/${day} ${hours}:${minutes}`;
    }
  }
};

export {formatDateString, formatDateComment, formatDate, formatDatePost};

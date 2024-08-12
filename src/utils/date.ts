function formatDateString(dateString: string) {
  // 문자열을 년, 월, 일, 시로 분리
  const [year, month, day, hour] = dateString.split('-');

  // 원하는 형식으로 재구성
  const formattedDate = `${parseInt(month)}월 ${parseInt(
    day,
  )}일 ${hour}시 기준`;

  return formattedDate;
}

export {formatDateString};

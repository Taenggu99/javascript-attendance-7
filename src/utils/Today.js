class Today {
  static findToday() {
    const today = new Date();

    let year = today.getFullYear(); //년도
    let month = today.getMonth() + 1;
    let date = today.getDate();
    let day = today.getDay();

    const day_map = {
      0: "일요일",
      1: "월요일",
      2: "화요일",
      3: "수요일",
      4: "목요일",
      5: "금요일",
      6: "토요일",
    };
    const daytext = day_map[day];

    return [month, date, daytext];
  }
}

export default Today;

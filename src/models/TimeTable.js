import { Random, Console } from "@woowacourse/mission-utils";
//이름,날짜,시간

class TimeTable {
  // 4. 교육시간 : 월요일은 13:00~18:00, 화요일-금요일은 10:00~18:00

  static educationTime() {
    const educationTimeTable = {
      Monday: {
        open: "13:00",
        close: "18:00",
      },
      Tuesday: {
        open: "10:00",
        close: "18:00",
      },
      Wednesday: {
        open: "10:00",
        close: "18:00",
      },
      Thursday: {
        open: "10:00",
        close: "18:00",
      },
      Friday: {
        open: "10:00",
        close: "18:00",
      },
      Saturday: {
        open: "00:00",
        close: "00:00",
      },
      Sunday: {
        open: "10:00",
        close: "00:00",
      },
    };
  }
  // 5. 지각 : 해당 요일의 시작 시각으로부터 5분 초과
  static 지각체크(등교시간) {}
  // 6. 결석 : 해당 요일의 시작 시각으로부터 30분 초과 , 등교하지 않아 출석 기록이 없는 날
  // 7. 지각 3회는 결석 1회로 간주한다.
  // 8. 경고 대상자: 결석 2회 이상
  // 9. 면담 대상자: 결석 3회 이상
}

export default EducationTime;

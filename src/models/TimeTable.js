import { Random, Console, DateTimes } from "@woowacourse/mission-utils";
import moduleName from "module";
import Today from "../utils/Today.js";

//이름,날짜,시간

class TimeTable {
  // 4. 교육시간 : 월요일은 13:00~18:00, 화요일-금요일은 10:00~18:00
  static checkTardiness() {
    const todayDayInfo = DateTimes.now();
    const month = todayDayInfo[0];
    const date = todayDayInfo[1];
    const day = todayDayInfo[2];
    const dayText = todayDayInfo[3];
    const time = todayDayInfo[4];

    // 주말(토=6, 일=0)이거나 기준 시간이 설정되지 않은 경우
    if (day === 0 || day === 6) {
      console.log(`${month}월 ${date}일 ${dayText}은 등교일이 아닙니다`);
    } else {
      return [month, date, day, dayText, time];
    }
  }

  // 함수 실행
  // checkTardiness();

  static educationTime() {
    // const educationTimeTable = [[13:00,18:00]];
    // const educationTimeTable = {
    //   1: {
    //     open: "13:00",
    //     close: "18:00",
    //   },
    //   2: {
    //     open: "10:00",
    //     close: "18:00"},
    //   3: {
    //     open: "10:00",
    //     close: "18:00"},
    //   4: {
    //     open: "10:00",
    //     close: "18:00"},
    //   5: {
    //     open: "10:00",
    //     close: "18:00"}
    // }
  }
  static checkingTime(등교_시, 등교_분) {
    const [month, date, day, dayText, time] = this.checkTardiness();
    let 등교결과값 = [];
    // const 등교시분 = 등교시간.split(":").map(Number);

    // Console.print("등교시" + 등교_시 + "등교분 " + 등교_분);
    // 5. 지각 : 해당 요일의 시작 시각으로부터 5분 초과
    // 6. 결석 : 해당 요일의 시작 시각으로부터 30분 초과 , 등교하지 않아 출석 기록이 없는 날
    // 7. 지각 3회는 결석 1회로 간주한다.
    // 8. 경고 대상자: 결석 2회 이상
    // 9. 면담 대상자: 결석 3회 이상
    //출석 월요일은 13:00~18:00, 화요일-금요일은 10:00~18:00이다.
    //운영 시간은 매일 08:00~23:00이다.
    const 운영시간시작 = ["08", "00"];
    const 운영시간종료 = ["23", "00"];
    Console.print(" 여기는 캠퍼스 운영시간 출석 에러 나오기전");
    if (등교_시 < 8 || 등교_시 > 23 || (등교_시 === 23 && 등교_분 > 0)) {
      throw new Error("[ERROR] 캠퍼스 운영 시간에만 출석이 가능합니다.");
    }

    const 월요일출석시간시작 = ["13", "00"];
    const 월요일출석시간종료 = ["18", "00"];
    const 평일출석가능시간시작 = ["10", "00"];
    // const 평일출석가능시간종료=["23","00"]

    if (day === 1) {
      if (Number(등교_시) > 13) {
        등교결과값.push("결석");
      } else if (Number(등교_시) === 13 && Number(등교_분) <= 5) {
        등교결과값.push("출석");
      } else {
        등교결과값.push("지각");
      }
    } else {
      if (Number(등교_시) > 10) {
        등교결과값.push("결석");
      } else if (Number(등교_시) === 10 && Number(등교_분) > 30) {
        등교결과값.push("결석");
      } else if (Number(등교_시) === 10 && Number(등교_분) <= 5) {
        등교결과값.push("출석");
      } else {
        등교결과값.push("지각");
      }
    }

    return 등교결과값;
  }

  // static checkState(등교시간) {
}

export default TimeTable;

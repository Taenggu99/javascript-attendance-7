import { Console, DateTimes } from "@woowacourse/mission-utils";
// import Today from "../utils/Today.js";

//이름,날짜,시간

class TimeTable {
  // 4. 교육시간 : 월요일은 13:00~18:00, 화요일-금요일은 10:00~18:00
  static checkTardiness() {
    const today = DateTimes.now();

    let month = today.getMonth() + 1;
    let date = today.getDate();
    let day = today.getDay();

    // let realhours = today.getHours();
    // let realminutes = today.getMinutes();
    // let time = `${realhours}:${realminutes}`;

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

    // 주말(토=6, 일=0)이거나 기준 시간이 설정되지 않은 경우
    if (date === 0 || date === 6) {
      return Console.print(
        `${month}월 ${date}일 ${daytext}은 등교일이 아닙니다`
      );
    } else {
      return [month, date, day, daytext];
    }
  }

  // 함수 실행
  // checkTardiness();

  static checkingTime(day_, 등교_시, 등교_분) {
    // const getTimeinfo = this.checkTardiness();
    // console.log(
    //   " 이건 타임테이블로 넘어오고나서의 날짜, 등교시, 등교분 부분 ->",
    //   day_,
    //   등교_시,
    //   등교_분
    // );
    let 등교결과값 = [];
    // const daydata = getTimeinfo[2];
    const hour = 등교_시;
    const minute = 등교_분;

    // console.log(
    //   " 등교시, 등교분, hour, min ->",

    //   등교_시,
    //   등교_분,
    //   hour,
    //   minute
    // );
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
    // console.log(
    //   " 여기는 캠퍼스 운영시간 출석 에러 나오기전     이건받아온시간 ->",
    //   hour,
    //   minute
    // );

    if (등교_시 < 8 || 등교_시 > 23 || (등교_시 == 23 && 등교_분 > 0)) {
      throw new Error("[ERROR] 캠퍼스 운영 시간에만 출석이 가능합니다.");
    } else {
      if (day_ === 1) {
        if (등교_시 > 13 || (등교_시 <= 13 && 등교_분 > 30)) {
          등교결과값.push("결석");
        } else if (등교_시 === 13 && minute > 5) {
          등교결과값.push("지각");
          등교_분;
        } else {
          등교결과값.push("출석");
        }
      } else {
        if (등교_시 > 10 || (등교_시 >= 10 && 등교_분 > 30)) {
          등교결과값.push("결석");
        } else if (등교_시 === 10 && 등교_분 > 5) {
          등교결과값.push("지각");
        } else {
          등교결과값.push("출석");
        }
      }
    }
    return 등교결과값;
  }

  // static checkState(등교시간) {
}

export default TimeTable;

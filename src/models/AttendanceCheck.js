import { Random, Console } from "@woowacourse/mission-utils";
import DataLoader from "../utils/DataLoader.js";
import Today from "../utils/Today.js";
import TimeTable from "./TimeTable.js";

//이름,날짜,시간

class AttendanceCheck {
  static getRecordUserList() {
    const data = DataLoader.loadAttendanceCsv("public/attendances.csv");
    const usersFullRecord = Object.groupBy(data, ({ nickname }) => nickname);
    const keys = Object.keys(usersFullRecord);
    // 배열 순서대로 정렬
    // usersFullRecord.sort();

    return keys;
  }

  static async get_user_information() {
    const getToday = Today.findToday();
    const todayDayInfo = Today.findToday();
    const month = todayDayInfo[0];
    const date = todayDayInfo[1];
    const day = todayDayInfo[2];
    const dayText = todayDayInfo[3];
    const time = todayDayInfo[4];

    if (getToday[3] === "토요일" || getToday[3] === "일요일") {
      throw new Error(
        `[ERROR] ${month}월  ${date}일  ${dayText}은 등교일이 아닙니다.`
      );
    }
    const pickname = this.getRecordUserList();
    // Console.print(pickname);
    //1. 닉네입 입력받기
    const 닉네임 = await Console.readLineAsync("\n닉네임을 입력해 주세요\n");
    //1-1. 등록된 닉네임인지 확인하기
    // const data = DataLoader.loadAttendanceCsv("public/attendances.csv");

    // Console.print(usersFullRecord);
    if (!pickname.includes(닉네임)) {
      throw new Error("[ERROR] 등록되지 않은 닉네임입니다. ");
    }
    //2. 등교시간 입력받기
    const 등교시간 = await Console.readLineAsync(
      "\n등교 시간을 입력해 주세요\n"
    );
    // const cleanedValue = 등교시간.value.replace(/[^0-9:]/g, "");

    const 등교시분 = 등교시간.split(":");
    let 등교_시 = 등교시분[0];
    let 등교_분 = 등교시분[1];

    if (Number.isNaN(등교_시) || 등교_시 > 23) {
      throw new Error("[ERROR] 잘못된 형식을 입력하였습니다.");
    } else if (Number.isNaN(등교_분) || 등교_분 > 60 || 등교_분 < 0) {
      throw new Error("[ERROR] 잘못된 형식을 입력하였습니다.");
      // } else if (cleanedValue !== 등교시간.value) {
      //   throw new Error("[ERROR] 입력이 잘못되었습니다");
    }
    // Console.print(`${등교시간}  , ${등교_시} , ${등교_분}`);
    const 등하교결과 = TimeTable.checkingTime(등교_시, 등교_분);
    //3. 출석날짜 및 시간 출력 ex)12월 05일 화요일 09:59 (출석)
    Console.print("여긴 등하교 결과 보여주는곳 바로위");
    Console.print(`${month}월 ${date}일 ${dayText} (${등하교결과})`);
    Console.print("여긴 등하교 결과 보여주는곳 바로아래");
  }

  // 1. 출석 관리 규칙 및 시스템 설계
  // 2. 출석확인 : 크루가 캠퍼스에 들어온 후 시스템에 출석 데이터가 저장된 시간을 기준
  // 3. 시간 : 24시간 형식
  // 4. 교육시간 : 월요일은 13:00~18:00, 화요일-금요일은 10:00~18:00
  // 5. 지각 : 해당 요일의 시작 시각으로부터 5분 초과
  // 6. 결석 : 해당 요일의 시작 시각으로부터 30분 초과 , 등교하지 않아 출석 기록이 없는 날
  // 7. 지각 3회는 결석 1회로 간주한다.
  // 8. 경고 대상자: 결석 2회 이상
  // 9. 면담 대상자: 결석 3회 이상
}

export default AttendanceCheck;

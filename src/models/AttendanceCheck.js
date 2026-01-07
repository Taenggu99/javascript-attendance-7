import { Random, Console } from "@woowacourse/mission-utils";
import DataLoader from "../utils/DataLoader.js";
import Today from "../utils/Today.js";
//이름,날짜,시간

class AttendanceCheck {
  static async get_user_information() {
    const getToday = Today.findToday();
    if (getToday[2] === "토요일" || getToday[2] === "일요일") {
      throw new Error(
        `[ERROR] ${getToday[0]}월  ${getToday[1]}일  ${getToday[2]}은 등교일이 아닙니다.`
      );
    }

    //1. 닉네입 입력받기
    const 닉네임 = await Console.readLineAsync("\n닉네임을 입력해 주세요\n");
    //2. 등교시간 입력받기
    const 등교시간 = await Console.readLineAsync(
      "\n등교 시간을 입력해 주세요\n"
    );

    //3. 출석날짜 및 시간 출력 ex)12월 05일 화요일 09:59 (출석)
    Console.print(
      `${getToday[0]}월  ${getToday[1]}일  ${getToday[2]} ${등교시간} (출석)`
    );
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

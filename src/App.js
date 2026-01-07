import { Random, Console } from "@woowacourse/mission-utils";
import DataLoader from "./utils/DataLoader.js";
import AttendanceCheck from "./models/AttendanceCheck.js";
import AttendanceRecord from "./models/AttendanceRecord.js";
import AttendanceRevise from "./models/AttendanceRevise.js";
// import WarningPeople from "./models/WarningPeople.js";

import Today from "./utils/Today.js";
class App {
  async run() {
    // 1. 오늘 날짜 출력 ex)`오늘은 ${month}월 ${date}일 ${day_map[day]}입니다. 기능을 선택해 주세요.`
    const getToday = Today.findToday();
    Console.print(
      `오늘은 ${getToday[0]}월 ${getToday[1]}일 ${getToday[2]}입니다. 기능을 선택해 주세요.`
    );
    const category = await Console.readLineAsync(
      "1. 출석 확인\n2. 출석 수정\n3. 크루별 출석 기록 확인\n4. 제적 위험자 확인\nQ. 종료\n"
    );
    selectCategoryFunction(category);
    function selectCategoryFunction(category) {
      switch (category) {
        case "1":
          AttendanceCheck.get_user_information();
          break;
        case "2":
          AttendanceRevise;
          break;

        case "3":
          AttendanceRecord.attendanceCheck();

          break;

        case "4":
          WarningPeople;
          break;
        case "Q":
          Console.print("종료");
          break;
      }
    }
    // const data = DataLoader.loadAttendanceCsv("public/attendances.csv");
    // Console.print(data);
    // AttendanceCheck.attendanceCheck();

    // 캠퍼스 운영시간 :  매일 08:00~23:00 ( 주말 및 공휴일에는 출석을 받지 않는다. )
    // 제적 대상자: 결석 5회 초과
    // 출석시스템 : 등록된 크루와 12월 출석기록 확인하기 `파일(attendances.csv)`
    // 프로그램 종료 : 프로그램은 사용자가 종료할 때까지 종료되지 않으며, 해당 기능을 수행한 후 초기 화면으로 돌아간다.
  }
}
export default App;

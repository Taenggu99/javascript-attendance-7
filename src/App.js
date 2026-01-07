import { Random, Console, DateTimes } from "@woowacourse/mission-utils";
import DataLoader from "./utils/DataLoader.js";
import AttendanceCheck from "./models/AttendanceCheck.js";
import AttendanceRecord from "./models/AttendanceRecord.js";
import AttendanceRevise from "./models/AttendanceRevise.js";
import TimeTable from "./models/TimeTable.js";
import Today from "./utils/Today.js";
// import WarningPeople from "./models/WarningPeople.js";

class App {
  async run() {
    let isRunning = true;
    while (true) {
      // 1. 오늘 날짜 출력 ex)`오늘은 ${month}월 ${date}일 ${day_map[day]}입니다. 기능을 선택해 주세요.`
      const today = Today.findToday();

      const category = await Console.readLineAsync(
        `오늘은 ${today[0]}월 ${today[1]}일 ${today[2]}입니다. \n기능을 선택해 주세요.\n1. 출석 확인\n2. 출석 수정\n3. 크루별 출석 기록 확인\n4. 제적 위험자 확인\nQ. 종료\n`
      );

      if (["Q", "q"].includes(category)) {
        break;
      }
      this.checkCategory(category);
      await this.selectCategoryFunction(category, today);
    }
  }
  checkCategory(category) {
    const allowedCategories = ["1", "2", "3", "4", "Q", "q"]; // 허용된 값 리스트

    if (!allowedCategories.includes(category)) {
      throw new Error("[ERROR] 잘못된 형식을 입력하였습니다.");
    }
  }

  async selectCategoryFunction(category, today) {
    switch (category) {
      case "1":
        await AttendanceCheck.get_user_information();
        break;
      case "2":
        await AttendanceRevise();
        break;

      case "3":
        await AttendanceRecord.getUser_AttendanceRecord_Information();

        break;

      case "4":
        WarningPeople;
        break;
      case "Q":
        break;
      // case "a":
      // await  DataLoader.dataTrimming();
      //   break;
      // case "t":
      //   await TimeTable.checkTardiness(getToday);
      //   break;
    }
  }
}
// const data = DataLoader.loadAttendanceCsv("public/attendances.csv");
// Console.print(data);
// AttendanceCheck.attendanceCheck();

// 캠퍼스 운영시간 :  매일 08:00~23:00 ( 주말 및 공휴일에는 출석을 받지 않는다. )
// 제적 대상자: 결석 5회 초과
// 출석시스템 : 등록된 크루와 12월 출석기록 확인하기 `파일(attendances.csv)`
// 프로그램 종료 : 프로그램은 사용자가 종료할 때까지 종료되지 않으며, 해당 기능을 수행한 후 초기 화면으로 돌아간다.

export default App;

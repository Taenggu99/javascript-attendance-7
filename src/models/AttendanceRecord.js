import { Random, Console, DateTimes } from "@woowacourse/mission-utils";
import DataLoader from "../utils/DataLoader.js";
//이름,날짜,시간

class AttendanceRecord {
  static splitTableOfUsers(userName) {
    const data = DataLoader.loadAttendanceCsv("public/attendances.csv");
    const usersFullRecord = Object.groupBy(data, ({ nickname }) => nickname);
    const userFullRecord = usersFullRecord[userName];
    const userTimeRecord = userFullRecord.map(
      (UserRecord) => UserRecord.datetime
    );
    // 배열 순서대로 정렬
    userTimeRecord.sort();

    return userTimeRecord;
  }
  static spliteTableOfUser(userTimeRecord) {
    const changeUserTimeRecord = [];
    const newTimeRecord = [];

    for (let i = 0; i < userTimeRecord.length; i++) {
      const [fullDate, time] = userTimeRecord[i].split(" ");
      const [year, month, date] = fullDate.split("-");
      newTimeRecord.push([year, month, date, time]);
      changeUserTimeRecord.push(`${month}월 ${date}일 000일 ${time}`);
    }

    return [changeUserTimeRecord, newTimeRecord];
  }

  static async getUser_AttendanceRecord_Information() {
    // const takeUserdata = this.splitTableOfUser();

    // Console.print(takeUserdata);
    const userName = await Console.readLineAsync("\n닉네임을 입력해 주세요\n");

    const userTimeRecord = this.splitTableOfUsers(userName);
    // Console.print(userTimeRecord);
    Console.print(`이번 달 ${userName}의 출석 기록입니다.`);
    // Console.print(userTimeRecord.length);
    const outputUserTime = this.spliteTableOfUser(userTimeRecord);
    Console.print(outputUserTime[0].join("\n"));
    // const showResult = findFullday(year, date, time);
    // Console.print(showResult);
  }
  //   닉네임을 입력해 주세요.
  // 빙티

  // 이번 달 빙티의 출석 기록입니다.

  // 12월 02일 월요일 13:00 (출석)
  // 12월 03일 화요일 10:07 (지각)
  // 12월 04일 수요일 10:02 (출석)
  // 12월 05일 목요일 10:06 (지각)
  // 12월 06일 금요일 10:01 (출석)
  // 12월 09일 월요일 --:-- (결석)
  // 12월 10일 화요일 10:03 (출석)
  // 12월 11일 수요일 --:-- (결석)
  // 12월 12일 목요일 --:-- (결석)
  // 12월 13일 금요일 10:02 (출석)

  // 출석: 3회
  // 지각: 0회
  // 결석: 3회

  // **면담 대상자**입니다.
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

export default AttendanceRecord;

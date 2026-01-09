import { Console } from "@woowacourse/mission-utils";
import DataLoader from "../utils/DataLoader.js";
import TimeTable from "./TimeTable.js";

class WarningPeople {
  /**
   * 모든 크루의 출석 기록을 분석하여 제적 위험자를 추출합니다.
   */
  static getWarnningUserList() {
    const data = DataLoader.loadAttendanceCsv("public/attendances.csv");
    // 닉네임별로 데이터 그룹화
    const usersFullRecord = Object.groupBy(data, ({ nickname }) => nickname);
    const nicknames = Object.keys(usersFullRecord);

    const warningResults = [];

    nicknames.forEach((name) => {
      let tardyCount = 0;
      let absenceCount = 0;

      // 각 크루의 출석 기록 순회
      usersFullRecord[name].forEach((record) => {
        const [fullDate, time] = record.datetime.split(" ");
        const dateObj = new Date(fullDate);
        const day = dateObj.getDay(); // 요일 계산
        const [hour, minute] = time.split(":").map(Number);

        // TimeTable 로직을 통해 상태 판정 (구조 분해 할당으로 문자열만 추출)
        const [result] = TimeTable.checkingTime(day, hour, minute);

        if (result === "지각") tardyCount++;
        if (result === "결석") absenceCount++;
      });

      // 💡 핵심: 지각 3회를 결석 1회로 환산 (내림 계산)
      const totalAbsence = absenceCount + Math.floor(tardyCount / 3);

      // 경고 대상(총 결석 2회 이상)인 경우만 리스트에 담기
      if (totalAbsence >= 2) {
        let status = "";
        if (totalAbsence >= 5) status = "제적";
        else if (totalAbsence >= 3) status = "면담";
        else if (totalAbsence >= 2) status = "경고";

        warningResults.push({
          name,
          tardy: tardyCount,
          absence: absenceCount,
          totalAbsence,
          status,
        });
      }
    });

    // 💡 정렬: 총 결석 횟수 내림차순 -> 이름 오름차순
    return warningResults.sort((a, b) => {
      if (b.totalAbsence !== a.totalAbsence)
        return b.totalAbsence - a.totalAbsence;
      return a.name.localeCompare(b.name);
    });
  }

  /**
   * 4번 메뉴 선택 시 실행되는 메인 출력 메서드
   */
  static async warnning_AttendanceInfo() {
    Console.print("\n제적 위험자 조회 결과");

    const warningList = this.getWarnningUserList();

    if (warningList.length === 0) {
      Console.print("제적 위험자가 없습니다.");
    } else {
      warningList.forEach((user) => {
        // 요구하신 형식: - 이름: 결석 X회, 지각 Y회 (상태)
        Console.print(
          `- ${user.name}: 결석 ${user.absence}회, 지각 ${user.tardy}회 (${user.status})`
        );
      });
    }
    Console.print(""); // 하단 여백
  }
}

export default WarningPeople;

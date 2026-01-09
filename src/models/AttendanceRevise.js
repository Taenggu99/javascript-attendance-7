import { Random, Console, DateTimes } from "@woowacourse/mission-utils";
import DataLoader from "../utils/DataLoader.js";

class AttendanceRevise {
  static async get_AttendanceInfo() {}

  static getRecordUserList(fix_user_name, fix_date, hope_hours, hope_minutes) {
    const data = DataLoader.loadAttendanceCsv("public/attendances.csv");
    //모든 데이터 다 받아오기
    const usersFullRecord = Object.groupBy(data, ({ nickname }) => nickname);

    //유저 네임과 동일한 시간 데이터 목록만 받아오기
    const userFullRecord = usersFullRecord[fix_user_name];
    if (!userFullRecord) {
      throw new Error("[ERROR] 등록되지 않은 닉네임입니다.");
    }
    const userTimeRecord = userFullRecord.map(
      (UserRecord) => UserRecord.datetime
    );

    //유저 이름만 받아오기 (기록에 없는 유저 입력시 에러처리)
    const keys = Object.keys(usersFullRecord);
    // 배열 순서대로 정렬
    const sortUserTimeRecord = userTimeRecord.sort();

    //시간바꾸기 테이블 only date, hour, minutes
    let renewRecord = [];
    // const eachline = userTimeRecord.splite(",");
    for (let i = 0; i < userTimeRecord.length; i++) {
      const [year_month_date, time] = userTimeRecord[i].split(" ");
      const [year, month, date] = year_month_date.split("-");
      const [hours, minutes] = time.split(":");
      renewRecord.push([month, date, hours, minutes]);
    }
    let indexline = [];
    let oldReviseList = [];
    if (fix_date) {
      // findIndex()를 사용하여 조건에 맞는 첫 번째 요소의 인덱스를 찾습니다.
      const targetValue = Number(fix_date);
      const formattedNum = ("0" + targetValue).slice(-2);
      console.log("formattedNum-->", formattedNum);
      const index = renewRecord.findIndex((item) => item[1] === formattedNum);
      console.log("index-->", index);
      console.log(123, renewRecord[index]);

      oldReviseList.push(renewRecord[index]);
      console.log("oldReviseList>>>>>", oldReviseList);
      indexline = renewRecord[index];
      // console.log(fix_date, index, indexline);

      console.log("hope_hours", hope_hours);
      console.log("hope_minutes", hope_minutes);
      if (hope_hours < 10) {
        hope_hours = String(hope_hours).padStart(2, "0");
      } else {
        hope_hours = String(hope_hours);
      }

      if (hope_minutes < 10) {
        hope_minutes = String(hope_minutes).padStart(2, "0");
      } else {
        hope_minutes = String(hope_minutes);
      }
      renewRecord[index][2] = hope_hours;
      renewRecord[index][3] = hope_minutes;
      console.log(
        "맞짱뜨자",
        renewRecord,
        " ->>>>>>",
        oldReviseList,
        renewRecord[index],
        " ->",
        renewRecord[index][2],
        " ->",
        renewRecord[index][3]
      );
      return [oldReviseList, renewRecord[index]];
    }

    return [keys, sortUserTimeRecord, renewRecord, indexline];
  }

  static async Fix_AttendanceInfo() {
    const fix_user_name = await Console.readLineAsync(
      "출석을 수정하려는 크루의 닉네임을 입력해 주세요.\n"
    );

    const get_record_info = this.getRecordUserList(fix_user_name);
    // 기록 리스트에 있는지 확인
    const pickname = get_record_info[0];
    const user_time_record = get_record_info[1];

    const renewRecord = get_record_info[2];

    console.log("renewRecord:", renewRecord);

    const month = renewRecord[0];
    const date = renewRecord[1];
    const indexofline = get_record_info[3];

    // console.log(pickname);
    // console.log(user_time_record);
    // console.log("이건 renewRecord -> ", renewRecord);

    // console.log(hope_date);

    const fix_date = await Console.readLineAsync(
      "수정하려는 날짜(일)를 입력해 주세요.\n"
    );

    const fix_time_when = await Console.readLineAsync(
      "언제로 변경하겠습니까?\n"
    );
    const [hope_hours, hope_minutes] = fix_time_when.split(":");

    const hope_date = this.getRecordUserList(
      fix_user_name,
      fix_date,
      Number(hope_hours),
      Number(hope_minutes)
    );
    // const newReviseList = this.getRecordUserList(
    //   false,
    //   false,
    //   hope_hours,
    //   hope_minutes
    // );

    const newReviseMonth = hope_date[0];
    const newReviseDate = hope_date[1];
    const newReviseHour = hope_date[2];

    const newReviseTime = hope_date[3];

    const day_map = {
      0: "일요일",
      1: "월요일",
      2: "화요일",
      3: "수요일",
      4: "목요일",
      5: "금요일",
      6: "토요일",
    };
    let fix_date_line = [];

    // console.log("indexofline ->", indexofline);
    fix_date_line = indexofline;
    // console.log(
    //   "indexofline ->",
    //   indexofline,
    //   "fix_date_line - > ",
    //   fix_date_line
    // );
    // console.log("이 아래는 getRecordUserList 호출한거임 ");
    // this.getRecordUserList(fix_user_name, fix_date, hope_hours, hope_minutes);

    // const daytext = day_map[day];
    // console.length("oldReviseList>>>>>", oldReviseList);

    const oldmonth = oldReviseList[0];
    const olddate = oldReviseList[1];
    newReviseMonth;
    newReviseDate;
    newReviseHour;
    newReviseTime;

    const day = (olddate - 1) % 6; //창호띠
    const daytext = day_map[day];
    Console.print(
      `${oldmonth}월 ${olddate}일 ${daytext} 10:07 (지각) -> ${newReviseHour}:${newReviseTime} (출석) 수정 완료!`
    );
  }
}

export default AttendanceRevise;

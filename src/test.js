import { Random, Console } from "@woowacourse/mission-utils";

// const today = new Date();

// const year = today.getFullYear();
// const month = today.getMonth() + 1;
// const date = today.getDate();
// const day = today.getDay();

// // 함수의 구조: 인자를 받는 곳, 실행되는 코드 영역
// function numtoday(num, type) {
//   const day_map_type1 = {
//     0: "일",
//     1: "월",
//     2: "화",
//     3: "수",
//     4: "목",
//     5: "금",
//     6: "토",
//   };
//   const day_map_type2 = {
//     0: "일요일",
//     1: "월요일",
//     2: "화요일",
//     3: "수요일",
//     4: "목요일",
//     5: "금요일",
//     6: "토요일",
//   };

//   if (type === "simple") {
//     return day_map_type1[num];
//   } else {
//     return day_map_type2[num];
//   }
// }

// const types = numtoday(3, "full");

// console.log(types);

// const fullDateLine = `${month}월 ${date}일 ${numtoday(day)}요일입니다.`;

// Console.print(fullDateLine);

const today = new Date();

let year = today.getFullYear(); //년도
let month = today.getMonth() + 1;
let date = today.getDate();
let day = today.getDay();

const day_map = {
  0: "일요일",
  1: "월요일",
  2: "화요일",
  3: "수요일",
  4: "목요일",
  5: "금요일",
  6: "토요일",
};

Console.print(
  `오늘은 ${month}월 ${date}일 ${day_map[day]}입니다. 기능을 선택해 주세요.`
);

import { DateTimes } from "@woowacourse/mission-utils";
import moduleName from "module";

// const today = new Date();
const today = DateTimes.now();
let month = today.getMonth() + 1;
let date = today.date;
let day = today.day;
let time = today.time;

// console.log(month, date, day, time);
console.log(today);

import fs from "fs";
import path from "path";
//이름,날짜,시간

class DataLoader {
  static loadAttendanceCsv(filePathName) {
    try {
      const filePath = path.join(process.cwd(), filePathName);
      // console.log("🔍 지금 찾고 있는 경로:", filePath);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      return fileContent
        .split("\n")
        .slice(1) // 헤더 제외
        .filter((line) => line.trim() !== "")
        .map((line) => {
          const [nickname, datetime] = line.split(",");
          return { nickname, datetime: datetime.trim() };
        });
    } catch (error) {
      throw new Error("[ERROR] 파일을 읽어오는 중 문제가 발생했습니다.");
    }
  }
}

export default DataLoader;

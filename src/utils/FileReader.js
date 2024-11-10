import fs from "fs/promises";

class FileReader {
  static async readFile(filePath) {
    try {
      const content = await fs.readFile(filePath, "utf-8");
      const lines = content.split("\n");
      const headers = lines[0].trim().split(",");

      return lines
        .slice(1)
        .filter((line) => line.trim())
        .map((line) => {
          const values = line.trim().split(",");
          return headers.reduce((obj, header, index) => {
            obj[header] = values[index];
            return obj;
          }, {});
        });
    } catch (error) {
      throw new Error(`파일을 읽는 중 오류가 발생했습니다: ${error.message}`);
    }
  }
}

export default FileReader;

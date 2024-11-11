import {Console} from "@woowacourse/mission-utils";
import App from "../src/App.js";

describe("편의점", () => {
  beforeEach(() => {
    Console.print = jest.fn();
    Console.readLineAsync = jest.fn();
  });

  afterEach(() => {
    Console.print.mockClear();
    Console.readLineAsync.mockClear();
  });

  test("파일에 있는 상품 목록 출력", async () => {
    const app = new App(new Date(), true);
    await app.run();

    expect(Console.print).toHaveBeenCalledWith(
      "🏪 편의점에 오신 것을 환영합니다!",
      ""
    );
  });
});

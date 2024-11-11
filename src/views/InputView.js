import {Console} from "@woowacourse/mission-utils";

class InputView {
  static async readPurchaseInput() {
    const input = await Console.readLineAsync(
      "\n구매할 상품과 수량을 입력해 주세요."
    );
    return input;
  }

  static async readYesOrNo() {
    try {
      const input = await Console.readLineAsync("");
      const upperInput = input.toUpperCase();
      if (upperInput !== "Y" && upperInput !== "N") {
        throw new Error("[ERROR] Y 또는 N을 입력해 주세요.");
      }
      return upperInput;
    } catch (error) {
      Console.print(error.message, "");
      return await this.readYesOrNo();
    }
  }
}

export default InputView;

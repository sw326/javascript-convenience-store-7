import {Console} from "@woowacourse/mission-utils";

class InputView {
  static async readPurchaseInput() {
    const input = await Console.readLine(
      "\n구매할 상품과 수량을 입력해 주세요."
    );
    return input;
  }

  static async readYesOrNo(message) {
    const input = await Console.readLine(message);
    return input.toUpperCase();
  }
}

export default InputView;

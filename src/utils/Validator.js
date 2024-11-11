class Validator {
  static validatePurchaseInput(input) {
    if (!this.isValidFormat(input)) {
      throw new Error(
        "[ERROR] 입력 형식이 올바르지 않습니다. 다시 입력해 주세요."
      );
    }
  }

  static isValidFormat(input) {
    const pattern = /^\[[\w가-힣]+-\d+\](?:,\[[\w가-힣]+-\d+\])*$/;
    return pattern.test(input);
  }

  static parsePurchaseInput(input) {
    return input.match(/\[([\w가-힣]+-\d+)\]/g).map((item) => {
      const [name, quantity] = item.slice(1, -1).split("-");
      return {name, quantity: Number(quantity)};
    });
  }
}

export default Validator;

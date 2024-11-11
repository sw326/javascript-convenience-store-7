import {Console} from "@woowacourse/mission-utils";

class OutputView {
  static printWelcome() {
    Console.print("🏪 편의점에 오신 것을 환영합니다!");
  }

  static formatPrice(price) {
    return price.toLocaleString();
  }

  static formatProduct(product) {
    const quantity =
      product.quantity === 0 ? "재고 없음" : `${product.quantity}개`;
    const price = this.formatPrice(product.price);
    const promotion = product.promotion ? ` ${product.promotion}` : "";

    return `- ${product.name} ${price}원 ${quantity}${promotion}`;
  }

  static printProducts(products) {
    Console.print("\n=== 상품 목록 ===");
    products.forEach((product) => {
      Console.print(this.formatProduct(product));
    });
    Console.print("");
  }

  static printPromotionSuggestion(itemsNeeded, productName) {
    Console.print(
      `\n${itemsNeeded}개를 추가 구매하시면 프로모션 혜택을 받으실 수 있습니다. 추가 구매하시겠습니까? (Y/N)`
    );
  }

  static printRegularPriceConfirmation() {
    Console.print(
      "\n일부 수량은 프로모션 적용이 불가능합니다. 정가로 구매하시겠습니까? (Y/N)"
    );
  }
}

export default OutputView;

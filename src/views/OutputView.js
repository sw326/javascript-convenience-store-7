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
}

export default OutputView;

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

  static printMembershipQuestion() {
    Console.print("\n멤버십 할인을 적용하시겠습니까? (Y/N)");
  }

  static printReceipt(orderSummary) {
    this.printPurchaseDetails(orderSummary.purchases);
    this.printPromotionItems(orderSummary.purchases);
    this.printAmountDetails(orderSummary);
  }

  static printPurchaseDetails(purchases) {
    Console.print("\n=== 구매 상품 내역 ===");
    purchases.forEach((purchase) => {
      const price = this.formatPrice(
        purchase.product.price * purchase.quantity
      );
      Console.print(
        `${purchase.product.name} ${purchase.quantity}개 ${price}원`
      );
    });
  }

  static printPromotionItems(purchases) {
    Console.print("\n=== 증정 상품 내역 ===");
    purchases.forEach((purchase) => {
      if (purchase.promotion) {
        const {freeItems} = this.calculatePromotionItems(purchase);
        if (freeItems > 0) {
          Console.print(`${purchase.product.name} ${freeItems}개`);
        }
      }
    });
  }

  static calculatePromotionItems(purchase) {
    const sets = Math.floor(purchase.quantity / purchase.promotion.buy);
    return {
      freeItems: sets * purchase.promotion.get,
    };
  }

  static printAmountDetails(orderSummary) {
    Console.print("\n=== 금액 정보 ===");
    Console.print(`총구매액: ${this.formatPrice(orderSummary.totalAmount)}원`);

    if (orderSummary.promotionDiscount > 0) {
      Console.print(
        `행사할인: -${this.formatPrice(orderSummary.promotionDiscount)}원`
      );
    }

    if (orderSummary.membershipDiscount > 0) {
      Console.print(
        `멤버십할인: -${this.formatPrice(orderSummary.membershipDiscount)}원`
      );
    }

    Console.print(`내실돈: ${this.formatPrice(orderSummary.finalAmount)}원`);
  }

  static printAdditionalPurchaseQuestion() {
    Console.print("\n추가 구매하시겠습니까? (Y/N)");
  }
}

export default OutputView;

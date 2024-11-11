import Store from "./models/Store.js";
import OutputView from "./views/OutputView.js";
import InputView from "./views/InputView.js";
import Validator from "./utils/Validator.js";
import PromotionManager from "./models/PromotionManager.js";
import MembershipManager from "./models/MembershipManager.js";

class App {
  constructor() {
    this.store = new Store();
    this.promotionManager = new PromotionManager(this.store);
    this.membershipManager = new MembershipManager();
  }

  async run() {
    await this.store.initialize();
    this.displayWelcomeMessage();
    await this.processPurchase();
  }

  displayWelcomeMessage() {
    OutputView.printWelcome();
    OutputView.printProducts(this.store.getProducts());
  }

  async processPurchase() {
    try {
      const input = await InputView.readPurchaseInput();
      Validator.validatePurchaseInput(input);
      const purchases = Validator.parsePurchaseInput(input);

      const processedPurchases = await this.processPromotions(purchases);
      const orderSummary = this.calculateOrderSummary(processedPurchases);

      await this.processMembership(orderSummary);

      // 여기에 추후 영수증 출력과 재고 관리 로직이 추가될 예정입니다.
    } catch (error) {
      console.log(error.message);
      await this.processPurchase();
    }
  }

  calculateOrderSummary(processedPurchases) {
    let totalAmount = 0;
    let promotionDiscount = 0;

    processedPurchases.forEach((purchase) => {
      const itemTotal = purchase.product.price * purchase.quantity;
      totalAmount += itemTotal;

      if (purchase.promotion) {
        const {freeItems} = this.promotionManager.calculatePromotionQuantity(
          purchase.quantity,
          purchase.promotion
        );
        promotionDiscount += purchase.product.price * freeItems;
      }
    });

    return {
      purchases: processedPurchases,
      totalAmount,
      promotionDiscount,
      membershipDiscount: 0,
      finalAmount: totalAmount - promotionDiscount,
    };
  }

  async processMembership(orderSummary) {
    OutputView.printMembershipQuestion();
    const answer = await InputView.readYesOrNo();

    if (answer === "Y") {
      const regularAmount =
        orderSummary.totalAmount - orderSummary.promotionDiscount;
      const membershipDiscount =
        this.membershipManager.calculateDiscount(regularAmount);

      orderSummary.membershipDiscount = membershipDiscount;
      orderSummary.finalAmount -= membershipDiscount;
    }

    return orderSummary;
  }

  async processPromotions(purchases) {
    const processedPurchases = [];

    for (const purchase of purchases) {
      const product = this.store.validateProduct(
        purchase.name,
        purchase.quantity
      );
      const promotionResult = this.promotionManager.checkPromotionAvailability(
        product,
        purchase.quantity
      );

      if (promotionResult?.type === "ADDITIONAL_ITEMS_NEEDED") {
        OutputView.printPromotionSuggestion(
          promotionResult.itemsNeeded,
          product.name
        );
        const answer = await InputView.readYesOrNo();

        if (answer === "Y") {
          purchase.quantity += promotionResult.itemsNeeded;
          this.store.validateProduct(purchase.name, purchase.quantity);
        }
      }

      processedPurchases.push({
        ...purchase,
        product,
        promotion: promotionResult?.promotion,
      });
    }

    return processedPurchases;
  }
}

export default App;

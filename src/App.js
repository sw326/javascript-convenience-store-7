import Store from "./models/Store.js";
import OutputView from "./views/OutputView.js";
import InputView from "./views/InputView.js";
import Validator from "./utils/Validator.js";
import PromotionManager from "./models/PromotionManager.js";

class App {
  constructor() {
    this.store = new Store();
    this.promotionManager = new PromotionManager(this.store);
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

      // 여기에 추후 멤버십 할인과 결제 로직이 추가될 예정입니다.
    } catch (error) {
      console.log(error.message);
      await this.processPurchase();
    }
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

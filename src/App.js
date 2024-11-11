import Store from "./models/Store.js";
import OutputView from "./views/OutputView.js";
import InputView from "./views/InputView.js";
import Validator from "./utils/Validator.js";
import PromotionManager from "./models/PromotionManager.js";
import MembershipManager from "./models/MembershipManager.js";
import {Console} from "@woowacourse/mission-utils";

class App {
  constructor(currentDate = new Date(), isTestMode = false) {
    this.store = new Store();
    this.promotionManager = new PromotionManager(this.store);
    this.membershipManager = new MembershipManager();
    this.currentDate = currentDate;
    this.isTestMode = isTestMode;
  }

  async run() {
    await this.store.initialize();
    this.displayWelcomeMessage();
    if (!this.isTestMode) {
      await this.startPurchaseLoop();
    }
  }

  async startPurchaseLoop() {
    do {
      await this.processPurchase();
    } while (await this.checkAdditionalPurchase());
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
      this.printReceipt(orderSummary);
      await this.updateInventory(orderSummary.purchases);
    } catch (error) {
      Console.print(error.message, "");
      if (!this.isTestMode) {
        await this.processPurchase();
      } else {
        throw error;
      }
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
        purchase.quantity,
        this.currentDate
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

  printReceipt(orderSummary) {
    OutputView.printReceipt(orderSummary);
  }

  async updateInventory(purchases) {
    purchases.forEach((purchase) => {
      const product = this.store.findProduct(purchase.name);
      product.quantity -= purchase.quantity;
    });
  }

  async checkAdditionalPurchase() {
    OutputView.printAdditionalPurchaseQuestion();
    const answer = await InputView.readYesOrNo();
    if (answer === "Y") {
      OutputView.printProducts(this.store.getProducts());
      return true;
    }
    return false;
  }
}

export default App;

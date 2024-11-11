import Store from "./models/Store.js";
import OutputView from "./views/OutputView.js";
import InputView from "./views/InputView.js";
import Validator from "./utils/Validator.js";

class App {
  constructor() {
    this.store = new Store();
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

      purchases.forEach(({name, quantity}) => {
        this.store.validateProduct(name, quantity);
      });

      // 여기에 추후 프로모션 처리와 결제 로직이 추가될 예정입니다.
    } catch (error) {
      console.log(error.message);
      await this.processPurchase();
    }
  }
}

export default App;

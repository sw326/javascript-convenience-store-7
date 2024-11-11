import Store from "./models/Store.js";
import OutputView from "./views/OutputView.js";

class App {
  constructor() {
    this.store = new Store();
  }

  async run() {
    await this.store.initialize();
    this.displayWelcomeMessage();
  }

  displayWelcomeMessage() {
    OutputView.printWelcome();
    OutputView.printProducts(this.store.getProducts());
  }
}

export default App;

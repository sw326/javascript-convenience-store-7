import Store from "./models/Store.js";

class App {
  constructor() {
    this.store = new Store();
  }

  async run() {
    await this.store.initialize();
    // 여기에 추가 로직이 들어갈 예정입니다.
  }
}

export default App;

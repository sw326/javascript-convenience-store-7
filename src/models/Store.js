import FileReader from "../utils/FileReader.js";
import Product from "./Product.js";
import Promotion from "./Promotion.js";

class Store {
  constructor() {
    this.products = [];
    this.promotions = [];
  }

  async initialize() {
    await this.loadProducts();
    await this.loadPromotions();
  }

  async loadProducts() {
    const productsData = await FileReader.readFile("public/products.md");
    this.products = productsData.map((data) => new Product(data));
  }

  async loadPromotions() {
    const promotionsData = await FileReader.readFile("public/promotions.md");
    this.promotions = promotionsData.map((data) => new Promotion(data));
  }

  getProducts() {
    return this.products;
  }

  getPromotions() {
    return this.promotions;
  }

  validateProduct(name, quantity) {
    const product = this.findProduct(name);
    if (!product) {
      throw new Error("[ERROR] 존재하지 않는 상품입니다. 다시 입력해 주세요.");
    }
    if (quantity > product.quantity) {
      throw new Error(
        "[ERROR] 재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요."
      );
    }
    return product;
  }

  findProduct(name) {
    return this.products.find((product) => product.name === name);
  }
}

export default Store;

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
}

export default Store;

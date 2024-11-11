class PromotionManager {
  constructor(store) {
    this.store = store;
  }

  getValidPromotion(product, currentDate = new Date()) {
    if (!product.promotion) return null;

    const promotion = this.store
      .getPromotions()
      .find(
        (p) => p.name === product.promotion && p.isValidPeriod(currentDate)
      );

    return promotion;
  }

  calculatePromotionQuantity(quantity, promotion) {
    const sets = Math.floor(quantity / promotion.buy);
    return {
      promotionSets: sets,
      freeItems: sets * promotion.get,
      remainingItems: quantity % promotion.buy,
    };
  }

  checkPromotionAvailability(product, quantity) {
    const promotion = this.getValidPromotion(product);
    if (!promotion) return null;

    const {promotionSets, remainingItems} = this.calculatePromotionQuantity(
      quantity,
      promotion
    );

    if (
      remainingItems > 0 &&
      quantity + (promotion.buy - remainingItems) >= promotion.buy
    ) {
      return {
        type: "ADDITIONAL_ITEMS_NEEDED",
        itemsNeeded: promotion.buy - remainingItems,
        promotion,
      };
    }

    return {
      type: "PROMOTION_APPLICABLE",
      promotion,
      promotionSets,
    };
  }
}

export default PromotionManager;

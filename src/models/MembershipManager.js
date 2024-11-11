class MembershipManager {
  static DISCOUNT_RATE = 0.3;
  static MAX_DISCOUNT = 8000;

  calculateDiscount(amount) {
    const discountAmount = Math.floor(amount * MembershipManager.DISCOUNT_RATE);
    return Math.min(discountAmount, MembershipManager.MAX_DISCOUNT);
  }
}

export default MembershipManager;

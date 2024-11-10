class Promotion {
  constructor({name, buy, get, start_date, end_date}) {
    this.name = name;
    this.buy = Number(buy);
    this.get = Number(get);
    this.startDate = new Date(start_date);
    this.endDate = new Date(end_date);
  }

  isValidPeriod(date = new Date()) {
    return date >= this.startDate && date <= this.endDate;
  }
}

export default Promotion;

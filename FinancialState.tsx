class FinancialEntry {
  public title:string;
  public value:number;
  constructor() {
    this.title = "";
    this.value = 0;
  }
}

export class IncomeEntry extends FinancialEntry {
  constructor() {
    super();
  }
}

export class ExpenseEntry extends FinancialEntry {
  constructor() {
    super();
  }
}

export class AssetEntry extends FinancialEntry {
  constructor() {
    super();
  }
}

export class StockEntry extends AssetEntry{
  public numShares:number;
  constructor(args: {
    numShares:number,
    ticker:string,
    pricePerShare:number,
  }) {
    super();
    this.title = args.ticker;
    this.numShares = args.numShares;
    this.value = args.numShares * args.pricePerShare;
  }
}

export class LiabilityEntry extends FinancialEntry {
  constructor() {
    super();
  }
}
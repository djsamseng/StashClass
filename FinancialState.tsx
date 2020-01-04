export class Stock {
  public title:string;
  public pricePerShare:number;
  constructor(args: {
    title:string,
    pricePerShare:number,
  }) {
    this.title = args.title;
    this.pricePerShare = args.pricePerShare;
  }
}

export class OwnedStock {
  public d_stock:Stock;
  private d_numShares:number;
  private d_purchaseTurn:number;
  private d_purchasePrice:number;
  constructor(args:{
    stock:Stock,
    numShares:number,
    purchaseTurn:number,
  }) {
    this.d_numShares = args.numShares;
    this.d_purchasePrice = args.stock.pricePerShare;
    this.d_purchaseTurn = args.purchaseTurn;
    this.d_stock = args.stock;
  }
  get numShares() {
    return this.d_numShares;
  }
  get pricePerShare() {
    return this.d_stock.pricePerShare;
  }
  get purchaseTurn() {
    return this.d_purchaseTurn;
  }
  get title() {
    return this.d_stock.title;
  }
  get value() {
    return this.d_stock.pricePerShare * this.d_numShares;
  }
}
export class FinancialState {
  public ownedStocks:Array<OwnedStock>;
  public cash:number;
  // loans
  // other liabilities

  // real estate
  // other assets
  constructor() {
    this.ownedStocks = [];
    this.cash = 0;
  }
  get cashFlow() {
    return this.ownedStocks.reduce((sum, stock) => {
      return sum + stock.value;
    }, 0);
  }
}

export class StockState {
  public stocks:Record<string,Stock>;
  constructor() {
    this.stocks = {};
  }
}
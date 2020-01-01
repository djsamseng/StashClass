import { TouchableHighlightBase } from "react-native";

class FinancialEntry {
  public title:string;
  protected d_value:number;
  constructor() {
    this.title = "";
    this.d_value = 0;
  }
  get value() {
    return this.d_value;
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
  private d_pricePerShare:number;
  constructor(args: {
    numShares:number,
    ticker:string,
    pricePerShare:number,
  }) {
    super();
    this.title = args.ticker;
    this.numShares = args.numShares;
    this.d_pricePerShare = args.pricePerShare;
    this.d_value = args.numShares * args.pricePerShare;
  }
  get pricePerShare() {
    return this.d_pricePerShare;
  }
  set pricePerShare(val) {
    this.d_pricePerShare = val;
    this.d_value = this.numShares * this.pricePerShare;
  }
}

export class LiabilityEntry extends FinancialEntry {
  constructor() {
    super();
  }
}
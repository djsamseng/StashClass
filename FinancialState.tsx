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

export class LiabilityEntry extends FinancialEntry {
  constructor() {
    super();
  }
}
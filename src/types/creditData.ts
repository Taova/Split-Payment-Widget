
interface ValueProps {
  value: number;
  string: string;
}

export interface CreditInfo {
  instalment_count: number;
  apr: ValueProps;
  total_with_tax: ValueProps;
  cost_of_credit: ValueProps;
  cost_of_credit_pct: ValueProps;
  grand_total: ValueProps;
  max_financed_amount: ValueProps;
  instalment_amount: ValueProps;
  instalment_fee: ValueProps;
  instalment_total: ValueProps;
}

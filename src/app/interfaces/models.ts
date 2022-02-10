export interface AuthStorage {
  token: string;
  exp: string;
  type: string;
  role: 'normal' | 'admin';
  username: string;
}

export interface User {
  role: 'normal' | 'admin';
}

export interface CheckServerStatusResponse {
  gecko_says: string;
}

export interface LoginResponse {
  exp: string;
  token: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface JWTParse {
  exp: number;
  role: 'normal' | 'admin';
  sub: string;
  iat: number;
}


export interface MarketsRequest {
  vs_currency: string;
  category: string;
}

export interface Roi {
  times: number;
  currency: string;
  percentage: number;
}

export interface Market {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: Roi | null,
  last_updated: string;
}

export interface Favorites {
  [username: string]: Market[];
}

// ⚠️ Before deploying to production:
// - Confirm correct BASE_URL
// - Set all required .env variables

// const isDev = process.env.NODE_ENV === "development";
// const BASE_URL = isDev
//   ? "http://localhost:3000/api"
//   : "https://sequra.com/api";

const BASE_URL = "http://localhost:8080";

export const CREDIT_AGREEMENT_URL = `${BASE_URL}/credit_agreements`;
export const SEQURA_EVENTS_URL = `${BASE_URL}/events`;

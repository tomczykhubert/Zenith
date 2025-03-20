declare module "*.json" {
  const value: import("./types/dictionary").Dictionary;
  export default value;
}

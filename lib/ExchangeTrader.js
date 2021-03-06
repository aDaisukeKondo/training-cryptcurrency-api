class ExchangeTrader {
  constructor(aConfig) {
    this.key = aConfig.apiKey;
    this.secret = aConfig.secret;
  }

  validatePair(aPairs, aSupportPairs) {
    if (!Array.isArray(aPairs)) {
      console.error(`Passed pairs is NOT type of Array: ${aPairs}`);
      return false;
    }

    return aPairs.every((aPair) => {
      if (typeof aPair !== 'string') {
        console.error(`Passed pair is NOT type of String: ${aPair}`);
        return false;
      }

      if (!aSupportPairs.some((aPAIR) => (aPAIR === aPair))) {
        console.error(`Passed pair is NOT valid pair type: ${aPair}`);
        return false;
      }
      return true;
    });
  };

  // public APIs
  getName() {
    console.log(`${this.constructor.name} is not implemented`);
    return 'no name';
  }

  async getTicker(aPair) {
    console.log(`${this.constructor.name} is not implemented: ${aPair}`);
  }

  async getTransactions(aPair) {
    console.log(`${this.constructor.name} is not implemented: ${aPair}`);
  }

  async getTransactions(aPair, aYYYYMMDD) {
    console.log(`${this.constructor.name} is not implemented: ${aPair}, ${aYYYYMMDD}`);
  }

  // private APIs
  async getAsset() {
    console.log(`${this.constructor.name} is not implemented`);
  }

  async getActiveOrders(aPair) {
    console.log(`${this.constructor.name} is not implemented: ${aPair}`);
  }

  async order(aPair, aPrice, aAmount, aSide, aType) {
    // aSide: 'sell' or 'buy'
    // aType: 'limit' or 'market'
    console.log(`${this.constructor.name} is not implemented: ${aPair}, ${aPrice}, ${aAmount}, ${aSide}, ${aType}`);
  }

  async cancelOrder(aPair, aOrderIds) {
    console.log(`${this.constructor.name} is not implemented: ${aPair}, ${aOrderIds}`);
  }

  async cancelAllOrders() {
    console.log(`${this.constructor.name} is not implemented`);
  }
}

module.exports = ExchangeTrader;

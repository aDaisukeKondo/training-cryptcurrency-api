const config = require('./config');

const BitBank = require('./lib/BitBank');
const Zaif = require('./lib/Zaif');

const sleep = require('await-sleep');
const moment = require('moment');

const LineNotifier = require('./lib/LineNotifier');
const notifier = new LineNotifier(config.line);

const bitbank = new BitBank(config.bitbank);
const zaif = new Zaif(config.zaif);

const rule = {
  interval: 5000,
  scenarios: [
    {
      trader: bitbank,
      pair: 'xrp_jpy',
      threashold: {
        max: 300,
        min: 220
      }
    },
    {
      trader: zaif,
      pair: 'btc_jpy',
      threashold: {
        max: 1780000,
        min: 1000000
      }
    }
  ]
};

const main = async () => {
  for (scenario of rule.scenarios) {
    const trader = scenario.trader;
    const pair = scenario.pair;

    const ticker = await trader.getTicker(pair);
    console.log(`[${moment().format('HH:mm:ss')}][${scenario.trader.getName()}] ${scenario.pair}: ${ticker.last}`);

    if (ticker.last > scenario.threashold.max) {
      notifier.alertPrice(pair, scenario.threashold.max, ticker.last, true);
    } else if (ticker.last < scenario.threashold.min) {
      notifier.alertPrice(pair, scenario.threashold.min, ticker.last, false);
    }
  }
}

// main loop;
(async () => {
  while (true) {
    main();
    await sleep(rule.interval);
  }
})();

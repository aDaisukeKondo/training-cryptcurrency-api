const rule = require('./config/rule');

const sleep = require('await-sleep');
const moment = require('moment');

const LineNotifier = require('./lib/LineNotifier');
const notifier = new LineNotifier(
  require('./config/secure').line
);

const printPrice = (aTraderName, aPair, aLast) => {
  console.log(`[${moment().format('HH:mm:ss')}][${aTraderName.padEnd(7)}] ${aPair}: ${aLast}`);
};

const actionAlert = async(aTrader, aAction) => {
  const pair = aAction.pair;

  let prevTicker = aTrader.prevTicker;
  const ticker = await aTrader.getTicker(pair);

  if (!prevTicker) {
    prevTicker = ticker;
  }

  printPrice(aTrader.getName(), pair, ticker.last);

  if (ticker.last > aAction.threashold.max && !(prevTicker.last > aAction.threashold.max)) {
    notifier.alertPrice(pair, aAction.threashold.max, ticker.last, true);
  } else if (ticker.last < aAction.threashold.min && !(prevTicker.last < aAction.threashold.min)) {
    notifier.alertPrice(pair, aAction.threashold.min, ticker.last, false);
  }
};

const main = async() => {
  for (const scenario of rule.scenarios) {
    if (!scenario.enabled) {
      continue;
    }

    switch (scenario.action.type) {
      case 'alert':
        actionAlert(scenario.trader, scenario.action);
        break;
      case 'trade':
        // not implement
        break;
      default:
        console.error(`invalid action type: ${scenario.action.type}`);
        return;
    }
  }
};

// main loop
(async() => {
  while (true) {
    await main().catch((aError) => {
      console.warn(aError);
    });
    await sleep(rule.interval);
  }
})();

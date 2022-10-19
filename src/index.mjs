import config from '../config.json' assert { type: 'json' };
import { Routes } from './constants.mjs';
import Logger from './logger.mjs';
import fetch from 'node-fetch';

async function start() {
   try {
      Logger.debug('Checking status...');

      const url = Routes.STATUS(config.accountId.checker, config.code);
      const res = await fetch(url, { headers: config.headers.checker });

      const { data } = await res.json().catch(() => ({})) || {};
      if (data?.message) {
         const full = data?.status === 'FULL';
         const color = full ? 'error' : 'success';

         Logger[color]('Payload Status:', full ? data.status.red : data.status.green);
         Logger[color]('Payload Message:', full ? data.message.red : data.message);

         if (!full) await redeem();
      }
   } catch (e) {
      Logger.error('Failed to check/redeem:', e.message);
   }

   Logger.debug(`Retrying in ${config.interval}ms.`);
   await new Promise(f => setTimeout(f, config.interval));
   start();
}

async function redeem() {
   Logger.debug('Attempting to redeem...');
   const url = Routes.REDEEM(config.accountId.redeemer, config.code);
   const payload = await fetch(url, { method: 'POST', headers: config.headers.redeemer });

   if (payload.status === 200) {
      Logger.success('Redeem Successful!');

      if (config.webhook !== '') {
         try {
            await fetch(config.webhook, {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({
                  content: (config.successMessage ?? '@everyone Successfully redeemed {code}.').replace('{code}', config.code)
               })
            });
         } catch (e) {
            Logger.error('Failed to contact webhook:', e.message);
         }
      }

      process.exit(-1);
   } else {
      Logger.error('Redeem failed.');
   }
}

start();

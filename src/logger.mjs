import 'lighter-colors';

export default class Logger {
   static log(...args) {
      return console.log('»'.gray, ...args);
   }

   static error(...args) {
      return console.error('»'.red, ...args);
   }

   static success(...args) {
      return console.log('»'.green, ...args);
   }

   static warn(...args) {
      return console.warn('»'.yellow, ...args);
   }

   static debug(...args) {
      return console.debug('»'.gray, ...args);
   }
}
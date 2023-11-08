/* jshint esversion: 6 */
/* jshint esversion: 8 */

if('serviceWorker' in navigator ){
    navigator.serviceWorker.register('./sw.js')
      .then( () => {
        console.log('Service worker registered!!');
      })
      .catch((error) => {
        console.log(`Error registering service workers: ${error}`);
      });
  }
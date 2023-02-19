import axios from 'axios';
export const instance = axios.create({
  baseURL: window.apiUrl ? window.apiUrl : "http://localhost:3000", // or https://whovox.com/ or http://localhost:3000
});

const whovoxUtils = {

    // Given an array of numbers and a max...
    // Pick a random sum (< max) from the set of all available sums in arr
    randomSumIn: (arr, max) => {
      const sets = [[]];
      const sums = [];
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0, len = sets.length; j < len; j++) {
          const candidateSet = sets[j].concat(arr[i]);
          const candidateSum = whovoxUtils.sum(candidateSet);
          if (candidateSum <= max) {
            sets.push(candidateSet);
            sums.push(candidateSum);
          }
        }
      }
      return sums[whovoxUtils.random(0, sums.length)];
    },

    // combine arrays function
    appendArray: (array,array1) => { // adds the items in array1
      // array1 can be any type
      // to the end of array
      var len,i;
      array1 = [].concat(array1); // ensure array1 is an array
      len = array1.length;
      i = 0;
      while(i < len){
        array[array.length] = array1[i++]; // this is 2* quicker than invoking push
        }
      return array;
    },

    shuffleArray: (array) => {
      var currentIndex = array.length, temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    },

    arrayRemove: (arr, value) => {
      return arr.filter(function(ele){
        return ele != value;
      });
    },

    formatTime: (time) => {
      const pad = (time, length) => {
        while (time.length < length) {
          time = '0' + time;
        }
        return time;
      }
      time = new Date(time);
      let s = time.getSeconds().toString();
      let ms = pad((time.getMilliseconds() / 10).toFixed(0), 2);
      return `${s}.${ms}`;
    },

    mysqlDate: (date) => {
      const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
      const jsDate = new Date(date);
      const jsDate2 = jsDate.toLocaleDateString("en-US", options);
      return jsDate2.toString();
    },

    toTitleCase: (str) => {
      return str.replace(
          /\w\S*/g,
          function(txt) {
              return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          }
      );
    },

    // INDEXEDDB GET AUDIO TO PUT

    putInDB: async (audioBlobs) => {
      return new Promise( function(resolve, reject) {

      // Open database
      const request = indexedDB.open('wvxDB', 1);

      // Generic error handler for all errors targeted at this DBs requests.
      request.onerror = function(event) {
        //console.error("Indexed DB error: " + event.target.errorCode);
        reject.error("Indexed DB error: " + event.target.errorCode);
      };

      // This event is only implemented in recent browsers
      request.onupgradeneeded = function(event) {

        // Save the IDBDatabase interface
        let wvxDB = event.target.result;
        // Create an objectStore for this database
        let objectStore = wvxDB.createObjectStore('clips', { keyPath: 'id' });
        // create index for clip and id
        objectStore.createIndex('id', ['id'], { unique: true });

      };

        // success block
        request.onsuccess = event => {

          // do something with request.result
          let wvxDB = event.target.result;
          // 1: transaction
          const transaction = wvxDB.transaction('clips', 'readwrite');
          // 2: transaction store
          const DBstore = transaction.objectStore('clips');
          // 3 loop through and add clips to db store
          for (let i = 0; i <= 4; i++) {
            DBstore.put({
              id: audioBlobs[i].id || '',
              dir: audioBlobs[i].dir,
              ext: audioBlobs[i].ext,
              clipname: audioBlobs[i].clipname,
              audio: audioBlobs[i].audio
            });
          }
          // complete
          transaction.oncomplete = function () {
            resolve(true);
            wvxDB.close();
          };

        };
      })
    },

    fetchAudio: async (dir, clip) => {
      let audio = new Audio();
      let ext;
      //console.log('fetch dir: ' + dir + ' clip: ' + clip.clipname);
      // can play ogg or mp3
      if (audio.canPlayType('audio/ogg; codecs="vorbis"')) {
        ext = '.ogg';
        }
      else {
        ext = '.mp3';
      }
      return new Promise((res, rej) => {
        instance.get('audio/' + dir + '/' + clip.clipname + ext)
          .then(function(resp) {
            //console.log('fetchAudio clipName: ' + clip.clipname);
            let retObj = {
              id: clip.id,
              dir: dir,
              ext: ext,
              clipname: clip.clipname,
              audio: resp.data
            }
            res(retObj)
          })
          .catch(function(error) {
            rej(error)
          })
      })

    },

  };

  export default whovoxUtils;

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
    }

  };

  export default whovoxUtils;

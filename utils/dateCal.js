
function dateCalc(){
    
    const currentTime = new Date();
    const currentOffset = currentTime.getTimezoneOffset();
    const ISTOffset = 330;
    const ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
    const hoursIST = ISTTime.getHours();
    const minutesIST = ISTTime.getMinutes();
    const day = currentTime.getUTCDay()+3;
    const month = currentTime.getUTCMonth()+1;
    const year = currentTime.getUTCFullYear();
   return `${day}/${month}/${year} ${hoursIST}:${minutesIST}`;
}

module.exports = {dateCalc};
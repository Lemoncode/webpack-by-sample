
const initTime = Date.now();

setInterval( () => {
    const interval = Math.round((Date.now() - initTime)/1000);
    clock(interval);
}, 1000);

const clock = (time:number = 0) => {
    document.getElementById("clock").innerHTML = `Recarga desde ${time} segundos`;
}

clock();

$("body").css("background-color", "lightSkyBlue");

const scores = [90, 75, 60, 99, 94, 30];

const handleOnClick = () => {
  const averageServicePromise = import(/* webpackChunkName averageService */ "./averageService");

  averageServicePromise.then(averageServiceModule => {
    const averageScore = averageServiceModule.getAvg(scores);
    const messageToDisplay = `average score ${averageScore}`;

    const element = document.createElement("div");
    element.innerText = messageToDisplay;

    document.getElementById("container").append(element);
  });
};

const button = document.createElement("button");
button.innerText = "Lazy loading sample";
button.onclick = handleOnClick;

document.getElementById("container").append(button);

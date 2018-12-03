$("body").css("background-color", "lightSkyBlue");

const scores = [90, 75, 60, 99, 94, 30];

const handleOnClick = () => {
  const averageServiceModule = import(/* webpackChunkName averageService */ "./averageService");

  averageServiceModule.then(x => {
    const averageScore = x.getAvg(scores);
    const messageToDisplay = `average score ${averageScore}`;

    const element = document.createElement("div");
    element.innerText = messageToDisplay;

    document.getElementById("container").append(element);
    console.log(messageToDisplay);
  });
};

const button = document.createElement("button");
button.innerText = "Lazy loading sample";
button.onclick = handleOnClick;

document.getElementById("container").append(button);

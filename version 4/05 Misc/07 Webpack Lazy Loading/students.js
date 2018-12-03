const averageServiceModule = import(/* webpackChunkName averageService */ "./averageService");

$("body").css("background-color", "lightSkyBlue");

const scores = [90, 75, 60, 99, 94, 30];

averageServiceModule.then(x => {
  const averageScore = x.getAvg(scores);
  const messageToDisplay = `average score ${averageScore}`;

  const element = document.createElement("div");
  element.innerText = messageToDisplay;

  document.getElementById("container").append(element);
  console.log(messageToDisplay);
});

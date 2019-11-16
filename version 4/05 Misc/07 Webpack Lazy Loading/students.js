$("body").css("background-color", "lightSkyBlue");

// getComponent function load the averageService module lazily, and return div element async with the average score:
const getComponent = () =>
  import(/* webpackChunkName "averageService" */ "./averageService").then(
    averageServiceModule => {
      const scores = [90, 75, 60, 99, 94, 30];
      const averageScore = averageServiceModule.getAvg(scores);
      const messageToDisplay = `average score ${averageScore}`;

      const element = document.createElement("div");
      element.innerText = messageToDisplay;

      return element;
    }
  );

// handleOnClick function will call the getComponent function and append the average score to container:
const handleOnClick = () => {
  getComponent().then(element =>
    document.getElementById("container").append(element)
  );
};

// Create a button to handle on click event and load the average score:
const button = document.createElement("button");
button.innerText = "Lazy loading sample";
button.onclick = handleOnClick;
document.getElementById("container").append(button);

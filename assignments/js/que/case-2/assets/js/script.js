var divs = ['#container1 > div', '#container2 > div:first-child', '#container2 > div:nth-child(2)', '#container2 > div:nth-child(3)',
            '#container2 > div:nth-child(4)', '#container3 > div'];
var colors = ['#FE0000', '#008001', '#0000FE', '#FFFF00', '#FFBFCD', '#EE82EF'];

function nextColor() {
    var lastColor = this.colors.pop();
    this.colors.unshift(lastColor);
}

renderQue();

function renderQue() {
    nextColor();
    for (let i in divs) {
        $(divs[i]).css('background-color', colors[i]);
    }
}

setInterval(renderQue, 1000);

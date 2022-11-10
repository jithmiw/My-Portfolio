var cueData={
    persons:['A', 'B', 'C', 'D', 'E', 'F'],
    nextPerson:function (){
        var lastPerson= this.persons.pop();
        this.persons.unshift(lastPerson);
    }
}

renderQue();
function renderQue(){
    $('#container').empty();
    for (let i = 0; i < cueData.persons.length; i++) {
        $('#container').append(`<div><h2>${cueData.persons[i]}</h2></div>`);
    }
    cueData.nextPerson();
}

// setInterval(renderQue,1000);

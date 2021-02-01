const socket = io("http://localhost:3000").connect();

document.getElementById("start").onclick = function() {
    socket.emit("start");
};

document.getElementById("chose0").onclick = function() {
    rad = document.getElementsByName("choseLocation");
    for (let i = 0; i < rad.length; i++) {
        if (rad[i].checked) {
            socket.emit("choseLocation", i+1);
            alert(i+1);
            break;
        }
    }
};

document.getElementById("chose").onclick = function() {
    rad1 = document.getElementsByName("chosePerson");
    for (let i = 0; i < rad1.length; i++) {
        if (rad1[i].checked) {
            socket.emit("chosePerson", i+1);
            alert(i+1);
            break;
        }
    }
};

socket.on("response", function(data) {
    // alert(data);
});
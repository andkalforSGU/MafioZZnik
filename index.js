//const { Socket } = require("dgram"); хз что, лучше не трогать
var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);

app.use("/static", express.static(__dirname + "/static"));

server.listen(3000);

app.get('/', function (request, respons) {
    respons.sendFile(__dirname + "/static/index.html");
});

let users = [];
let connections = [];

io.sockets.on("connection", function (socket) {
    console.log("connect");
    connections.push(socket);

    socket.on("disconnect", function (data) {
        connections.splice(connections.indexOf(socket), 1);
        console.log("disconnect");
    });

    socket.on("start", function () {
        //console.log(data);
        //socket.emit("response", "test");
        game(steps);
    });

    function game(steps) {
        startChoseF(steps[0]);
        console.log("\n next step \n");
        startGameF(steps[1]);
    };
    
    function startChoseF(choses) {
        choses.logic();
        choseLocationF(choses.choseLocation);
        chosePersonF(choses.chosePerson);
        whishesRolesF(choses.whishesRoles);
    };
    
    function startGameF(choses) {
        choses.logic();
        castRolesF(choses.castRoles);
        day0F(choses.day0);
    };
    
    function choseLocationF(chose) {
        chose.logic();
    
        socket.on("choseLocation", function (data) {
            console.log(data);
            //socket.emit("response", "test");
        });
    };
    
    function chosePersonF(chose) {
        chose.logic();

        socket.on("chosePerson", function (data) {
            console.log(data);
            //socket.emit("response", "test");
        });
    };
    
    function whishesRolesF(chose) {
        chose.logic();
    };
    
    function castRolesF(roles) {
        roles.logic();
    };
    
    function day0F(day0Logic) {
        day0Logic.logic();
        day0Morning(day0Logic.morning);
        day0Night(day0Logic.nigth);
    };
    
    function day0Morning(morningLogic) {
        morningLogic.logic();
    };
    
    function day0Night(nightLogic) {
        nightLogic.logic();
    };
});

startChose = {
    name: "start chose",
    logic() {
        console.log("старт выбора");
    },

    choseLocation: {
        name: "chose location",
        logic() {
            console.log("выбор локации");
        }
    },

    chosePerson: {
        name: "chose person",
        logic() {
            console.log("выбор персонажа");
        }
    },

    whishesRoles: {
        name: "whishes roles",
        logic() {
            console.log("выбор пожелания в роли");
        }
    }
};

startGame = {
    name: "start game",
    logic() {
        console.log("старт игры");
    },

    castRoles: { //расспределение ролей
        name:"cast roles",
        logic() {
            console.log("выбор роли");
        }
    },

    day0: {
        name: "day 0",
        logic() {
            console.log("\nday 0:");
        },
        morning: {
            name: "morning",
            logic() {
                console.log("(утро) знакомство");
            }
        },
        day: {
            name: "day"
        },
        evening: {
            name: "evening"
        },
        nigth: {
            name: "nigth",
            logic() {
                console.log("ночь 1");
            }
        }
    }
}

const steps = [startChose, startGame];
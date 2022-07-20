const carCanvas = document.getElementById("carCanvas");
carCanvas.width = 200;

const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width = 300;

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);
// const car = new Car(road.getLaneCenter(1), 100, 30, 50, "AI");
const N = 1000
const cars = generateCars(N);

let traffic = [
    new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(0), -300, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(0), -300, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(2), -370, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -500, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -500, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(2), -700, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(2), -700, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(0), -700, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(0), -700, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(2), -900, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(2), -900, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -900, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -900, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(0), -1200, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(0), -1200, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -1200, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -1200, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(0), -1300, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(0), -1300, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(0), -1300, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -1300, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -1300, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(2), -1400, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(2), -1400, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -1500, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -1500, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -1600, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(0), -1800, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(2), -1970, 30, 50, "DUMMY", 2),
];
let bestCar =  cars[0];
let bestTraffic = traffic[traffic.length - 1];

if(localStorage.getItem("bestBrain")){
    for(let i = 0; i < cars.length; i++){
        cars[i].brain = JSON.parse(
            localStorage.getItem("bestBrain")
        );
        if(i != 0){
            NeuralNetwork.mutate(cars[i].brain,0.3)
        }
    }
}

// random traffic generator code, which tends to 
// generate traffic in the same places
// function generateTraffic(fromHeight = 100){
//     console.log("generate traffic called")

//     const nTraffic = 16;
//     let traffi = [];
//     let laneBackup = 0;
//     let heightBackup = 0;

//     while (traffi.length < nTraffic){
//         const lane = Math.floor(Math.random() * 3);
//         const height = Math.floor(Math.random() * (fromHeight + 1000)  );

//         if (lane != laneBackup){
//             console.log("pushing");
//             traffi.push(new Car(road.getLaneCenter(lane), -height, 30, 50, "DUMMY", 2),);
//         }

//         if (lane != laneBackup){
//             console.log("pushing");
//             traffi.push(new Car(road.getLaneCenter(lane), -height, 30, 50, "DUMMY", 2),);
//         }

//         laneBackup = lane;
//         heightBackup = height;
//     }

//     return traffi
// }

function generateTraffic(fromHeight){
    console.log("pushing!!!")
    console.log(bestCar.y,traffic[0].y)
    for (let i = 0; i < traffic.length;i++){
        traffic[i].y = traffic[i].y/0.65;
    }

}

animate();

function save(){
    localStorage.setItem("bestBrain",
        JSON.stringify(bestCar.brain)
    );
    console.log(JSON.stringify(bestCar.brain))
}

function discard(){
    localStorage.removeItem("bestBrain");
}

async function loadFromGithub(){
    const url = "https://raw.githubusercontent.com/KailashGanesh/Self-driving-car-JS/main/myBestCar.json"
    const response = await fetch(url);
    const data = await response.json();
    localStorage.setItem("bestBrain",
        JSON.stringify(data)
    );
    // console.log(data); 
    // console.log(bestCar.brain);
    location.reload();
    return false;
}

function generateCars(N){
    const cars = [];
    for (let i = 1; i<=N; i++){
        cars.push(new Car(road.getLaneCenter(1),100,30,50,"AI"));
    }
    return cars
}

function animate(time) {
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders, []);
    }
    for(let i = 0; i < cars.length; i++ ){
        cars[i].update(road.borders, traffic);
    }

    bestCar = cars.find(
        c => c.y == Math.min(
            ...cars.map(c => c.y)
        )
    );

    bestTraffic = traffic.find(
        c => c.y == Math.min(
            ...traffic.map(c => c.y)
        )
    );

    carCanvas.height = window.innerHeight;
    networkCanvas.height = window.innerHeight;

    carCtx.save();
    carCtx.translate(0, -bestCar.y + carCanvas.height * 0.7);



    road.draw(carCtx);
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(carCtx, "red");
    }
    carCtx.globalAlpha = 0.2;
    for(let i = 0; i < cars.length; i++ ){
        cars[i].draw(carCtx, "blue");
    }
    carCtx.globalAlpha = 1;
    bestCar.draw(carCtx, "blue",true);

    carCtx.restore();

    networkCtx.lineDashOffset = -time/50;

    Visualizer.drawNetwork(networkCtx, bestCar.brain);
    requestAnimationFrame(animate);

    if (bestCar.y < bestTraffic.y){
        
        // for(let i = 0; i < traffic.length; i++){
        //     if (Math.abs(traffic[i].y) < (Math.abs(bestTraffic.y)*4)){
        //         traffic.splice(i,1);
        //     }
        // }
        generateTraffic(bestCar.y);
    }
}
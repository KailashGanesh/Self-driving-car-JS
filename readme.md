# Self Driving Car in Javascript

## [Live website](https://kailashganesh.github.io/Self-driving-car-JS/)

### ScreenShot 

![screenshot](Img/screenshot.png)

### The Goal
Build a Road and car simulation, build a neural network using genetic algorithm that can drive the car to avoid edge of the road and traffic

### Features
- **Save brain** : running the simulation will show you which car (and brain) has traveled the furthest and performers the best; You can save this brain so when you reload the page all new cars (with mutations) will be based on the saved brain. one car will have the exact same brain as the saved brain. 
- **Discard brain** : Clicking this button will discard the saved brain and start from scratch.
- **Load brain from github** : I have run this simulation enough to get a brain that can overtake most traffic. click this button to start where I left off. it'll load the best brain from a json file I have on the github repo.
- **select amount of mutation and number of cars** : Two drop downs are given to select the number of cars to generate and amount of mutation between the previous saved brain and new brains.
- **Traffic generation** : Traffic is generated as the car moves forward to give it new obstacles to tackle.
- **Visualization** : visualizes the neural network workings and the sensors of the best car.

### Built with

- HTML5 Canvas
- CSS custom properties
- Javascript
- Local Storage
- Fetch & async
- No libraries where used

### What I learned

- Making smaller and simpler implementations and making them  more useful and bigger as you go on, to ensure you aren't stuck in just one step; seeing things as slow burns instead of a heavy lift

- the way the controls are made in the game, I could't think of how to make the car turn left or right only while going forward, the way the guide did it, I thought was ingenious + using sin and cos to do the rotation

```js
// only turns when there is some speed - car can't turn in place
if(this.speed != 0){
    // are we going forwards or backwards?
    const flip = this.speed>0? 1:-1;

    // if going backward and pressing right, the car will move right since we have fixed the signs
    if(this.controls.left){
        this.angle += 0.03*flip;
    }
    if(this.controls.right){
        this.angle -= 0.03*flip;
    }
}


this.x -= Math.sin(this.angle)*this.speed;
this.y -= Math.cos(this.angle)*this.speed;
```

- I have been using Vim and NVim all this time, that I did't know Vs code has a "Rename symbol" feature which will rename a every instance of a variable across files. you can also use the shortcut F2 (the same one in windows file explorer to rename files and folders)
- The start out simple and build on it approach hits me again, the way Radu Mariescu makes things look so easy in the course, as hes making a simple version first and then making it more complicated and the forethought that goes into thinking this way is fascinating and defiantly something I want to implement in my own work flow 
- Learned how simple it is to use local storage
- This course did an excellent job of demystifying and simplifying genetic algorithms
- The manual save button seemed like a disadvantage at first, but having it manual gives the user the decision of which car to keep and what the next generation should be based on, which gives a whole new appreciation for genetic algorithm which would have been lost if it was automated. The joy of waiting for a car to cross all the traffic you give it and the excitement when one finally does.
- used this [extension](https://chrome.google.com/webstore/detail/css-used/cdopjfddjlonogibjahpnmjpoangjfff/related) to extract css properties of a specific element.


### Continued development
- A better traffic generator
- A way to speed up time and train faster
- Ability to combine two car's brains for next generation
- damaged car could be delete, which will save memory and processing
- Better looking cars maybe?

### Reference
- Inspiration and main guide: [Self-driving car with Javascript Course on youtube](https://www.youtube.com/watch?v=Rs_rAxEsAvI)
- How to make tool tips in Css: [w3schools -  css tooltip](https://www.w3schools.com/howto/howto_css_tooltip.asp)
- Helpful in recalling syntax: [javascript.info](https://javascript.info/)
- Of course, can you program in javascript without [MDN Docs](https://developer.mozilla.org/)
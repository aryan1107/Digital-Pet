function Tamogotchi(tamoName) {
    //
    this.petName;
    this.initialFood = 50;
    this.food;
    this.talkTimer;
    this.metabolismRate = 1000;

    /*
        add an array of objects
        -20 items
        -each element of the array has the following
            -mood(angry, happy, sad, joke)
            -mood percentage
            -saying(a saying relating the the mood)
    */
    this.sayings = [
        {mood: "happy", perc:0.2, saying:"Today is the greatest day I've ever known."},
        {mood: "happy", perc:0.4, saying:"Bork Bork Bork!!"},
        {mood: "happy", perc:0.6, saying:"Damn Skippy!"},
        {mood: "happy", perc:0.8, saying:"Dinner Gurkins!"},
        {mood: "happy", perc:1, saying:"Awesome Sauce!!"},
        {mood: "angry", perc:0.2, saying:"Toasting my marshmallows"},
        {mood: "angry", perc:0.4, saying:"You are a sour grape twerplette!"},
        {mood: "angry", perc:0.6, saying:"Eat Dust!"},
        {mood: "angry", perc:0.8, saying:"You're a Muffin Stump!"},
        {mood: "angry", perc:1, saying:"Get Forked!"},
        {mood: "sad", perc:0.2, saying:"I'm a wet noodle of sadness :("},
        {mood: "sad", perc:0.4, saying:"I feel like someone went wee in my cornflakes :("},
        {mood: "sad", perc:0.6, saying:"I'm useless like a muffin stump :("},
        {mood: "sad", perc:0.8, saying:"My life is like cherry pits :("},
        {mood: "sad", perc:1, saying:"I'm so far behind that I'll never Ketchup :("},
        {mood: "joke", perc:0.2, saying:"Smoking will kill you... Bacon will kill you... But,smoking bacon will cure it."},
        {mood: "joke", perc:0.4, saying:"One day you're the best thing since sliced bread. The next, you're toast."},
        {mood: "joke", perc:0.6, saying:"I removed all the fattening food from my house. It was delicious."},
        {mood: "joke", perc:0.8, saying:"What is an alien's favorite candy? A Mars bar!"},
        {mood: "joke", perc:1, saying:"What do you call a cow during an earthquake? A milkshake."}
    ]
    /*
        an array of compliments
        -10 items
    */
   this.compliments = [
       'bork you have the shiniest nose hairs!',
       `bork is awesome!`,
       `If you look in the dictionary next to awesome, you'll find a picture of bork!`,
       `bork is the greatest!`,
       `bork, you are fine! Damn!`,
       `bork, did it hurt when you fell out of heaven?`,
       `bork, you have style!`,
       `bork, I'd hug you if I weren't just pixels!`,
       `bork, I bet you sweat glitter!`,
   ];

    /*
        add an array of favourite foods(at least 10)
        each element of the array should have
        -food name
        -food value
        -chance of food poisoning
    */
   this.foods = [
       {foodName: "Balut", foodValue:25, foodPoisoning:.8},
       {foodName: "Poison", foodValue:1, foodPoisoning:1}
   ]

    this.init = () => {
        this.petName = tamoName;
        this.showTamogotchi(document.querySelector("#tamoHome"));
        this.talkBox = document.querySelector("#tamoVoice");
        this.statsCounter = document.querySelector("#petStats");
        this.hatch();
    }
    this.init();
}
Tamogotchi.prototype.displayStats = function(){
    if(this.food>0){
        this.statsCounter.innerText = `${this.food} of ${this.initialFood}`;
    }else{
        this.statsCounter.innerText = `${this.petName} is dead!`;
    }
}
Tamogotchi.prototype.resetFood = function(){
    this.food=this.initialFood;
}

Tamogotchi.prototype.hatch = function(){
    this.resetFood();
    this.startMetabolism();
    this.initFace();
    this.useMouth(`Hi!  I'm ${this.petName}`, this.neutralMouth);
    this.displayStats();
}
Tamogotchi.prototype.die = function(){
    clearInterval(this.metabolism);
    this.show_deadEyes();
    this.useMouth("I am dead!", this.sadMouth);
}
Tamogotchi.prototype.startMetabolism = function(){
    this.metabolism = setInterval(()=> {
        this.food -=1;
        this.displayStats();
        if(this.food<=0){
            this.die();
        }
    },this.metabolismRate);
}

Tamogotchi.prototype.eatLasagna = function() {
    this.useMouth(`can I see the food? ${this.food}`, this.happyMouth);
    this.food +=20;
}

//to add

//a drink coffee command that speeds up the metabolism of your pet
Tamogotchi.prototype.drinkCoffee = function(){
    if(this.food>0){
        this.useMouth("Yum!  Coffee!!!!! :D", this.happyMouth);
        this.changeMetabolism(500);
    }else{
        this.useMouth("the dead do not drink coffee!", this.sadMouth);
    }
}

//a drink beer command that slows down the metabolism of your pet
Tamogotchi.prototype.drinkBeer = function(){
    if(this.food>0){
        this.useMouth("Yum!  Beer!!!!!! :D", this.happyMouth);
        this.changeMetabolism(2000);
    }else{
        this.useMouth("the dead do not drink beer!", this.sadMouth);
    }
}
Tamogotchi.prototype.changeMetabolism = function(newRate){
    clearInterval(this.metabolism);
    this.metabolismRate = newRate;
    this.startMetabolism();
}
/*
an eat food command that will select a random food that will
-check if the pet gets food poisoning
-add points to the pets food count if they don't get food poisoning
-remove points from the pets food count if they do get food poisoning
*/
Tamogotchi.prototype.eatFood = function(){
    if(this.food>0){
        const chosenFood = this.foods[Math.floor(Math.random()*this.foods.length)];
        const poisonChance = Math.random();
        const isPoisoned = Math.random()<chosenFood.foodPoisoning;
        if(isPoisoned==true){
            this.food -=chosenFood.foodValue;
            this.useMouth(`Yuck!  I just lost ${chosenFood.foodValue} from eating ${chosenFood.foodName}`, this.sadMouth);
            this.poison_eyes();
        }else{
            this.food +=chosenFood.foodValue;
            this.useMouth(`Yummy!  I just gained ${chosenFood.foodValue} from eating ${chosenFood.foodName}`, this.happyMouth);
        }
    }
};
// a command that takes in a mood and returns a phrase
Tamogotchi.prototype.talk = function(mood){
    let endFace = this.neutralMouth;
    switch (mood){
        case "happy":
            endFace = this.happyMouth;
            break;
        case "sad":
            endFace = this.sadMouth;
            break;
        case "angry":
            endFace = this.neutralMouth;
            break;
    }
    const moodPhrases  = this.sayings.filter(saying => saying.mood == mood);
    if(moodPhrases.length>0){
        const moodPhrase = moodPhrases[Math.floor(Math.random()*moodPhrases.length)];
        this.useMouth(moodPhrase.saying, endFace);

    }else{
        this.useMouth("derp derp!", endFace);
    }
}
Tamogotchi.prototype.useMouth = function(words, mouthType){
    this.startTalking(mouthType);
    this.talkBox.innerText = words;
}

/*
    a command that takes in your name and returns you a compliment structured using template
*/
Tamogotchi.prototype.wooMe = function(compName){
    let phrase =this.compliments[Math.floor(Math.random()*this.compliments.length)];
    let updatedPhrase = phrase.replace(/bork/g, compName);
    this.useMouth(updatedPhrase, this.happyMouth);
};

/* create a visual for the tamogotchi */
Tamogotchi.prototype.showTamogotchi = function(tamoNode){
    tamoNode.innerHTML = `
    <svg version="1.1" id="Pet" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 960 560" style="enable-background:new 0 0 960 560;" xml:space="preserve">

<g id="Ears">
<ellipse id="RightEear" transform="matrix(-0.998 6.341989e-002 -6.341989e-002 -0.998 853.8845 311.3522)" cx="422" cy="169.2" rx="25.1" ry="75.1" fill="#F3F4E7" stroke="#F3F4E7" stroke-miterlimit="10" />
<ellipse id="PinkRight" transform="matrix(0.9937 -0.1119 0.1119 0.9937 -16.2103 48.3423)" cx="422.7" cy="168.6" rx="12.9" ry="55.7" fill="#F1D4E5" />

<ellipse id="LeftEar" transform="matrix(-0.9964 -8.526996e-002 8.526996e-002 -0.9964 1098.5593 384.7293)"  cx="557.5" cy="168.9" rx="24" ry="75.6" fill="#F3F4E7" stroke="#F3F4E7" stroke-miterlimit="10" />
<ellipse id="PinkLeft" transform="matrix(0.9968 8.044749e-002 -8.044749e-002 0.9968 15.3676 -44.3122)" cx="557.6" cy="168.6" rx="13.4" ry="55.5"  fill="#F1D4E5"/>
</g>
<ellipse id="Face" cx="491.1" cy="276" rx="116.9" ry="116.1" fill="#F3F4E7" stroke="#F3F4E7" stroke-miterlimit="10" />
<g id="Eyes">
<ellipse id="LeftEye" cx="535.3" cy="245.4" rx="8.1" ry="13.3" stroke="#000000" stroke-miterlimit="10"/>
<ellipse id="LeftEyeWhite" cx="533.7" cy="237.5" rx="3.3" ry="2.3" fill="#FFFFFF" stroke="#000000" stroke-width="0.1" stroke-miterlimit="10"/>
<ellipse id="RightEye" cx="449.9" cy="245.4" rx="8.1" ry="13.3" stroke="#000000" stroke-miterlimit="10"/>
<ellipse id="RightEyeWhite" cx="448.1" cy="237.5" rx="3.1" ry="2.3" fill="#FFFFFF" stroke="#000000" stroke-width="0.1" stroke-miterlimit="10" />
</g>
<g id="DeadEye" >
<rect id="DeadEyeRight" x="440.6" y="254" width="18.6" height="2.3" stroke="#000000" stroke-miterlimit="10"/>
<rect id="DeadEyeLeft" x="525.9" y="254" width="18.6" height="2.3" stroke="#000000" stroke-miterlimit="10"/>
</g>
<g id="PoisonedEyes" class="hidden">
<ellipse id="PoisonedRight"  style="fill:#66CC1A;" cx="449.1" cy="250.8" rx="5.9" ry="7.8"/>
<ellipse id="PoisonedLeft"  style="fill:#66CC1A;" cx="535.5" cy="250.3" rx="6.4" ry="8.4"/>
	</g>
<g id="Mouth">
<g id="Talking_Mouth" class="hidden">
<path id="MouthUpper" d="M489.8,291.8c0,8.6,0,17.1-0.1,25.7c0,1.7,2.7,1.7,2.7,0c0-8.6,0-17.1,0.1-25.7
C492.5,290.1,489.8,290,489.8,291.8L489.8,291.8z"/>
<path id="InnerMouth"  d="M491.3,317.6c0,0-11.4,4.5-16.1,5.3c-4.7,0.8-12.5,1-12.5,1s-1,19.7,17.3,29.2
s32.2-7.2,35.6-13.8c3.4-6.6,4.3-15.1,0-15.4C511.3,323.6,494.2,319,491.3,317.6z" fill="#D08D87"/>
<path id="Tounge"  d="M467.8,341.2c0,0,8.5-8.2,22.2-8.2s23.4,8.2,23.4,8.2s-7.4,13.9-23.4,12.6
C474.1,352.5,467.8,341.2,467.8,341.2z" fill="#EA9E98 "/>
<path id="UpperLips" d="M526.1,313.9c-0.5,11.2-13.6,8.9-21.1,7c-3.3-0.9-6.6-2-9.8-3.2c-1.1-0.4-2.8-1.5-4-1.5
c-1.2,0-2.9,1.1-4,1.5c-3,1.2-6.1,2.2-9.3,3c-7.6,2-21.3,4.6-21.7-6.8c-0.1-1.7-2.8-1.7-2.7,0c0.4,9.8,8.7,12,17.2,11
c4.7-0.6,9.3-1.8,13.8-3.4c1.8-0.6,3.7-1.2,5.4-2c0.5-0.2,2.8-0.8,1.3-0.8c-1.4,0,0.9,0.6,1.3,0.8c1.7,0.8,3.6,1.4,5.4,2
c4.5,1.5,9.1,2.8,13.8,3.4c8.5,1,16.8-1.2,17.2-11C528.9,312.1,526.2,312.2,526.1,313.9L526.1,313.9z"/>
<path id="mouth_LowerLips" d="M460.3,323.3c1.5,18.2,13.9,35.3,33.7,33.1c16.9-1.9,26.3-16.5,25.5-32.6
c-0.1-1.7-2.8-1.7-2.7,0c0.7,14.7-7.5,28-22.8,29.9c-18.2,2.2-29.7-13.8-31-30.4C462.9,321.6,460.2,321.6,460.3,323.3L460.3,323.3
z"/>
</g>
<path id="Sad" class="hidden" d="M462.7,331.4c16.8-9.2,27.9-8.8,27.9-8.8l0.3-22.5h-0.3l0.3,22.5c0,0,11-0.4,27.9,8.8" fill="none" stroke="#231F20" stroke-width="2" stroke-miterlimit="10" />
<path id="Happy" class="hidden" d="M464.1,313.4c0.7,21.3,26.6,22.7,26.6,22.7l0-0.7l0-35.4l0.1,0.4l0,35l0,0.7
c0,0,25.9-1.5,26.6-22.5" fill="none" stroke="#231F20" stroke-width="2" stroke-miterlimit="10" />
<polyline id="Neutral" points="537.7,323.4 446.6,323.4 490.7,323.4 491.1,300.1" fill="none" stroke="#231F20" stroke-width="2" stroke-miterlimit="10" />
</g>
<g id="Nose">
<ellipse id="PetNose"  cx="490.8" cy="290.6" rx="26.5" ry="14.9" fill="#020200" stroke="#231F20" stroke-miterlimit="10" />
<ellipse id="NoseWhite" cx="475.9" cy="286.1" rx="5.6" ry="4.6" fill="#FFFFFF" stroke"#231F20" stroke-miterlimit="10" />
</g>

</svg>

    `;
}
/* here we control the mouth of the Pet */
Tamogotchi.prototype.initFace = function(){
    this.mouth = document.querySelector("#Mouth");
    this.happyMouth = document.querySelector("#Happy");
    this.sadMouth = document.querySelector("#Sad");
    this.neutralMouth = document.querySelector("#Neutral");
    this.talkMouth = document.querySelector("#Talking_Mouth");

    this.deadEye_left = document.querySelector("#DeadEyeLeft");
    this.deadEye_right = document.querySelector("#DeadEyeRight");
    this.deadEyes = [this.deadEye_left, this.deadEye_right];
    this.hide_deadEyes();

    this.poisonedeyes = document.querySelector("#PoisonedEyes");

    this.normalEyes = document.querySelector("#Eyes");
}

Tamogotchi.prototype.hideMouths = function(){
    this.happyMouth.classList.add("hidden");
    this.sadMouth.classList.add("hidden");
    this.neutralMouth.classList.add("hidden");
    this.talkMouth.classList.add("hidden");
}
Tamogotchi.prototype.changeExpression = function(mouthType){
    this.hideMouths();
    (mouthType).classList.remove("hidden");
}
Tamogotchi.prototype.startTalking = function(mouthType){
    this.hideMouths();
    this.talkMouth.classList.remove("hidden");
    this.talkMouth.classList.add("talking");
    clearTimeout(this.talkTimer);
    this.talkTimer = setTimeout(() => this.stopTalking(mouthType), 3000);
}
Tamogotchi.prototype.stopTalking = function(mouthType){
    this.hideMouths();
    this.changeExpression(mouthType);
    this.mouth.classList.remove("talking");
}

/* here we control the eyes of the pet */
/* hiding the dead state of the eyes */
Tamogotchi.prototype.hide_deadEyes = function(){
    this.deadEyes.forEach(eye => {
        eye.classList.add("hidden");
        eye.classList.remove("poisoned");
    });
}

/* showing the dead state of th eyes */
Tamogotchi.prototype.show_deadEyes = function(){
    this.normalEyes.classList.add("hidden");
    this.deadEyes.forEach(eye => eye.classList.remove("hidden"));
}

// Hide Poisoned Eyes
Tamogotchi.prototype.hide_poisonedEyes = function(){
    this.poisonedeyes.classList.add("hidden");
    this.poisonedeyes.classList.remove("poisoned");
    this.normalEyes.classList.remove("hidden");
}
/* showing Poisoned eyes */
Tamogotchi.prototype.show_poisonedEyes = function(){
    this.normalEyes.classList.add("hidden");
    this.deadEyes.forEach(eye => eye.classList.add("hidden"));
    this.poisonedeyes.classList.remove("hidden");
}

Tamogotchi.prototype.poison_eyes = function(){
    this.show_poisonedEyes();
    this.poisonedeyes.classList.add("poisoned");
    this.poisonTimeout = setTimeout(() => this.hide_poisonedEyes(), 2000);
}

let bob;
window.onload = function(){
    bob = new Tamogotchi("Bob");
};

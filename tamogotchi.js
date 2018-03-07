// Aryan CHaurasia INM 320

function Tamogotchi(tamoName) {
    //
    this.petName;
    this.initialFood = 60;
    this.metabolismRate = 1000;
    this.alive;

    /*
        add an array of objects
        -20 items
        -each element of the array has the following
            -mood(angry, happy, sad, joke)
            -mood percentage
            -saying(a saying relating the the mood)
    */
    this.saying = [
      {mood:"angry", perc:50, saying:"blah blah blah "},
      {mood:"happy", perc:50, saying:"I'm happy "},
      {mood: "accepted", perc:0.6, saying:"Damn Skippy! "},
      {mood: "awed", perc:0.8, saying:"Dinner Gurkins!"},
      {mood: "amazed", perc:1, saying:"Awesome Sauce!!"},
      {mood: "aggressive", perc:0.2, saying:"Toasting my marshmallows"},
      {mood: "amused", perc:0.4, saying:"You are a sour grape twerplette!"},
      {mood: "alienated", perc:0.6, saying:"Eat Dust!"},
      {mood: "apathetic", perc:0.8, saying:"You're a Muffin Stump!"},
      {mood: "angry", perc:1, saying:"Get Forked!"},
      {mood: "astonished", perc:0.2, saying:"I'm a wet noodle of sadness :("},
      {mood: "bored", perc:0.4, saying:"I feel like someone went wee in my cornflakes :("},
      {mood: "sad", perc:0.6, saying:"I'm useless like a muffin stump :("},
      {mood: "critical", perc:0.8, saying:"My life is like cherry pits :("},
      {mood: "depressed", perc:1, saying:"I'm so far behind that I'll never Ketchup :("},
      {mood: "despair", perc:0.2, saying:"Smoking will kill you... Bacon will kill you... But,smoking bacon will cure it."},
      {mood: "detestable", perc:0.4, saying:"One day you're the best thing since sliced bread. The next, you're toast."},
      {mood: "eager", perc:0.6, saying:"I removed all the fattening food from my house. It was delicious."},
      {mood: "energetic", perc:0.8, saying:"What is an alien's favorite candy? A Mars bar!"},
      {mood: "joke", perc:1, saying:"What do you call a cow during an earthquake? A milkshake."}
    ];
    /*
        an array of compliments
        -10 items
    */
     this.compliments = ['NAME is stunning',
        'NAME is elegant',
        `NAME is wonderful`,
        `NAME is Breathtaking!`,
        `NAME, you are fine! Damn!`,
        `NAME, is bold`,
        `NAME, you have style!`,
        `NAME, is so Unique`,
        `NAME, is Gracious`,
      ];
    /*
        add an array of favourite foods(at least 10)
        each element of the array should have
        -food name
        -food value
        -chance of food poisoning
    */
    this.favFoods = [
    {foodName: "Mushroom", foodValue:5, poison:.4},
    {foodName: "Chicken", foodValue:25, poison:.2},
    {foodName: "Burger", foodValue:35, poison:.15},
    {foodName: "Bacon", foodValue:50, poison:.05},
    {foodName: "Breads", foodValue:30, poison:.2},
    {foodName: "Egg", foodValue:12, poison:.3},
    {foodName: "Roti", foodValue:60, poison:.3},
    {foodName: "Chocolate Cake", foodValue:10, poison:.01},
    {foodName: "Mercury", foodValue:25, poison:.95},
    {foodName: "Balut", foodValue:25, poison:.8}
];

    this.init = () => {
        this.petName = tamoName;
        console.log(`Hi!  I'm ${this.petName}`);
        this.hatch();
    }
    this.init();
}
Tamogotchi.prototype.resetFood = function(){
    this.food=this.initialFood;
};

Tamogotchi.prototype.hatch = function(){
    this.resetFood();
    this.startMetabolism();
    this.alive = true;
};
Tamogotchi.prototype.die = function(){
    clearInterval(this.metabolism);
    this.alive = false;
    console.log("I am dead!");
};
Tamogotchi.prototype.startMetabolism = function(){
    this.metabolism = setInterval(()=> {
        this.food -=1;
        console.log(`${this.food} until I starve`);
        if(this.food<=0){
            this.die();
        }
    },this.metabolismRate);
};

Tamogotchi.prototype.eatLasagna = function() {
    console.log(`can I see the food? ${this.food}`);
    this.food +=30;
}

//to add

//a drink coffee command that speeds up the metabolism of your pet
// Drink Coffee Increases Metabolism
Tamogotchi.prototype.drinkCoffee = function (){
  if (!this.alive) return;
  console.log("I am drinking a coffee");
  clearInterval(this.metabolism);
  this.metabolismRate -= 500;
  this.startMetabolism();
};
//a drink beer command that slows down the metabolism of your pet
// Drink beer makes pet drink beer and slows metabolism
Tamogotchi.prototype.drinkBeer = function (){
  if (!this.alive) return;
  console.log("I am drinking a beer");
  clearInterval(this.metabolism);
  this.metabolismRate += 200;
  this.startMetabolism();
};
/*
an eat food command that will select a random food that will
-check if the pet gets food poisoning
-add points to the pets food count if they don't get food poisoning
-remove points from the pets food count if they do get food poisoning
*/
// This function below make pet eat random food and also add/reduce points depending on food it only runs when pet is alive
Tamogotchi.prototype.eat = function(){
    if(this.food>0){
        const f = this.favFoods[Math.floor(Math.random() * this.favFoods.length)];
        const poisonChance = Math.random();
        const isPoisoned = Math.random()<f.poison;
        if(isPoisoned==true){
            this.food -=f.foodValue;
            console.log(`Eww!  I  lost ${f.foodValue} from eating ${f.foodName}`);
        }else{
            this.food +=f.foodValue;
            console.log(`Wow!  I  gained ${f.foodValue} from eating ${f.foodName}`);
        }
    }
};
// a command that takes in a mood and returns a phrase


//  Will show phrase according to mood for example   myPet.mood("happy"); will show a phrase
Tamogotchi.prototype.mood = function(mood) {
  if (!this.alive) return;
  for (phrase of this.saying) {
    if (phrase.mood === mood) console.log(phrase.saying);
  }
};

/*
    a command that takes in your name and returns you a compliment structured using template
*/
//  myPet.compliment("Doggo"); or any other name will show random compliments from the array
Tamogotchi.prototype.compliment = function(name) {
  if (!this.alive) return;
  console.log(this.compliments[Math.floor(Math.random() * this.compliments.length)].replace("NAME", name));
};

/*
Fat Arrow function are used to set Timeout
 Below are codes made in a way so the script runs in console automatically when opened
*/
var myPet = new Tamogotchi("Doggo");
// Give Compliment  | Wiill throw Mood phrase according to mood happy | Will make pet drink beer | Uses fatarrow for timeout 5000
myPet.compliment("Doggo");
setTimeout(() => {
  myPet.drinkBeer();
  myPet.drinkBeer();
  myPet.drinkBeer();
  myPet.mood("happy");
}, 5000);
setTimeout(() => {
  myPet.eat();
  myPet.eat();
  myPet.eat();
}, 10000);
setTimeout(() => {
  //be careful with coffee as you will die if it runs 5 times :)
  myPet.drinkCoffee();
  myPet.drinkCoffee();
  myPet.drinkCoffee();
  myPet.drinkCoffee();
  myPet.drinkCoffee();
}, 15000);

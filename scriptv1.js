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
      {mood:"happy", perc:50, saying:"I'm happy "}];
    /*
        an array of compliments
        -10 items
    */
     this.compliments = ["NAME is stunning", "NAME is elegant"];
    /*
        add an array of favourite foods(at least 10)
        each element of the array should have
        -food name
        -food value
        -chance of food poisoning
    */
    this.favFoods = [{name:"bacon", value: 200, poison: "low"},
                    {name:"bagel", value: 100, poison: "low"},
                    {name: "mercury", value: 100, poison: "high"}];

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



//to add

//a drink coffee command that speeds up the metabolism of your pet
Tamogotchi.prototype.drinkCoffee = function (){
  if (!this.alive) return;
  console.log("I am drinking a coffee");
  clearInterval(this.metabolism);
  this.metabolismRate -= 500;
  this.startMetabolism();
};
//a drink beer command that slows down the metabolism of your pet
Tamogotchi.prototype.drinkBeer = function (){
  if (!this.alive) return;
  console.log("I am drinking a beer");
  clearInterval(this.metabolism);
  this.metabolismRate += 500;
  this.startMetabolism();
};
/*
an eat food command that will select a random food that will
-check if the pet gets food poisoning
-add points to the pets food count if they don't get food poisoning
-remove points from the pets food count if they do get food poisoning
*/

Tamogotchi.prototype.eat = function() {
  if (!this.alive) return;
  var f = this.favFoods[Math.floor(Math.random() * this.favFoods.length)];
  var points = f.poison === "high" ? -f.value : f.value;
  this.food += points;
  console.log(`Eating ${f.name}. Food points: ${points}`);
};

// a command that takes in a mood and returns a phrase

Tamogotchi.prototype.mood = function(mood) {
  if (!this.alive) return;
  for (phrase of this.saying) {
    if (phrase.mood === mood) console.log(phrase.saying);
  }
};

/*
    a command that takes in your name and returns you a compliment structured using template
*/
Tamogotchi.prototype.compliment = function(name) {
  if (!this.alive) return;
  console.log(this.compliments[Math.floor(Math.random() * this.compliments.length)].replace("NAME", name));
};

var myPet = new Tamogotchi("Johny");
myPet.compliment("Asha");
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
  //be careful with coffee :)
  myPet.drinkCoffee();
  myPet.drinkCoffee();
  myPet.drinkCoffee();
  myPet.drinkCoffee();
  myPet.drinkCoffee();
}, 15000);

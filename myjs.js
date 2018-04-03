console.log("Checking  log...And it Works!");
function FortunecCookie(myname) {

    this.Name;




    this.init = () => {
        this.petName = myname;
        this.fetchData();
        this.showFortunecCookie(document.querySelector("#tamoHome"));
        this.talkBox = document.querySelector("#tamoVoice");
        this.statsCounter = document.querySelector("#petStats");
    }
    this.init();
}
// Fetches Data from Json File
FortunecCookie.prototype.fetchData = function(){
  fetch('data.json')
   .then(data => data.json())
   .then( data =>{
       this.sayings = data.fortunes;
})
.catch(error =>{
       console.log(error);
   });
}



/* Pet Visual using SVG */
FortunecCookie.prototype.showFortunecCookie = function(tamoNode){
    tamoNode.innerHTML = `
    <?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 21.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 21.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 1024 768" style="enable-background:new 0 0 1024 768;" xml:space="preserve">
<path style="fill:#FCD681;" d="M563.1,488.9c-4.6,0-8.9-2-11.9-5.4c-19.8-23-31.6-48.6-35.1-76.3c-3.6,27.7-15.3,53.3-35.1,76.3
	c-3,3.5-7.3,5.4-11.9,5.4c-2.4,0-4.7-0.5-6.8-1.5c-21.4-10.1-39.5-25.9-52.4-45.8c-13.2-20.4-20.2-44.1-20.2-68.6
	c0-33.8,13.2-65.5,37-89.4c23.9-23.9,55.6-37,89.4-37c28.9,0,57.2,10,79.6,28.2c22.1,17.9,37.7,43,43.8,70.7c2,9,3,18.3,3,27.5
	c0,10.2-1.2,20.4-3.6,30.3c-4.5,18.2-13.2,35.5-25.1,50.1c-11.8,14.4-27,26.2-43.8,34.1C567.7,488.4,565.5,488.9,563.1,488.9z
	 M516.1,295.2c-6.7,0-12.1,5.4-12.1,12.1c0,22.4,4,36.2,7.5,48.3c1.8,6.2,3.5,12.3,4.6,19c1.1-6.7,2.8-12.8,4.6-19
	c3.5-12,7.4-25.7,7.5-47.9c0-6.7-5.2-12.2-11.7-12.4C516.3,295.2,516.2,295.2,516.1,295.2z"/>
<path style="fill:#ECECED;" d="M636.2,404.1l0.4-1.4c2.4-9.7,3.6-19.7,3.6-29.7c0-9.1-1-18.2-3-27l-0.3-1.4h37.5v59.6H636.2z"/>
<path d="M610.4,344.9c-3.1,0.7-5.1,3.8-4.4,6.9c1.5,6.6,2.2,13.3,2.2,20.1c0,7.5-0.9,14.9-2.7,22.1c-0.8,3.1,1.1,6.2,4.2,7
	c0.5,0.1,0.9,0.2,1.4,0.2c2.6,0,4.9-1.8,5.6-4.4c2-8.1,3-16.4,3-24.8c0-7.6-0.8-15.2-2.5-22.6C616.5,346.1,613.5,344.2,610.4,344.9z
	"/>
<path d="M673.2,339.9h-30.4c-7-26.8-22.6-51.1-44.3-68.7c-23.2-18.9-52.6-29.3-82.5-29.3c-35,0-67.9,13.6-92.7,38.4S385,338,385,373
	c0,25.3,7.2,49.9,20.9,71.1c13.3,20.6,32.1,37,54.3,47.5c2.8,1.3,5.8,2,8.7,2c5.8,0,11.5-2.5,15.5-7c15.1-17.5,25.7-36.5,31.6-56.9
	c6,20.3,16.5,39.3,31.6,56.9c3.9,4.6,9.6,7,15.5,7c3,0,5.9-0.6,8.7-2c17.4-8.2,33.1-20.4,45.4-35.3c11.4-13.9,20-30.2,24.9-47.5
	h31.1c3.2,0,5.8-2.6,5.8-5.8v-57.3C679,342.5,676.4,339.9,673.2,339.9z M516.2,354.3c-0.1,0.2-0.1,0.5-0.2,0.7
	c-0.1-0.2-0.1-0.5-0.2-0.7c-3.6-12.4-7.3-25.2-7.3-47c0-2,0.8-4,2.3-5.4c1.4-1.4,3.3-2.1,5.2-2.1c0.1,0,0.2,0,0.2,0
	c4,0.1,7.3,3.6,7.3,7.8C523.5,329.2,519.8,341.9,516.2,354.3z M632.1,401.6c-8.6,35.1-32.4,64.1-65.2,79.6c-3.6,1.7-8,0.8-10.6-2.2
	c-23-26.6-34.6-56.9-34.6-90c0-12.4,2.6-21.2,5.5-31.5c3.6-12.5,7.7-26.6,7.7-49.9c0-10.4-8.3-19-18.4-19.4
	c-5.2-0.2-10.1,1.8-13.8,5.4c-3.7,3.6-5.8,8.5-5.8,13.6c0,23.4,4.1,37.6,7.7,50.2c3,10.2,5.5,19.1,5.5,31.5
	c0,33.1-11.6,63.4-34.6,90c-2.6,3-6.9,3.9-10.5,2.2c-41.7-19.6-68.6-62.1-68.6-108.2c0-65.9,53.6-119.5,119.5-119.5
	c55.6,0,104.6,39.3,116.7,93.5c1.9,8.5,2.8,17.3,2.8,26C635.6,382.7,634.4,392.3,632.1,401.6z M667.5,397.2h-22.6
	c1.5-7.9,2.2-16.1,2.2-24.2c0-7.2-0.6-14.4-1.8-21.5h22.1V397.2z"/>
<path d="M607.5,405.6c-7.4,0-7.4,11.5,0,11.5C614.9,417.2,614.9,405.6,607.5,405.6z"/>
<rect x="429" y="114" style="fill:none;" width="167" height="28"/>
<text transform="matrix(1 0 0 1 429 131.04)" style="display:none;"><tspan x="0" y="0" style="display:inline; font-family:'MyriadPro-Regular'; font-size:24px;">Welcome </tspan><tspan x="99" y="0" style="display:inline; font-family:'MyriadPro-BoldIt'; font-size:24px;">Name</tspan></text>
<rect x="411" y="157" style="fill:none;" width="210" height="37"/>
<text transform="matrix(1 0 0 1 411 174.04)" style="display:none; font-family:'MyriadPro-Regular'; font-size:24px;">Random Phrase here</text>
</svg>


    `;
}

// create new pet when window is opened
let Shiba;
window.onload = function(){
    Shiba = new FortunecCookie("Shiba");
};

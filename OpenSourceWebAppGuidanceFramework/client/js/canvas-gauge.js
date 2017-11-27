
var gauge = function(id,color,endPoint,value,estimatedValue,text) {

  //Canvas initialization
  if(endPoint == undefined || value == undefined || estimatedValue == undefined)
  {
      return;
  }

  // if(endPoint < value && estimatedValue < value)
  // {
  //  // endPoint=value;
  // }
  // else if(endPoint < value && estimatedValue > value)
  // {
  //   endPoint=estimatedValue;
  // }
  // else if(endPoint < estimatedValue && estimatedValue > value)
  // {
  //   endPoint=estimatedValue;
  // }

  this.tipCanvas = document.getElementById("canvas_tip");
  this.canvas = document.getElementById(id);
  this.ctx =  this.canvas.getContext("2d");
  this.color = color;
  this.val=text;
  this.bgcolor = endPoint ==0 ?color: "#DCDCDC" ;
  this.tickcolor="black"
  this.scaleFactor = 1 / endPoint;
  if(this.scaleFactor  == Infinity){
    this.scaleFactor=0;
  }
  this.endPoint=endPoint;
  this.value=value;
  this.estimatedValue=estimatedValue;
  var animation_loop, redraw_loop;
  // console.log("In Gauge2222222",(this.estimatedValue * this.scaleFactor));
  this.init = function(){
    this.W =  this.canvas.width > 50 ? this.canvas.width: 50;
    // console.log(this.W,'IDDDDDD====>>>>>> '+id);
    this.H =  this.canvas.height - 50;
    //Clear the canvas every time a chart is drawn
    this.ctx.clearRect(0,0,this.W,this.H-2);
    //Background 360 degree arc
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.bgcolor;
    this.ctx.lineWidth = 40;
    this.ctx.arc(this.W / 2, this.H, 100,  Math.PI, 0, false);
    this.ctx.stroke();
    //Gauge will be a simple arc
    //Angle in radians = angle in degrees * PI / 180
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.color;
    this. ctx.lineWidth = 40;
    //The arc starts from the rightmost end. If we deduct 90 degrees from the angles, the arc will start from the topmost end
    this.ctx.arc(this.W / 2, this.H, 100, 1 * Math.PI  ,(1+(this.value * this.scaleFactor)) * Math.PI, false);
    //ctx.arc(W / 2, H / 2, 100, 0 - 90 * Math.PI / 180, radians - 90 * Math.PI / 180, false);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.tickcolor;
    this.ctx.lineWidth = 40;
    //The arc starts from the rightmost end. If we deduct 90 degrees from the angles, the arc will start from the topmost end
    this.ctx.arc(this.W / 2, this.H, 100,((1+(this.estimatedValue * this.scaleFactor))-.01) * Math.PI  , (1+(this.estimatedValue * this.scaleFactor)) * Math.PI, false);
    //ctx.arc(W / 2, H / 2, 100, 0 - 90 * Math.PI / 180, radians - 90 * Math.PI / 180, false);
    this.ctx.stroke();
    //Adding the text
    //this.ctx.fillStyle = this.tickcolor;
    this.ctx.fillStyle = '#a7a2a2';
    this.ctx.font = "30px  Arial";
    //Centering the text by deducting half of text width from position x
    //Adding manual value to position y since the height of the text cannot be measured easily
    this.ctx.fillText(this.value +"K", this.W / 2 - this.ctx.measureText(this.value +"K").width / 2, this.H -20);
    this.ctx.font = "18px Arial";
    this.ctx.fillStyle = '#a7a2a2';
    // this.ctx.textAlign = "center"; 

    this.ctx.fillText(this.val, this.W / 2 - this.ctx.measureText(this.val).width / 2, this.H );
    
    this.ctx.fillText("0",  40+this.ctx.measureText("0").width, this.H + 25 );
    this.ctx.fillText(this.endPoint+"K",  this.W - (30+this.ctx.measureText(this.endPoint+"K").width), this.H + 25 );
  }
      this.init();
    ///this.animate(this);
}
// let tooltip =(tipCanvas,estimatedValue,budgetedValue) => {
//     let tipCtx=tipCanvas.getContext('2d');
//     tipCtx.clearRect(0, 0, tipCanvas.width, tipCanvas.height);
//     tipCtx.fillText(estimatedValue, 5, 15);
//     tipCtx.fillText(budgetedValue, 5, 25);
// }

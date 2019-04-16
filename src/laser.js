class Laser {
  constructor(x, y) {
      this.x = x;
      this.y = y;
      this.constructor.lasersRendered.push(this)
  }

  behavior(){
    // move the laser
    this.x = this.x + this.constructor.speed
    // delete the laser if it's off-screen
    if (this.x > canvas.width+this.constructor.speed){
      this.constructor.lasersRendered.shift()
    }
  }
  render(){
    ctx.fillStyle = 'yellow';
    ctx.fillRect(this.x, this.y, Laser.speed, 1)
  }
  static changeLasers(){
  this.lasersRendered.forEach(laser => laser.behavior())}

  static laserSound(){
    document.getElementById("laser").cloneNode(true).play();
  }
  static renderLasers(){
    this.lasersRendered.forEach(laser => laser.render())
  }
}
Laser.laserSet = true
Laser.speed = 5
Laser.lasersReady = 3
Laser.maxLasers = 3
Laser.lasersRendered = []
Laser.laserRefresh = 200

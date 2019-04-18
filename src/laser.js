//needed classes
// laser stuff
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
    if (this.x > this.constructor.canvas.width+this.constructor.speed){
      this.constructor.lasersRendered.shift()
    }
  }
  render(){
    this.constructor.ctx.fillStyle = 'yellow';
    this.constructor.ctx.fillRect(this.x, this.y, this.constructor.speed, 1)
  }
  static changeLasers(){
  this.lasersRendered.forEach(laser => laser.behavior())}

  static laserSound(){
    const laserSound = document.getElementById("laser").cloneNode(true)
    laserSound.volume = .5
    laserSound.play();
  }

  static renderLasers(){
    this.lasersRendered.forEach(laser => laser.render())
  }

  static initializeLaserVariables(canvas,avatar,ctx){
    this.laserSet = true
    this.speed = 5
    this.maxLasers = 10
    this.lasersRendered = []
    this.canvas = canvas
    this.avatar = avatar
    this.ctx = ctx
  }

  static shootLaser(){
    if (Laser.laserSet && Laser.lasersRendered.length <= Laser.maxLasers){
    Laser.laserSet = false
    new Laser(Laser.avatar.x+30, (Laser.avatar.y +(Laser.avatar.height/2-12)))
    new Laser(Laser.avatar.x+30, (Laser.avatar.y +(Laser.avatar.height/2+12)))
    Laser.laserSound()
  }
  }
}

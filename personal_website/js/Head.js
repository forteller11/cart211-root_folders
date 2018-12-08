class Creature {
  constructor(size, name, nameGen, pred) {
    this.pred = pred; //true/false
    this.seekMouseWeight = 1;
    this.clumpWeight = random(-0.05, 0.05);
    this.clumpMutationRate = random(-0.02, 0.02);

    this.clumpRadius = random(1, 6);
    this.clumpRadiusMutationRate = random(-.3, .3);
    this.clumpRadius = constrain(this.clumpRadius, 2, 100);
    this.seperateWeight = 0.3;

    this.wanderWeight = random(1);
    this.wanderMutationRate = random(-0.1, 0.1);

    this.size = size;
    this.sizeMutationRate = random(-5, 5);
    if (this.size < 20) {
      this.size = 20;
    }
    this.food = 1;

    this.hungerRate = 0.002;
    if (this.pred) {
      this.hungerRate = this.hungerRate / 5;
    }
    this.nameValue = name;
    this.nameValueGeneration = nameGen; //generation of creature

    this.wanderXIndex = random(100000);
    this.wanderYIndex = random(100000);
    this.x = random(windowWidth);
    this.y = random(windowHeight);
    this.minMaxRange = 10;

    this.sliderHeight = this.size / 10;
    this.radioRadius = this.size / 12;
    this.nameSize = this.size / 1.5;
    this.nameID = random(1);
    this.radioHerbDead = random(1);
    this.distToMaintain = random(100, 250);
    this.velocityMax = random(100 / this.size, 1000 / this.size); //max mag of velocity vec
    this.velocity = createVector(random(-this.velocityMax, this.velocityMax), random(-this.velocityMax, this.velocityMax)); //vector to be used as velocity.
    this.velocityWeight;
    this.velocityWeightConstant = 1; //dna of weight
    this.sliderIndex = random(TWO_PI); //where the slider is in its osscilattions
    this.sliderIndexIncrementConstant = random(.5, 1.5);
    const divID = random(1); //set random divID
    const nameID = random(1);
    const sliderHorzID = random(1);
    const sliderVertID = random(1);
    const checkboxID = random(1);
    const radioGroupID = random(1);
    const radioHerbContainerID = random(1);
    const radioHerbID = random(1);
    const radioPredContainerID = random(1);
    const radioPredID = random(1);
    this.fontSize = this.size / 10;
    //this is more or less creating html elements in js
    let bodyPointer = document.getElementById("bod");
    this.div = this.createElement("div", divID, bodyPointer);
    this.sliderHorz = this.createElement("INPUT", sliderHorzID, this.div);
    this.sliderVert = this.createElement("INPUT", sliderHorzID, this.div);
    this.name = this.createElement("INPUT", nameID, this.div);
    // this.checkbox = this.createElement("INPUT", checkboxID, this.div);
    this.radioHerbContainer = this.createElement("div", divID, this.div);
    // this.radioHerb = this.createElement("INPUT",radioHerbID,this.radioHerbContainer);
    this.radioHerbContainer.style.fontSize = this.radioRadius * 1.4 + "px";
    this.radioHerbContainer.style.color = "darkgrey";
    this.radioHerbContainer.innerHTML = "Herbavore";
    this.radioPredContainer = this.createElement("div", divID, this.div);
    // this.radioPred = this.createElement("INPUT",radioHerbID,this.radioPredContainer);
    this.radioPredContainer.style.color = "darkgrey";
    this.radioPredContainer.style.fontSize = this.radioRadius * 1.4 + "px";
    this.radioPredContainer.innerHTML = "Predator";


    // this is basically styling those html elements in css using js
    //divider containing all entity elements
    this.div.style.width = "auto";
    this.div.style.height = "auto";
    this.div.style.zIndex = "100";
    this.div.style.position = "fixed";
    this.transformElement(this.div, 0, 0, "px");


    const sliderSize = this.size;
    //horizontal slider
    this.sliderHorz.setAttribute("type", "range");
    this.sliderHorz.setAttribute("min", -1);
    this.sliderHorz.setAttribute("max", 1);
    this.sliderHorz.setAttribute("step", 1 / this.size);
    this.sizeElement(this.sliderHorz, sliderSize, this.sliderHeight, "px");
    this.transformElement(this.sliderHorz, 0, (this.sliderHeight * 1.5), "px");
    this.sliderHorz.style.transform = "rotate(" + 0 + "deg)";
    if (style === false) {
      this.sliderHorz.style.display = "none";
    }
    //vertical slider
    this.sliderVert.setAttribute("type", "range");
    this.sliderVert.setAttribute("min", -1);
    this.sliderVert.setAttribute("max", 1);
    this.sliderVert.setAttribute("step", 1 / this.size);
    this.sizeElement(this.sliderVert, sliderSize, this.sliderHeight, "px");
    this.transformElement(this.sliderVert, 0, (this.sliderHeight * 1.5), "px");
    this.sliderVert.style.transform = "rotate(" + 180 + "deg)";
    if (style === false) {
      this.sliderVert.style.display = "none";
    }

    //name (text input)
    this.name.setAttribute("type", "text");
    this.name.setAttribute("name", nameID);
    this.name.setAttribute("value", this.nameValue + "_" + this.nameValueGeneration);
    this.sizeElement(this.name, this.nameSize, this.nameSize / 2.5, "px");
    this.transformElement(this.name, this.nameSize / 3.2, -this.nameSize / 1.1, "px");
    this.name.style.fontSize = this.fontSize + "px";
    this.name.style.textAlign = "center";
    if (style === false) {
      this.name.style.display = "none";
    }


    //aliveRadio divider
    this.radioHerbContainer.style.width = "auto";
    this.radioHerbContainer.style.height = "auto";
    // this.transformElement(this.radioHerbContainer, this.size, -this.size / 6, "px");
    this.transformElement(this.radioHerbContainer, this.nameSize * 2, -this.nameSize / 1.1, "px");
    if (style === false) {
      this.radioHerbContainer.style.display = "none";
    }


    //radioHerb
    this.radioHerb = this.createElement("INPUT", radioHerbID, this.radioHerbContainer);
    this.radioHerb.setAttribute("type", "radio");
    this.radioHerb.setAttribute("name", radioGroupID);
    this.radioHerb.setAttribute("id", radioHerbID);
    this.radioHerb.checked = true;
    this.transformElement(this.radioHerb, -this.fontSize * 4, -this.fontSize, "px");
    this.sizeElement(this.radioHerb, this.radioRadius * 2, this.radioRadius * 2, "px");
    if (style === false) {
      this.radioHerb.style.display = "none";
    }

    //radioPredContianer
    this.radioPredContainer.style.width = "auto";
    this.radioPredContainer.style.height = "auto";
    // this.transformElement(this.radioPredContainer, this.size, this.size / 2.8, "px");
    this.transformElement(this.radioPredContainer, this.nameSize * 2, -this.nameSize / 1.8, "px");
    if (style === false) {
      this.radioPredContainer.style.display = "none";
    }

    //radioPred
    this.radioPred = this.createElement("INPUT", radioHerbID, this.radioPredContainer);
    this.radioPred.setAttribute("type", "radio");
    this.radioPred.setAttribute("name", radioGroupID);
    this.radioPred.setAttribute("id", radioPredID);
    // this.radioPred.setAttribute("value", name);
    if (this.pred) {
      this.radioPred.checked = true;
    } else {
      this.radioPred.checked = false
    }
    this.transformElement(this.radioPred, -this.fontSize * 4, -this.fontSize / 2, "px");
    this.sizeElement(this.radioPred, this.radioRadius * 2, this.radioRadius * 2, "px");
    if (style === false) {
      this.radioPred.style.display = "none";
    }
    // this.radioHerb.style.display = "none";
    // this.radioPred.style.display = "none";
    // this.radioHerbContainer.style.display = "none";
    // this.radioPredContainer.style.display = "none";
  }

  createElement(typeOfElement, id, pointerOfParent) {
    //parentID where to appendto
    let elementPointer = document.createElement(typeOfElement);
    elementPointer.setAttribute("id", id);
    pointerOfParent.appendChild(elementPointer);
    elementPointer.style.position = "absolute";
    // divPointer.style.width = "auto";
    // divPointer.style.height = "auto";
    // this.transformElement(divPointer,this.x,this.y,"px");
    // console.log(divPointer);
    return elementPointer;
  }

  transformElement(elementPointer, xTransform, yTransform, transformType) {
    //element pointer is what html elemnt to change style of
    //x transform changes left: positions
    //y transform changes top: position
    //transfform type will be either "px" or "%" etc. based on what kind of transformation user wants to occur
    elementPointer.style.left = xTransform + transformType;
    elementPointer.style.top = yTransform + transformType;
  }

  sizeElement(elementPointer, width, height, sizeType) {
    //element pointer is what html elemnt to change style of
    //x transform changes left: positions
    //y transform changes top: position
    //transfform type will be either "px" or "%" etc. based on what kind of transformation user wants to occur
    elementPointer.style.width = width + sizeType;
    elementPointer.style.height = height + sizeType;
  }

  screenWrap() {
    if (this.x - this.size > windowWidth) {
      this.x = -this.size;
    } else if (this.x + this.size < 0) {
      this.x = windowWidth + this.size;
    }
    if (this.y - this.size > windowHeight) {
      this.y = -this.size;
    } else if (this.y + this.size < 0) {
      this.y = windowHeight + this.size;
    }
  }


  wander(weight) { //use 2d perlin noise to create random point within unit circle
    const noiseIncrement = .002;
    this.wanderXIndex += noiseIncrement;
    this.wanderYIndex += noiseIncrement;
    let xTarget = ((noise(this.wanderXIndex) * 2) - 1) * this.size;
    let yTarget = ((noise(this.wanderYIndex) * 2) - 1) * this.size;
    // ellipse(this.x+xTarget,this.y+yTarget,5);
    let vectorToTarget = createVector(xTarget, yTarget);

    //VectorToTarget - this.velocity (finds differences in two vectors, or vector which takes velocityvector to vecToTarget)
    let desiredChangeInVelocity = p5.Vector.sub(vectorToTarget, this.velocity);

    const distToTarget = vectorToTarget.mag();

    let addToVelocity = desiredChangeInVelocity.mult(weight * .01);

    if (debugDisplay) {
      stroke(0, 0, 255);
      line(this.x, this.y, this.x + addToVelocity.x, this.y + addToVelocity.y);
    }

    this.velocity.add(addToVelocity);
    //away from neighby x/y positions
  }

  seekPoint(xx,yy,weight) { //travel towards point
      const targetX = xx;
      const targetY = yy;
      let vectorToTarget = createVector(targetX - this.x, targetY - this.y);

      // vectorToTarget.limit(.1);

      let desiredChangeInVelocity = p5.Vector.sub(vectorToTarget, this.velocity);


      let addToVelocity = desiredChangeInVelocity.mult(weight); //
      if (debugDisplay) {
        stroke(255, 0, 255);
        line(this.x, this.y, this.x + addToVelocity.x, this.y + addToVelocity.y);
      }

      this.velocity.add(addToVelocity);

  }


  addVelocityToPosition() {
    this.velocity.div(this.velocity.mag() / 1.3);
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }

  updateSliders() {
    //add slider index
    this.sliderIndex += this.velocity.mag() / this.size * 3 * this.sliderIndexIncrementConstant;
    this.sliderHorz.value = sin(this.sliderIndex);
    this.sliderVert.value = sin(this.sliderIndex + PI);
    const currentAngle = atan2(this.velocity.y, this.velocity.x);
    let currentDegrees = currentAngle / PI * 180;
    currentDegrees += 90;
    // currentRadians = 0;
    // console.log(currentDegrees);
    // this.transformElement(this.sliderHorz, 0, (this.sliderHeight * 1.5), "px");
    this.sliderHorz.style.transform = "rotate(" + currentDegrees + 270 + "deg)";
    this.sliderVert.style.transform = "rotate(" + currentDegrees + 0 + "deg)"; //right
  }

  updatePositionOfElements() {
    let xOffset = this.size / 1.7;
    let yOffset = this.size / 4;
    this.transformElement(this.div, this.x - this.size / 2, this.y - this.sliderHeight * 2, "px");
  }


  update() {
    this.wander(.3);
    this.seekPoint(windowWidth/2,windowHeight/2,.0003);
    this.addVelocityToPosition();
    this.screenWrap();
    this.updatePositionOfElements();
    this.updateSliders();
    this.debugDisplay();
  }
  debugDisplay() {
    if (debugDisplay === true) {
      text(this.food, this.x, this.y - this.size);
      stroke(0);
      fill(255, 255, 255, 50);
      ellipse(this.x, this.y, this.size);
      stroke(0, 0, 0, 0);
      line(this.x, this.y, this.x + this.velocity.x, this.y + this.velocity.y);
    }
  }

}
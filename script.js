class TimeLine {
  
  constructor(container, options) {

    this.container = document.getElementById(container);
    this.minDocumentWidth = options.minDocumentWidth || true;
    this.wrapper = this.container.querySelector('.wrapper');
    this.elems = this.container.querySelectorAll('.element-wrapper');
    this.tooltipHeight = parseInt((getComputedStyle(this.container.querySelector('.tooltip')).height), 10);
    this.shiftTooltip = 0;
    this.setTimeLine(this.elems);

    window.addEventListener("resize", this.setTimeLine.bind(this, this.elems));

  }

  setTimeLine(array) {

    let contentLeft = 0,
      contentRight = 0;

    let body = this.elementSize(document.body);
    
    for (let i = 0; i < array.length; i++) {

      let elem = array[i].querySelector('.element');
      let tooltip = array[i].querySelector('.tooltip');
      let size = this.elementSize(elem);

      array[i].classList.remove('block-right');
      array[i].classList.remove('block-left');
      tooltip.style.top = '';
      elem.style.top = '';
      this.wrapper.style.height = '';

      if( body.width >= this.minDocumentWidth){
        if (contentLeft <= contentRight) {

          elem.style.top = contentLeft + 'px';
          array[i].classList.add('block-left');
          this.tooltipPosition(contentLeft);
          contentLeft += size.height;

        } else {

          elem.style.top = contentRight + 'px';
          array[i].classList.add('block-right');
          this.tooltipPosition(contentRight);
          contentRight += size.height;

        }

        tooltip.style.top = this.shiftTooltip + 'px';
      }


    }
    if(body.width >= this.minDocumentWidth){
      let wrapperHeight = contentLeft > contentRight ? contentLeft : contentRight;
      this.wrapper.style.height = wrapperHeight + 'px';
    }

  }

  tooltipPosition(startCoords) {

    let oldShiftTooltip = this.shiftTooltip;
    this.shiftTooltip = startCoords + this.tooltipHeight;

    if (oldShiftTooltip > 0 && (this.shiftTooltip > oldShiftTooltip - this.tooltipHeight && this.shiftTooltip <= oldShiftTooltip + this.tooltipHeight)) {

      this.shiftTooltip = oldShiftTooltip + 2 * this.tooltipHeight;

    }

  }

  // bodyWidth(){
  //   let body = getComputedStyle(document.body);
  //   return {
  //     width: parseInt(body.width, 10) + parseInt(body.marginLeft, 10) + parseInt(body.marginRight, 10) + this.scrollWidth.width,
  //     height: parseInt(body.height, 10) + parseInt(body.marginBottom, 10) + parseInt(body.marginTop, 10) + +this.scrollWidth.height
  //   }
  // }

  getScrollWidth(){
    let div = document.createElement('div');

    div.style.overflowY = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';
    div.style.visibility = 'hidden';
    div.style.position = 'absolute';
    div.style.top = '0px';
    div.style.left = '0px';



    document.body.appendChild(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    let scrollHeight = div.offsetHeight - div.clientHeight;
    document.body.removeChild(div);

    return {width: scrollWidth, height: scrollHeight};
  }

  elementSize(element) {

    let element = getComputedStyle(element);

    this.scrollWidth = this.getScrollWidth();

    return {
      width: parseInt(element.width, 10) + parseInt(element.marginLeft, 10) + parseInt(element.marginRight, 10) + this.scrollWidth.width,
      height: parseInt(element.height, 10) + parseInt(element.marginBottom, 10) + parseInt(element.marginTop, 10) + +this.scrollWidth.height
    }

  }

}
window.onload = function () { new TimeLine('timeline', {minDocumentWidth: 500}) }


//new TimeLine(document.getElementById('timeline'));
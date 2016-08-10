class TimeLine {
  
  constructor(container, options) {

    this.container = document.getElementById(container);
    this.minDocumentWidth = options.minDocumentWidth || true;
    this.wrapper = this.container.querySelector('.wrapper');
    this.tooltipHeight = parseInt((getComputedStyle(this.container.querySelector('.tooltip')).height), 10);
    this.shiftTooltip = 0;
    this.setTimeLine(this.wrapper);

    window.addEventListener("resize", this.setTimeLine.bind(this, this.wrapper));

  }

  setTimeLine(wrapper) {
    let elems = wrapper.querySelectorAll('.element-wrapper');

    let contentLeft = 0,
        contentRight = 0;

    let body = this.elementSize(document.body);
    
    for (let i = 0; i < elems.length; i++) {

      let elem = elems[i].querySelector('.element');
      let tooltip = elems[i].querySelector('.tooltip');
      let size = this.elementSize(elem);

      elems[i].classList.remove('block-right');
      elems[i].classList.remove('block-left');
      tooltip.style.top = '';
      elem.style.top = '';
      this.wrapper.style.height = '';

      if( body.width >= this.minDocumentWidth){
        if (contentLeft <= contentRight) {

          elem.style.top = contentLeft + 'px';
          elems[i].classList.add('block-left');
          this.tooltipPosition(contentLeft);
          contentLeft += size.height;

        } else {

          elem.style.top = contentRight + 'px';
          elems[i].classList.add('block-right');
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

    let elem = getComputedStyle(element);

    this.scrollWidth = this.getScrollWidth();

    return {
      width: parseInt(elem.width, 10) + parseInt(elem.marginLeft, 10) + parseInt(elem.marginRight, 10) + this.scrollWidth.width,
      height: parseInt(elem.height, 10) + parseInt(elem.marginBottom, 10) + parseInt(elem.marginTop, 10) + +this.scrollWidth.height
    }

  }

}
window.onload = function () { new TimeLine('timeline', {minDocumentWidth: 500}) }


//new TimeLine(document.getElementById('timeline'));
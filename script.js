class TimeLine {
  
  constructor(container) {

    this.container = container;
    this.elems = this.container.querySelectorAll('.element-wrapper');
    this.tooltipHeight = parseInt((getComputedStyle(this.container.querySelector('.tooltip')).height), 10);
    this.shiftTooltip = 0;
    this.setTimeLine(this.elems);

    window.addEventListener("resize", this.setTimeLine.bind(this, this.elems));

  }

  setTimeLine(array) {

    let contentLeft = 0,
      contentRight = 0;

    for (let i = 0; i < array.length; i++) {

      let elem = array[i].querySelector('.element');
      let tooltip = array[i].querySelector('.tooltip');
      let size = this.blockSize(elem);

      if (contentLeft <= contentRight) {

        elem.style.top = contentLeft + 'px';
        array[i].classList.remove('block-left');
        array[i].classList.remove('block-right');
        array[i].classList.add('block-left');
        this.tooltipPosition(contentLeft);
        contentLeft += size.height;

      } else {

        elem.style.top = contentRight + 'px';
        array[i].classList.remove('block-right');
        array[i].classList.remove('block-left');
        array[i].classList.add('block-right');
        this.tooltipPosition(contentRight);
        contentRight += size.height;

      }

      tooltip.style.top = this.shiftTooltip + 'px';

    //console.log( i+1, size.height)
    }
    let wrapperHeight = contentLeft > contentRight ? contentLeft : contentRight;
    this.container.querySelector('.wrapper').style.height = wrapperHeight + 'px';

  }

  tooltipPosition(startCoords) {

    let oldShiftTooltip = this.shiftTooltip;
    this.shiftTooltip = startCoords + this.tooltipHeight;

    if (oldShiftTooltip > 0 && (this.shiftTooltip > oldShiftTooltip - this.tooltipHeight && this.shiftTooltip <= oldShiftTooltip + this.tooltipHeight)) {

      this.shiftTooltip = oldShiftTooltip + 2 * this.tooltipHeight;

    }

  }

  blockSize(block) {

    let box = getComputedStyle(block);

    return {
      width: parseInt(box.width, 10) + parseInt(box.marginLeft, 10),
      height: parseInt(box.height, 10) + parseInt(box.marginBottom, 10)
    }

  }

}
//window.onload = function () { new TimeLine(document.getElementById('timeline')) }


new TimeLine(document.getElementById('timeline'));
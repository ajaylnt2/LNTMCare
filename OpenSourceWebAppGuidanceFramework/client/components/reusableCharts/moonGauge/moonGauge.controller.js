class MoonGaugeController {
  constructor($element) {
    'ngInject';

    this.$element = $element;

    this.view = {
      width: 200,
      height: 250,
    };

    this.decimals = this.decimals || 1;
    this.value = this.value || 50;
    this.angle = this.angle || 50;
    this.min = this.min || 0;
    this.max = this.max || 10;
    this.text = this.text || 'Temperature';

    this.minorGraduations = 5;
    this.minorGraduationColor = 'black';

    this.innerRadius = Math.round((this.view.width * 120) / 300);
    this.outerRadius = Math.round((this.view.width * 140) / 300);

    this.centerX = this.view.width / 2;
    this.centerY = this.view.height / 2;

    this.svg = d3.select(this.$element[0])
      .append('svg')
      .classed('moon-gauge', true)
      .attr('viewBox', `0 0 ${200} ${250}`);

    this.ranges2 = [
      {
        min: this.min,
        max: this.value,
        color: '#a94442',
      },
    ];

    this.ranges = [
      {
        min: this.warningMin,
        max: this.criticalMin,
        color: '#FFD427',
      },
      {
        min: this.criticalMin,
        max: this.max,
        color: '#B41A00',
      },
    ];
  }

  plotGraph() {
    const majorGraduations = 4;
    const translate = `translate(${this.centerX},${this.centerY})`;
    const cScale = d3.scale.linear().domain([this.min, this.max])
    .range([-1 * this.angle * (Math.PI / 180), this.angle * (Math.PI / 180)]);

    // Create outer arc
    this.arc = d3.svg.arc()
      .innerRadius(this.innerRadius + 10)
      .outerRadius(this.outerRadius)
      .startAngle((d) => {
        if (d) {
          return cScale(d.min);
        }
        return 0;
      })
      .endAngle((d) => {
        if (d) {
          return cScale(d.max);
        }
        return 0;
      });

    // Draw arch to SVG
    this.svg.selectAll('path')
      .data(this.ranges)
      .enter()
      .append('path')
      .attr('d', this.arc)
      .style('fill', (d) => {
        if (d.max > this.criticalMin) {
          return `url(#temperature-gradient${3})`;
        } else if (d.max > this.warningMin) {
          return `url(#temperature-gradient${2})`;
        }
        return `url(#temperature-gradient${1})`;
      })
      .attr('transform', translate);

    // Create inner arc
    this.arc2 = d3.svg.arc()
      .innerRadius(this.innerRadius)
      .outerRadius(this.outerRadius)
      .startAngle((d) => {
        if (d) { return cScale(d.min); } return 0;
      })
      .endAngle((d) => {
        if (d) {
          if (d.max > this.max) {
            return cScale(this.max);
          }

          return cScale(d.max);
        }
        return 0;
      });

    // Draw inner arc
    this.svg.selectAll('path1')
      .data(this.ranges2)
      .enter()
      .append('path')
      .attr('d', this.arc2)
      .style('fill', (d) => {
        if (d.max >= this.criticalMin) {
          return `url(#temperature-gradient${3})`;
        } else if (d.max >= this.warningMin) {
          return `url(#temperature-gradient${2})`;
        }
        return `url(#temperature-gradient${1})`;
      })
      .attr('transform', translate);

    // code for gradient starts here

    // gradient 1 for normal
    this.svg.append('linearGradient')
      .classed('moon-gauge-gradient-normal', true)
      .attr('id', 'temperature-gradient1')
      .attr('gradientUnits', 'userSpaceOnUse')
      .attr('x1', -100)
      .attr('y1', 0)
      .attr('x2', 100)
      .attr('y2', 0)
      .selectAll('stop')
      .data([
        { offset: '0%', color: '#a94442' },
        { offset: '50%', color: '#bd8b8a' },
      ])
      .enter()
      .append('stop')
      .attr('offset', d => d.offset)
      .attr('stop-color', d => d.color);

    // gradient 2 for warning
    this.svg.append('linearGradient')
      .classed('moon-gauge-gradient-warning', true)
      .attr('id', 'temperature-gradient2')
      .attr('gradientUnits', 'userSpaceOnUse')
      .attr('x1', -100)
      .attr('y1', 0)
      .attr('x2', 100)
      .attr('y2', 0)
      .selectAll('stop')
      .data([
        { offset: '0%', color: '#FFAD1D' },
        { offset: '50%', color: '#FFD427' },
      ])
      .enter()
      .append('stop')
      .attr('offset', d => d.offset)
      .attr('stop-color', d => d.color);

    // gradient 3 for critical
    this.svg.append('linearGradient')
      .classed('moon-gauge-gradient-critical', true)
      .attr('id', 'temperature-gradient3')
      .attr('gradientUnits', 'userSpaceOnUse')
      .attr('x1', -100)
      .attr('y1', 0)
      .attr('x2', 100)
      .attr('y2', 0)
      .selectAll('stop')
      .data([
        { offset: '0%', color: '#B41A00' },
        { offset: '50%', color: '#D94538' },
      ])
      .enter()
      .append('stop')
      .attr('offset', d => d.offset)
      .attr('stop-color', d => d.color);

    // code for gradient ends here

    const majorGraduationsAngles = this.getMajorGraduationAngles(majorGraduations);

    // Draw Graduations
    this.renderMajorGraduations(majorGraduationsAngles);

    // Write center text
    this.svg.append('text')
      .classed('moon-gauge-value', true)
      .attr('x', this.centerX)
      .attr('y', this.centerY)
      .text(this.displayValue + this.unit);

    this.svg.append('text')
      .classed('moon-gauge-text', true)
      .attr('x', this.centerX)
      .attr('y', this.centerY + 25)
      .text(this.text);
  }

  renderMajorGraduations(majorGraduationsAngles) {
    const tempScope = this;
    const majorGraduationLength = Math.round((this.view.width * 10) / 200);
    const majorGraduationMarginTop = -10;

    // Render Major Graduations
    majorGraduationsAngles.forEach((pValue, index) => {
      const majCos1Var = tempScope.innerRadius - majorGraduationMarginTop - majorGraduationLength;
      const majSin1Var = tempScope.innerRadius - majorGraduationMarginTop - majorGraduationLength;
      const majCos2Var = tempScope.innerRadius - majorGraduationMarginTop + majorGraduationLength;
      const majSin2Var = tempScope.innerRadius - majorGraduationMarginTop + majorGraduationLength;
      const cos1Adj = Math.round(Math.cos((90 - pValue) * Math.PI / 180) * (majCos1Var));
      const sin1Adj = Math.round(Math.sin((90 - pValue) * Math.PI / 180) * (majSin1Var));
      const cos2Adj = Math.round(Math.cos((90 - pValue) * Math.PI / 180) * (majCos2Var));
      const sin2Adj = Math.round(Math.sin((90 - pValue) * Math.PI / 180) * (majSin2Var));
      const x1 = this.centerX + cos1Adj;
      const y1 = this.centerY + sin1Adj * -1;
      const x2 = this.centerX + cos2Adj;
      const y2 = this.centerY + sin2Adj * -1;

      tempScope.svg.append('line')
        .classed('moon-gauge-graduation', true)
        .attr('x1', x1)
        .attr('y1', y1)
        .attr('x2', x2)
        .attr('y2', y2);

      tempScope.renderMinorGraduations(majorGraduationsAngles, index);
    });
  }


  getMajorGraduationAngles(majorGraduations) {
    const scaleRange = 2 * this.angle;
    const minScale = -1 * this.angle;
    const graduationsAngles = [];
    for (let i = 0; i <= majorGraduations; i += 1) {
      const scaleValue = minScale + i * scaleRange / (majorGraduations);
      graduationsAngles.push(scaleValue);
    }
    return graduationsAngles;
  }

  renderMinorGraduations(majorGraduationsAngles, indexMajor) {
    const minorGraduationsAngles = [];

    const majorGraduationMarginTop = -4;
    const minorGraduationLength = 4;
    const tempScope = this;
    if (indexMajor > 0) {
      const minScale = majorGraduationsAngles[indexMajor - 1];
      const maxScale = majorGraduationsAngles[indexMajor];
      const scaleRange = maxScale - minScale;

      for (let i = 1; i < this.minorGraduations; i += 1) {
        const scaleValue = minScale + i * scaleRange / this.minorGraduations;
        minorGraduationsAngles.push(scaleValue);
      }

      // Render Minor Graduations
      minorGraduationsAngles.forEach((pValue) => {
        const minCos1Var = tempScope.innerRadius - majorGraduationMarginTop - minorGraduationLength;
        const minSin1Var = tempScope.innerRadius - majorGraduationMarginTop - minorGraduationLength;
        const minCos2Var = tempScope.innerRadius - majorGraduationMarginTop + minorGraduationLength;
        const minSin2Var = tempScope.innerRadius - majorGraduationMarginTop + minorGraduationLength;
        const cos1Adj = Math.round(Math.cos((90 - pValue) * Math.PI / 180) * (minCos1Var));
        const sin1Adj = Math.round(Math.sin((90 - pValue) * Math.PI / 180) * (minSin1Var));
        const cos2Adj = Math.round(Math.cos((90 - pValue) * Math.PI / 180) * (minCos2Var));
        const sin2Adj = Math.round(Math.sin((90 - pValue) * Math.PI / 180) * (minSin2Var));
        const x1 = this.centerX + cos1Adj;
        const y1 = this.centerY + sin1Adj * -1;
        const x2 = this.centerX + cos2Adj;
        const y2 = this.centerY + sin2Adj * -1;

        tempScope.svg.append('line')
          .attr('x1', x1)
          .attr('y1', y1)
          .attr('x2', x2)
          .attr('y2', y2)
          .style('stroke', tempScope.minorGraduationColor);
      });
    }
  }

  updatePlot() {
    if (this.value < this.min || this.value > this.max) {
      this.writeMessage(`The Min Value is ${this.min} but the entered value is ${this.value}`);
      if (this.value > this.max) {
        this.writeMessage(`The Max Value is ${this.max} but the entered value is ${this.value}`);
      }
      return;
    }
    this.svg.selectAll('*').remove();
    this.plotGraph();
  }

  writeMessage(msg) {
    this.svg.selectAll('.message').remove();
    this.svg.append('text')
    .classed('message', true)
    .attr('x', this.centerX)
    .attr('y', this.centerY + 45)
    .text(msg);
  }

  $onChanges(changes) {
    if (changes.value != null) {
      if (changes.value.currentValue == null) {
        return;
      }
    }
    this.ranges[0].min = this.warningMin;
    this.ranges[0].max = this.criticalMin;
    this.ranges[1].min = this.criticalMin;
    this.ranges[1].max = this.max;
    this.displayValue = this.value;
    if (/^[0-9.]+$/.test(this.value)) {
      this.displayValue = +((this.value).toFixed((this.decimals > -1 ? this.decimals : 0)));
    }
    this.ranges2[0].min = this.min;
    this.ranges2[0].max = this.value;
    if (this.warningMin < this.min || this.warningMin > this.max) {
      this.writeMessage(`Warning value should be between ${this.min} and ${this.max}`);
      return;
    }
    if (this.criticalMin < this.min || this.criticalMin > this.max) {
      this.writeMessage(`Critical value should be between ${this.min} and ${this.max}`);
      return;
    }
    this.updatePlot();
  }
}

export default MoonGaugeController;

import React, {Component} from 'react';
import ReactDOM from "react-dom";
import cx from "classnames";
import 'whatwg-fetch';
import ReactEcharts from 'echarts-for-react';
import _ from 'underscore';

import GridLayout from './grid/GridLayout';

import barImage from '../images/bar.png';
import pieImage from '../images/pie.png';

const GRID_WIDTH = 18;
const GRID_ASPECT_RATIO = 4 / 3;
const GRID_MARGIN = 6;
const DEFAULT_CARD_SIZE = {width: 4, height: 4};


class DashboardGrid extends Component {
  constructor() {
    super();
    this.state = {
      layout: [],
      isDragging: false
    };
  }

  onDrag() {
    if (!this.state.isDragging) {
      this.setState({isDragging: true});
    }
  }

  onDragStop() {
    this.setState({isDragging: false});
  }

  onLayoutChange(layout) {
    this.setState({
      layout: layout,
    });
    fetch('http://localhost:3001/layouts.json', {
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.layout)
      }).then(function(response) {
        console.log(response);
      }, function(error) {
        console.log(error);
      });
  }

  componentDidMount() {
    console.log(ReactDOM.findDOMNode(this).offsetWidth);
  }

  addBar() {
    let initialSize = DEFAULT_CARD_SIZE;
    let clone = _.clone(this.state.layout);
    clone.push({
      i: '1',
      x: 0,
      y: 0,
      w: initialSize.width,
      h: initialSize.height,
      minSize: DEFAULT_CARD_SIZE,
      type: 'bar',
      option: {
        title : {
          text: 'Bar dataSet',
        },
        grid: {
          zlevel: 10,
          x: 80,
          y: 80,
          borderWidth: 1,
          borderColor: 'red'
        },
        color: ['#11807F'],
        tooltip : {
          trigger: 'axis'
        },
        legend: {
          data:['蒸发量']
        },
        toolbox: {
          show : true,
          feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
          }
        },
        calculable : true,
        xAxis : [
          {
            type : 'category',
            data : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
          }
        ],
        yAxis : [
          {
            type : 'value'
          }
        ],
        series : [
          {
            name:'降水量',
            type:'bar',
            data:[100, 105, 102, 110, 114, 109, 105, 99, 95],
          }
        ]
      }
    });
    this.setState({
      layout: clone
    });
  }

  addPie() {
    let initialSize = DEFAULT_CARD_SIZE;
    let clone = _.clone(this.state.layout);
    clone.push({
      i: '2',
      x: 6,
      y: 6,
      w: initialSize.width,
      h: initialSize.height,
      minSize: DEFAULT_CARD_SIZE,
      type: 'pie',
      option: {
        title : {
          text: 'Pie dataset',
          x:'center'
        },
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient : 'vertical',
          x : 'left',
          data:['Sandwiches','Salads','Soup','Beverages','Desserts']
        },
        toolbox: {
          show : true,
          feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {
              show: true,
              type: ['pie', 'funnel'],
              option: {
                funnel: {
                  x: '25%',
                  width: '50%',
                  funnelAlign: 'left',
                  max: 1548
                }
              }
            },
            restore : {show: true},
            saveAsImage : {show: true}
          }
        },
        calculable : true,
        series : [
          {
            name:'访问来源',
            type:'pie',
            radius : ['50%', '70%'],
            itemStyle : {
              normal : {
                label : {
                  show : true
                },
                labelLine : {
                  show : true
                }
              },
              emphasis : {
                label : {
                  show : true,
                  position : 'center',
                  textStyle : {
                    fontSize : '30',
                    fontWeight : 'bold'
                  }
                }
              }
            },
            data:[
              {value:40, name:'Sandwiches'},
              {value:21, name:'Salads'},
              {value:15, name:'Soup'},
              {value:9, name:'Beverages'},
              {value:15, name:'Desserts'}
            ]
          }
        ]
      }
    });
    this.setState({
      layout: clone
    });
  }

  renderGrid() {
    // const { dashboard, isEditing, isEditingParameter, width } = this.props;
    const width = 1440;
    const rowHeight = Math.floor(width / GRID_WIDTH / GRID_ASPECT_RATIO);
    return (
      <div className="wrapper">
        <img src={barImage} style={{width: 50, height: 50}} onClick={this.addBar.bind(this)} alt="bar"></img>
        <img src={pieImage} style={{width: 50, height: 50}} onClick={this.addPie.bind(this)} alt="pie"></img>
        <GridLayout
          className={cx("DashboardGrid", {
            "Dash--editing": true,
            "Dash--editingParameter": false,
            "Dash--dragging": this.state.isDragging
          })}
          layout={this.state.layout}
          cols={GRID_WIDTH}
          margin={GRID_MARGIN}
          rowHeight={rowHeight}
          onLayoutChange={(...args) => this.onLayoutChange(...args)}
          onDrag={(...args) => this.onDrag(...args)}
          onDragStop={(...args) => this.onDragStop(...args)}
          isEditing={true}
        >
          {this.state.layout.map(dc =>
            <div key={dc.i} className="DashCard">
              <div className="Card bordered rounded flex flex-column hover-parent hover--visibility">
                <ReactEcharts
                  option={dc.option}
                  style={{height: '100%', width: '100%'}}
                  className='react_for_echarts' />
              </div>
            </div>
          )}
        </GridLayout>
      </div>
    )
  }

  render() {
    return (
      <div className="flex layout-centered">
        {this.renderGrid()}
      </div>
    );
  }
}

export default DashboardGrid;

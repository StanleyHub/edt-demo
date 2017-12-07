import React, {Component} from 'react';
import ReactDOM from "react-dom";
import cx from "classnames";
import 'whatwg-fetch';


import GridLayout from './grid/GridLayout';

const GRID_WIDTH = 18;
const GRID_ASPECT_RATIO = 4 / 3;
const GRID_MARGIN = 6;
const DEFAULT_CARD_SIZE = {width: 4, height: 4};

class DashboardGrid extends Component {
  constructor() {
    super();
    let initialSize = DEFAULT_CARD_SIZE;
    this.state = {
      layout: [{
        i: '1',
        x: 0,
        y: 0,
        w: initialSize.width,
        h: initialSize.height,
        minSize: DEFAULT_CARD_SIZE
      },
        {
          i: '2',
          x: 6,
          y: 6,
          w: initialSize.width,
          h: initialSize.height,
          minSize: DEFAULT_CARD_SIZE
        }],
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

  renderGrid() {
    // const { dashboard, isEditing, isEditingParameter, width } = this.props;
    const width = 1440;
    const rowHeight = Math.floor(width / GRID_WIDTH / GRID_ASPECT_RATIO);
    return (
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
              <label>{dc.i}</label>
            </div>
          </div>
        )}
      </GridLayout>
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

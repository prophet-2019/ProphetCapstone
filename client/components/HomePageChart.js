import React, {Component} from 'react'
import {
  XYPlot,
  VerticalGridLines,
  HorizontalGridLines,
  LineSeries,
  XAxis,
  YAxis
} from 'react-vis'

class HomePageChart extends Component {
  render() {
    return (
      <XYPlot stackBy="y">
        <LineSeries
          color="red"
          curve={null}
          data={[
            {
              x: 0,
              y: 10
            },
            {
              x: 1,
              y: 9.538966871561591
            },
            {
              x: 2,
              y: 9.840522017583877
            },
            {
              x: 3,
              y: 10.013385712130859
            },
            {
              x: 4,
              y: 10.59802009388151
            },
            {
              x: 5,
              y: 10.699980596288244
            },
            {
              x: 6,
              y: 10.439072247951835
            },
            {
              x: 7,
              y: 10.997668451572352
            },
            {
              x: 8,
              y: 11.108826685796297
            },
            {
              x: 9,
              y: 10.880307411916961
            },
            {
              x: 10,
              y: 10.812580848557463
            },
            {
              x: 11,
              y: 10.837955086535423
            },
            {
              x: 12,
              y: 10.804000305173727
            },
            {
              x: 13,
              y: 10.654028468190948
            },
            {
              x: 14,
              y: 10.01038939014212
            },
            {
              x: 15,
              y: 10.493010494414637
            },
            {
              x: 16,
              y: 10.360810162968363
            },
            {
              x: 17,
              y: 9.84199867484396
            },
            {
              x: 18,
              y: 9.616928842568067
            },
            {
              x: 19,
              y: 9.760062923670914
            },
            {
              x: 20,
              y: 9.673660769507018
            }
          ]}
          strokeStyle="solid"
          style={{}}
        />
        <XAxis title="X" />
        <YAxis title="Jay" />
      </XYPlot>
    )
  }
}

export default HomePageChart

import React, { useEffect, useState } from 'react'
import F2 from '@antv/f2';
import { IRecord } from '../../data/models/Record';

interface RecordsDynamicLineChartProps {
  records: IRecord[]
  height?: number | string
  width?: number | string
  lineColor?: string
}

export const RecordsDynamicLineChart = (props: RecordsDynamicLineChartProps) => {
  let [records, setRecords] = useState<IRecord[]>([])
  let [chart, setChart] = useState<any>()

  F2.Animate.registerAnimation('lineUpdate', function (updateShape: any, animateCfg: any) {
    const cacheShape = updateShape.get('cacheShape'); // 该动画 shape 的前一个状态
    const cacheAttrs = cacheShape.attrs; // 上一个 shape 属性
    const oldPoints = cacheAttrs.points; // 上一个状态的关键点
    const newPoints = updateShape.attr('points'); // 当前 shape 的关键点

    const oldLength = oldPoints.length;
    const newLength = newPoints.length;
    const deltaLength = newLength - oldLength;

    const lastPoint = newPoints[newPoints.length - 1];
    for (let i = 0; i < deltaLength; i++) {
      oldPoints.push(lastPoint);
    }

    updateShape.attr(cacheAttrs);
    updateShape.animate().to({
      attrs: {
        points: newPoints
      },
      duration: 2000,
      easing: animateCfg.easing
    });
  });


  useEffect(() => {
    if (!chart) {
      const newChart = new F2.Chart({
        id: 'mountNode',
        pixelRatio: window.devicePixelRatio
      });
  
      const defs = {
        timestamp: {
          type: 'timeCat',
          mask: 'MM/DD',
          tickCount: 3,
          range: [0, 1]
        },
        amount: {
          tickCount: 5,
          min: 0,
          alias: 'amount' // TODO - use unit name here
        }
      };
      const color = props.lineColor ? props.lineColor : '#fff'
      const data2 = props.records.map(r => ({ ...r, amount: Number(r.amount) }))
      setRecords(data2)
      newChart.source(data2, defs);

      newChart.axis('time', {
        label: function label(text: any, index: any, total: any) {
          const textCfg: { textAlign?: string } = {};
          if (index === 0) {
            textCfg.textAlign = 'left';
          } else if (index === total - 1) {
            textCfg.textAlign = 'right';
          }
          return textCfg;
        }
      });
      newChart.tooltip({
        showCrosshairs: true
      });
      newChart.line().position('timestamp*amount').shape('smooth').animate({
        update: {
          animation: 'lineUpdate'
        }
      }).color(color)
      .style({
        lineWidth: 3
      })
  
      newChart.point().position('timestamp*amount').shape('smooth')
        .style({
          stroke: color,
          fill: color,
          lineWidth: 1,
  
        });
      newChart.render();
  
      setChart(newChart)

    }
  }, [props.lineColor, props.records, chart]);

  function addToChart(record: IRecord) {
    const newRecord = { ...record, amount: Number(record.amount) }
    setRecords(r => [...r, newRecord])
  }
  useEffect(() => {
    const lastRecord = props.records[props.records.length - 1]
    addToChart(lastRecord)
  }, [props.records])

  return (
    <div id="container"  style={{ display: 'flex', justifyContent: 'center' }}>
      <canvas
        id="mountNode"
        height={props.height}
        width={props.width}
      />
      {chart && records ? (chart.changeData(records)) : null}
    </div>
  )
}

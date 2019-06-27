  function draw() {
      console.log(path)
      let drawPath = []
      let boxNum = $("#output").children(".red");
      //   boxNum.forEach(element => {
      //       console.log(element.innerHTML)
      //   });
      for (const key in boxNum) {
          if (!isNaN(key)) {
              const element = boxNum[key];
              drawPath.push(parseInt(element.innerHTML))
          }
      }
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('echarts'));
      // 指定图表的配置项和数据
      var option = {
          title: {
              text: '磁头移动道数：' + getTotalLength(drawPath)
          },
          legend: {
              data: ['磁盘扫描模拟图']
          },
          tooltip: {
              trigger: 'axis',
              formatter: function (params) {
                  var showContent = params[0].seriesName + "：" + params[0].value;
                  return showContent;
              }
          },
          xAxis: [{
              type: 'value',
              position: 'top',
              axisLine: {
                  onZero: false
              },
              axisPointer: {
                  type: 'line',
                  show: true,
                  label: {
                      show: true
                  }
              },

          }],
          yAxis: [{
              type: 'category',
              inverse: true,
          }],
          series: [{
              name: '磁盘扫描模拟图',
              type: 'line',
              symbolSize: 10,
              smooth: false,
              itemStyle: {
                  normal: {
                      color: '#00a4d8',
                      lineStyle: {
                          shadowColor: 'rgba(0,0,0,0.4)'
                      }
                  }
              },
              data: drawPath
          }]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
  }

  function getLength(x1, x2) {
      return Math.abs(x1 - x2);
  }

  function getTotalLength(path) {
      let total = 0;
      for (let i = 0; i < path.length - 1; i++) {
          total += getLength(path[i], path[i + 1])
      }
      if (isCSCAN) {
          let min = Math.min(...path);
          let max = Math.max(...path);
          total = total - (max - min);
      }
      return total;
  }
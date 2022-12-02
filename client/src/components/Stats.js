// import "./styles.css";
import React, { useEffect, useState } from "react";
import { getStats } from "./functions";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
// import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Distribution of Frequencies of Providers Based on Efficiency \t\t[ Efficiency = (Total Sold / Total Produced) ]',
    },
  },
};

export const options2 = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Distribution of Frequencies of Providers Based on Rating',
    },
  },
};

function Stats() {
  const [stat,setStat] = useState(null)
  const [stat2,setStat2] = useState(null)
  const [stat3,setStat3] = useState(null)
  const [stat4,setStat4] = useState(null)
  const [stat5,setStat5] = useState(null)
  useEffect(() => {
    async function callApi() {
      const response = await getStats()
      // const response = {
      //   data: {
      //     response: {data: { wastage_provider }}
      //   }
      // }
    
      console.log("response")
      const data = response.data.response.data
      let wastageMonth = data.wastage_month
      let ratingMonth = data.rating_month
      let wastageProvider = data.wastage_provider
      
      setStat(buildStats1(wastageMonth))
      setStat2(buildStats2_tmp(ratingMonth))

      let tempStatDataForProvider = []
      for (const [key, value] of Object.entries(wastageProvider)) {
        tempStatDataForProvider.push(buildStats3(wastageProvider[key]))
      }

      setStat3(tempStatDataForProvider[0])
      setStat4(tempStatDataForProvider[1])
      setStat5(tempStatDataForProvider[2])
      


    }
    callApi()
  },[])

  function buildStats1(wastageMonth) {
      const monthDict = {
        1: "Jan",
        2:"Feb",
        3:"March",
        4:"April",
        5:"May",
        6:"June",
        7:"July",
        8:"August",
        9:"Sept",
        10:"Oct",
        11:"Nov",
        12:"Dec",
      }

      // 1
      let monthNums = []
      let labels = []
      for (const [key, value] of Object.entries(wastageMonth)) {
        labels.push(monthDict[parseInt(key)])
        monthNums.push(parseInt(key))
      }
      monthNums.sort()
      console.log("monthNums",monthNums)

      let wastageMonthMinimum = []
      let wastageMonthMaximum = []
      let wastageMonthAverage = []      
      for(var i=0; i < monthNums.length; i++){
        wastageMonthMinimum.push(wastageMonth[monthNums[i]]["Minimum"])
        wastageMonthAverage.push(wastageMonth[monthNums[i]]["Average"])
        wastageMonthMaximum.push(wastageMonth[monthNums[i]]["Maximum"])
      }
      console.log(labels)
      console.log(wastageMonthMinimum)
      console.log(wastageMonthMaximum)
      console.log(wastageMonthAverage)

      let temp = {
        labels,
        datasets: [
          {
            label: 'Minimum (<0.3)',
            data: wastageMonthMinimum,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Average (0.3-0.5)',
            data: wastageMonthAverage,
            backgroundColor: 'rgba(255, 99, 60, 0.5)',
          },
          {
            label: 'Maximum (>0.5)',
            data: wastageMonthMaximum,
            backgroundColor: 'rgba(255, 99, 12, 0.5)',
          },
        ],
      }
      return temp
  }

  function buildStats2_tmp(wastageMonth) {
    const monthDict = {
      1: "Jan",
      2:"Feb",
      3:"March",
      4:"April",
      5:"May",
      6:"June",
      7:"July",
      8:"August",
      9:"Sept",
      10:"Oct",
      11:"Nov",
      12:"Dec",
    }

    // 1
    let monthNums = []
    let labels = []
    for (const [key, value] of Object.entries(wastageMonth)) {
      labels.push(monthDict[parseInt(key)])
      monthNums.push(parseInt(key))
    }
    monthNums.sort()
    console.log("monthNums",monthNums)

    let wastageMonthMinimum = []
    let wastageMonthMaximum = []
    let wastageMonthAverage = []      
    for(var i=0; i < monthNums.length; i++){
      wastageMonthMinimum.push(wastageMonth[monthNums[i]]["Very Poor"])
      wastageMonthAverage.push(wastageMonth[monthNums[i]]["Average"])
      wastageMonthMaximum.push(wastageMonth[monthNums[i]]["Very Good"])
    }
    console.log(labels)
    console.log(wastageMonthMinimum)
    console.log(wastageMonthMaximum)
    console.log(wastageMonthAverage)

    let temp = {
      labels,
      datasets: [
        {
          label: 'Very Poor (<2)',
          data: wastageMonthMinimum,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Average (2-3)',
          data: wastageMonthAverage,
          backgroundColor: 'rgba(255, 99, 60, 0.5)',
        },
        {
          label: 'Very Good (>3)',
          data: wastageMonthMaximum,
          backgroundColor: 'rgba(255, 99, 12, 0.5)',
        },
      ],
    }
    return temp
}

  function buildStats2(ratingMonth) {
    const monthDict = {
      1: "Jan",
      2:"Feb",
      3:"March",
      4:"April",
      5:"May",
      6:"June",
      7:"July",
      8:"August",
      9:"Sept",
      10:"Oct",
      11:"Nov",
      12:"Dec",
    }
    let monthNums = []
    let labels = []
    for (const [key, value] of Object.entries(ratingMonth)) {
      labels.push(monthDict[parseInt(key)])
      monthNums.push(parseInt(key))
    }
    monthNums.sort()
    console.log("monthNums",monthNums)

    let ratingMonthAverage = []
    for(var i=0; i < monthNums.length; i++){
      ratingMonthAverage.push(ratingMonth[monthNums[i]]["Average"])
    }
    console.log(labels)
    console.log(ratingMonthAverage)

    let temp = {
      labels,
      datasets: [
        {
          label: 'Average',
          data: ratingMonthAverage,
          backgroundColor: 'rgba(255, 99, 60, 0.5)',
        },
      ],
    }
    return temp
  }

  function buildStats3(arr) {
    const monthDict = {
      1: "Jan",
      2:"Feb",
      3:"March",
      4:"April",
      5:"May",
      6:"June",
      7:"July",
      8:"August",
      9:"Sept",
      10:"Oct",
      11:"Nov",
      12:"Dec",
    }
    let labels = []
    let barValues = []
    for (var i=1; i < arr.length; i++) {
      if(arr[i] !== 0) {
        labels.push(monthDict[parseInt(i)])
        barValues.push(arr[i])
      }
    }

    let temp = {
      labels,
      datasets: [
        {
          label: 'Values',
          data: barValues,
          backgroundColor: 'rgba(255, 99, 60, 0.5)',
        },
      ],
    }
    return temp
  }

  return (
    <div style={{height: "90vh"}}>
      <h1 style={{fontSize:"40px"}}><center>Wastage and Rating Analytics</center></h1>
      {/* wastageMonth <br></br> */}
      {stat && <Bar options={options} data={stat} />}
      <br></br><br></br><br></br>
      {/* ratingMonth <br></br> */}
      {stat2 && <Bar options={options2} data={stat2} />}
      <br></br><br></br><br></br>
      {/* wastage_provider1<br></br>
      {stat2 && <Bar options={options} data={stat3} />}
      <br></br><br></br><br></br>
      wastage_provider2<br></br>
      {stat2 && <Bar options={options} data={stat4} />}
      <br></br><br></br><br></br>
      wastage_provider3<br></br>
      {stat2 && <Bar options={options} data={stat5} />} */}
    </div>
  );
}

export default Stats;

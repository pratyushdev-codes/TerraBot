import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import io from 'socket.io-client';
import { toast } from 'react-hot-toast'; // Added missing import for toast

function Home() {
  const [heartRate, setHeartRate] = useState(0);
  const [bloodPressure, setBloodPressure] = useState(0);
  const [steps, setSteps] = useState(0);
  const [calories, setCalories] = useState(0);
  const [chartData, setChartData] = useState([]);

  const [temperature, setTemperature] = useState('');
  const [humidity, setHumidity] = useState('');
  const [nitrogen, setNitrogen] = useState('');
  const [potassium, setPotassium] = useState('');
  const [phosphorous, setPhosphorous] = useState('');
  const [rainfall, setRainfall] = useState('');
  const [ph, setPh] = useState('');
  const [predictedCrop, setPredictedCrop] = useState('');
  const [recommendedFertilizer, setRecommendedFertilizer] = useState('');

  const [tableCompletely, setTableCompletely] = useState({}); // Added missing state variable

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    
    const sendCropHealth = async () => {
      try {
        const response = await axios.post("http://0.0.0.0:8000/predict", {
      
            N: nitrogen,
            P: phosphorous,
            K: potassium,
            temperature: temperature,
            humidity: humidity,
            ph: ph,
            rainfall: rainfall
        });
        console.log(response.data);
        toast.success("Data sent successfully");
        setPredictedCrop(response.data.recommended_crop);
        setRecommendedFertilizer(response.data.recommended_fertilizer);
        
      } catch (error) {
        console.error(error);
        toast.error("Error sending data");
      }
    };
    
    sendCropHealth();
  };

  useEffect(() => {
    const socket = io();

    socket.on('data', (data) => {
      const parsedData = parseInt(data, 10);
      setSteps(parsedData);
      setCalories(parsedData * 0.033);
    });

    function generateRandomValue() {
      return Math.floor(Math.random() * (100 - 60 + 1)) + 60;
    }

    const updateBeatsPerMinute = () => {
      const beatsPerMinuteElement = document.getElementById("beatsPerMinuteElement");
      if (beatsPerMinuteElement) {
        const newValue = generateRandomValue();
        beatsPerMinuteElement.textContent = newValue;
        setHeartRate(newValue); // Update state to match DOM
      }
    }

    updateBeatsPerMinute();

    const heartRateInterval = setInterval(() => {
      updateBeatsPerMinute();
    }, 5000);

    function generateRandomValue1() {
      return Math.floor(Math.random() * 12) + 70; // Fixed random range calculation
    }

    const updateBP = () => {
      const bpElement = document.getElementById("bp");
      if (bpElement) {
        const newValue = generateRandomValue1();
        bpElement.textContent = newValue;
        setBloodPressure(newValue); // Update state to match DOM
      }
    }

    updateBP(); // Initial update for blood pressure

    const bloodPressureInterval = setInterval(() => {
      updateBP();
    }, 2000);

    const updateChartData = () => {
      setChartData((prevData) => {
        const newData = [...prevData, { name: new Date().toLocaleTimeString(), heartRate: generateRandomValue(), bloodPressure: generateRandomValue1(), calories }];
        return newData.slice(-7); // Keep only the most recent 7 data points
      });
    };

    const chartDataInterval = setInterval(updateChartData, 2000);

    // Initial update
    updateChartData();

    return () => {
      clearInterval(heartRateInterval);
      clearInterval(bloodPressureInterval);
      clearInterval(chartDataInterval);
      socket.disconnect();
    };
  }, [calories]);


  //APIS for communication

  //Sending Step Count for Health Status APIS
  const sendStep = () => {
    fetch("http://127.0.0.1:3000/sendStep", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ steps }), // Properly stringify the body
      credentials: "include", // Include this line if you need to send cookies with the request
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        toast.success(response["message"]);
        setTableCompletely(response);
      })
      .catch((err) => {
        toast.error("Error Sending Step count Data");
        console.log(err);
      });
  };


  //Sending HeartBeat for Health Status
  const sendHeartBeats = () => {
    fetch("http://127.0.0.1:5000/sendHeartBeats", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ heartRate }), // Properly stringify the body
      credentials: "include", // Include this line if you need to send cookies with the request
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        toast.success(response["message"]);
        setTableCompletely(response);
      })
      .catch((err) => {
        toast.error("Error Sending Heart Beat Data");
        console.log(err);
      });
  };

  return (
    <main className='main-container' style={{ backgroundImage: "url('/images/grad1.png')", backgroundSize: "cover" }}>
      <div style={{padding: '20px', backgroundColor: '#ffffff20', borderRadius: '30px', marginTop: '20px', color: 'white', textAlign:"center"}}>
      <br/>
        <h1 style={{fontWeight:"bold", color:"gray", opacity:"50px"}}>Remote Soil and Agriculture Monitoring Rover</h1>
        <br/>
        <img src='../public/images/rover.png' style={{borderRadius:"30px", opacity:"75%", width:"95%"}}/></div>
      <br/>
      <div className='main-title'>
        <h3><i className="fa-solid fa-list" style={{ color: "#2862FF" }}></i> &nbsp;Dashboard </h3>
      </div>
      <p className="text-sm" style={{ color: "darkgrey" }}>Real Time data from TerraBot - Soil Rover.</p>
      <div className='main-cards'>
        <div className='card' style={{ borderRadius: '10px' }}>
          <div className='card-inner'>
            <h5 style={{ color: 'white' }}> <i className="fa-solid fa-heart-pulse"></i> &nbsp;Temprature</h5>
          </div>
          <h1 id='beatsPerMinuteElement'>{heartRate}</h1>
          <p className="text-sm">°C</p>
        </div>
        <div className='card' style={{ borderRadius: '10px' }}>
          <div className='card-inner'>
            <h5 style={{ color: 'white' }}> <i className="fa-solid fa-chart-simple"></i> &nbsp;Humidity</h5>
          </div>
          <h1 id='bp'>{bloodPressure}</h1>
          <h5>(g/m^3)</h5>
        </div>

        <div className='card' style={{ borderRadius: '10px' }}>
          <div className='card-inner'>
            <h5 style={{ color: 'white' }}> <i className="fa-solid fa-chart-simple"></i> &nbsp;Motion around rover</h5>
          </div>
          <h1 id='bp'>{bloodPressure}</h1>

        </div>
        <div className='card' style={{ borderRadius: '10px', backgroundColor: "#8885D8" }}>
          <div className='card-inner'>
            <h5 style={{ color: 'white' }}> <i className="fa-solid fa-shoe-prints"></i> &nbsp; Gas</h5>
          </div>
          <h1 id='stepsData'>{steps}</h1>

        </div>
        <div className='card' style={{ borderRadius: '10px', backgroundColor: "#FDDF8E" }}>
          <div className='card-inner'>
            <h5 style={{ color: 'white' }}> <i className="fa-solid fa-notes-medical"></i> &nbsp;Light Dependent Resistor </h5>
          </div>
          <h1>{calories.toFixed(2)}</h1>
          <p className="text-sm"> (cd/m²)</p>
        </div>
      </div>

      <br />

      <h3> <i className="fa-solid fa-chart-line" style={{ color: "#2862FF" }}></i> &nbsp;Rover Data Chart </h3>
      <p className="text-sm" style={{ color: "darkgrey" }}>Real Time Health data plotted in a graph for deep analysis.</p>
      <div className='charts'>
        <ResponsiveContainer width='100%' height={300}>
          <BarChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey='heartRate' fill='#8884d8' />
            <Bar dataKey='bloodPressure' fill='#82ca9d' />
            <Bar dataKey='calories' fill='#ffc658' />
          </BarChart>
        </ResponsiveContainer>
        <ResponsiveContainer width='100%' height={300}>
          <LineChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type='monotone' dataKey='heartRate' stroke='#8884d8' activeDot={{ r: 8 }} />
            <Line type='monotone' dataKey='bloodPressure' stroke='#82ca9d' />
            <Line type='monotone' dataKey='calories' stroke='#ffc658' />
          </LineChart>
        </ResponsiveContainer>






      </div>
              {/* AI ML Model form starts here  */}
              <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
  <div className="rounded-2xl shadow-xl w-full max-w-md">
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Predict suitable Crop</h1>
      <p className="text-gray-600">using AI ML models and realtime Sensor Data</p>
    </div>

    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-transparent text-white p-6 rounded-lg shadow-md "
    >
      <input
        type="number"
        value={nitrogen}
        onChange={(e) => setNitrogen(e.target.value)}
        placeholder="Nitrogen Content in Soil (N)"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        value={phosphorous}
        onChange={(e) => setPhosphorous(e.target.value)}
        placeholder="Phosphorous Content in Soil (P)"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        value={potassium}
        onChange={(e) => setPotassium(e.target.value)}
        placeholder="Potassium Content in Soil (K)"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        value={temperature}
        onChange={(e) => setTemperature(e.target.value)}
        placeholder="Temperature in °C"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        value={humidity}
        onChange={(e) => setHumidity(e.target.value)}
        placeholder="Relative Humidity (%)"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        value={ph}
        onChange={(e) => setPh(e.target.value)}
        placeholder="pH value of Soil"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        value={rainfall}
        onChange={(e) => setRainfall(e.target.value)}
        placeholder="Rainfall (mm)"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex justify-center">
        <button
          type="submit"
          style={{ backgroundColor: "#2C4C9D", borderRadius: "20px", width: "150px", padding: "10px" }}
          className="text-white transition-colors"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</div>

<div className="prediction-card" style={{ padding: '20px', backgroundColor: '#ffffff20', borderRadius: '10px', marginTop: '20px', color: 'white' }}>
  <h3> Predicted Crop & Fertilizer Recommendation</h3>
  {predictedCrop && recommendedFertilizer && (
  <div className="prediction-box" style={{ padding: '20px', marginTop: '20px', borderRadius: '12px', backgroundColor: '#fff2', color: 'white' }}>
    <h3 className="text-xl font-semibold mb-2">🌾 Prediction Result</h3>
    <p><strong>Recommended Crop:</strong> {predictedCrop}</p>
    <p><strong>Recommended Fertilizer:</strong> {recommendedFertilizer}</p>
  </div>
)}

</div>

    </main>
  );
}

export default Home;
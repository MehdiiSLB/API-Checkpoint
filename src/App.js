import { useState, useEffect } from "react";
import axios from "axios";
import "antd/dist/antd.css";
import { Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { SearchOutlined, AntCloudOutlined } from "@ant-design/icons";
import { Spin, Space } from "antd";
import { Card } from "antd";

function App() {
  const [counter, setCounter] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [City, setCity] = useState("London");
  const [input, setInput] = useState();
  const { Meta } = Card;
  const [weather, setWeather] = useState();

  async function getWeather() {
    console.log("Inside getWeather : ", City);
    setError(false);
    setLoading(true);
    try {
      const reponse = await axios.get(
        "https://www.metaweather.com/api/location/search/?query=" + City
      );
      const reponse2 = await axios.get(
        "https://www.metaweather.com/api/location/" + reponse.data[0].woeid
      );
      console.log(reponse2.data.consolidated_weather[0]);
      setWeather(reponse2.data.consolidated_weather);
      setLoading(false);
      console.log("Inside getweather");
    } catch (error) {
      console.log(error);
      setError(true);
    }
  }
  useEffect(() => {
    getWeather();
  }, [City]);
  return (
    <div>
      <Input
        size="large"
        placeholder="Enter a city"
        prefix={<AntCloudOutlined />}
        bordered={false}
        style={{ width: "50%", marginRight: "2rem" }}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button
        type="primary"
        icon={<SearchOutlined />}
        size="large"
        onClick={(e) => {
          e.preventDefault();
          setCity(input);
        }}
      >
        Search
      </Button>
      {error ? (
        <div>Ville non disponible</div>
      ) : (
        <>
          {loading ? (
            <div>
              <Spin size="large" />
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              {weather.map((elem) => (
                <Card
                  hoverable
                  style={{ width: 240, marginRight: "1rem" }}
                  cover={
                    <img
                      alt="example"
                      src={`https://www.metaweather.com/static/img/weather/${elem.weather_state_abbr}.svg`}
                    />
                  }
                >
                  <Meta
                    title={elem.applicable_date}
                    description={elem.weather_state_name}
                  />
                </Card>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;

// import { useState, useEffect } from "react";
// import axios from "axios";
// function App() {
//   const [counter, setCounter] = useState("");
//   const [error, setError] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [id, setId] = useState(1);
//   async function getData() {
//     try {
//       const reponse = await axios.get(
//         "https://jsonplaceholder.typicode.com/todos/" + id
//       );
//       setCounter(reponse.data.title);
//       setLoading(false);
//       console.log("Inside getdata");
//     } catch (err) {
//       console.log("erreur");
//       setError(true);
//     }
//   }
//   useEffect(() => {
//     getData();
//   }, [id]);
//   return (
//     <div>
//       {error ? (
//         <div>error</div>
//       ) : (
//         <>{loading ? <div>Loading</div> : <div>{counter}</div>}</>
//       )}
//       <button
//         onClick={() => {
//           setId(id + 1);
//         }}
//       >
//         getData
//       </button>
//     </div>
//   );
// }
// export default App;

import "bootstrap/dist/css/bootstrap.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 
import './styles/App.scss';
import { useEffect, useState } from "react";
import Slider from "react-slick";

function App() {
  const [recommendations, setRecommendations] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://aws-p2-lb00.distrelec.com/FACT-Finder/Recommender.ff?do=getRecommendation&channel=distrelec_7801_ex_en&format=json&maxResults=8&id=30117212');
        const json = await response.json();
        console.log(json);
        setRecommendations(json.resultRecords);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  let settings = {
    autoplay: true,
    infinite: true,
    speed: 1000,
    arrows: true,
    slidesToShow: 4,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 3
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1
        },
      },
    ],

  }

  return (
    <div className="container">
      <h4 className="text-muted">Recommended Products</h4>
      {recommendations.length === 0 ? (
        <div className="spinner-border" role="status">
          <span className="sr-only text-primary"></span>
        </div>
      ) : (
        <Slider {...settings} >
          {recommendations.map((currentRec) => (
            <div className="out" key={currentRec.id}>
              <div className="card">
                <img alt=""
                src={`https://www.distrelec.biz/${currentRec.record.ImageURL}`} />
                <div className="card-body">
                  <h5 className="card-title" title={`${currentRec.record.Title}`} >{currentRec.record.Title}</h5>
                  <small className="card-text text-sm-center text-muted">Stock: {currentRec.record.totalInStock}</small>
                  <br/>
                  <strong className="card-text text-sm-center text-muted">EUR {currentRec.record.singleMinPrice}</strong>
                  <br/>
                  <button className="btn btn-sm buy-now btn-primary">Buy Now</button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}

export default App;

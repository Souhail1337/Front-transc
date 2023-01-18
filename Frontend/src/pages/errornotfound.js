import React, { useEffect, useRef, useLayoutEffect} from "react";
import { Link } from "react-router-dom";
import "./error.scss";
function Errornotfound() {
    const boxRef = useRef(0);
  
    useEffect(() => {
      const pageX = document.documentElement.clientWidth;
      const pageY = document.documentElement.clientHeight;
      let mouseY = 0;
      let mouseX = 0;
    
      function handleMouseMove (event){
        mouseY = event.pageY;
        const yAxis = (pageY / 2 - mouseY) / pageY * 300;
        mouseX = event.pageX / -pageX;
        const xAxis = -mouseX * 100 - 100;
            if(boxRef.current) {
                boxRef.current.style.transform = `translate(${xAxis}%, -${yAxis}%)`;
            }
      }
      window.addEventListener("mousemove", handleMouseMove);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }, []);
  
    return (
      <div>
  <div>
    <div>
      <svg width="380px" height="500px" viewBox="0 0 837 1045" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
          <path d="M353,9 L626.664028,170 L626.664028,487 L353,642 L79.3359724,487 L79.3359724,170 L353,9 Z" id="Polygon-1" stroke="#007FB2" stroke-width="6" sketch:type="MSShapeGroup"></path>
          <path d="M78.5,529 L147,569.186414 L147,648.311216 L78.5,687 L10,648.311216 L10,569.186414 L78.5,529 Z" id="Polygon-2" stroke="#EF4A5B" stroke-width="6" sketch:type="MSShapeGroup"></path>
          <path d="M773,186 L827,217.538705 L827,279.636651 L773,310 L719,279.636651 L719,217.538705 L773,186 Z" id="Polygon-3" stroke="#795D9C" stroke-width="6" sketch:type="MSShapeGroup"></path>
          <path d="M639,529 L773,607.846761 L773,763.091627 L639,839 L505,763.091627 L505,607.846761 L639,529 Z" id="Polygon-4" stroke="#F2773F" stroke-width="6" sketch:type="MSShapeGroup"></path>
          <path d="M281,801 L383,861.025276 L383,979.21169 L281,1037 L179,979.21169 L179,861.025276 L281,801 Z" id="Polygon-5" stroke="#36B455" stroke-width="6" sketch:type="MSShapeGroup"></path>
      </g>
      </svg>
    </div>
  <div className="wrapper">
    <div className="glitch_word_box">
      <div className="line"></div>
      <h1 id="word" className="glitch_word0">404 - page not found</h1>
      <h1 id="word1" className="glitch_word1">404 - page not found</h1>
      <h1 id="word2" className="glitch_word2">404 - page not found</h1>
    </div>

      <br/>
      <br/>
      <br/>
      <br/>
   
      <div>
    <p>It seems that you're lost in a perpetual black hole. Let us help guide you out and get you back home.</p>
    <Link to={"/"} className="buttons">back</Link><br/></div>
  </div>
  
  <br/>
  <div className="space">
    <div className="blackhole"></div>
    <div className="ship"></div>
  </div>
    </div>
      </div>
  )
}


export default Errornotfound;
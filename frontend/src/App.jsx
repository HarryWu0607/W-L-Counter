import { useState, useEffect } from "react";
import { Container, Button, Card, Image } from "react-bootstrap";
import "./App.css";

// Theme assets
import pinkBackground from "./assets/pink2.jpg";
import rabbitGif from "./assets/rabbit.gif";
import headSpaceBackground from "./assets/headspace3.png"; //whitespace.jpeg
import omoriGif from "./assets/omori.gif";

// Default GIFs
import happyGif from "./assets/peach-happy.gif";  
import neutralGif from "./assets/peach-and-goma-neutral.gif"; 
import sadGif from "./assets/peach-sad.gif"; 
import annoyedGif from "./assets/peach-annoyed.gif"; 
import excitedGif from "./assets/peach-excited.gif"; 

// Alt GIFs
import happyGifAlt from "./assets/cat-jumping.gif";  
import neutralGifAlt from "./assets/chips-cat.gif"; 
import sadGifAlt from "./assets/cat-voices.gif"; 
import annoyedGifAlt from "./assets/cat-sad.gif"; 
import excitedGifAlt from "./assets/cat-devious.gif"; 

// Omori GIFs
import happyGifOmori from "./assets/omori-happy.gif";
import neutralGifOmori from "./assets/omori-neutral.gif";
import depressedGifOmori from "./assets/omori-depressed.gif";
import sadGifOmori from "./assets/omori-sad.gif";
import excitedGifOmori from "./assets/omori-ecstatic.gif";

function App() {
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [useAltGifs, setUseAltGifs] = useState(false);
  const [theme, setTheme] = useState("pink"); // "pink" | "omori"

  useEffect(() => {
    const savedWins = localStorage.getItem("wins");
    const savedLosses = localStorage.getItem("losses");
    if (savedWins) setWins(parseInt(savedWins));  
    if (savedLosses) setLosses(parseInt(savedLosses));
  }, []);

  useEffect(() => {
    localStorage.setItem("wins", wins);
    localStorage.setItem("losses", losses);
  }, [wins, losses]);

  const totalGames = wins + losses;
  const winPercentage = totalGames > 0 ? ((wins / totalGames) * 100).toFixed(2) : 0;

  const gifs =
  theme === "omori"
    ? useAltGifs
      ? {
          happy: happyGifAlt,
          neutral: neutralGifAlt,
          sad: sadGifAlt,
          annoyed: annoyedGifAlt,
          excited: excitedGifAlt
        }
      : {
          happy: happyGifOmori,
          neutral: neutralGifOmori,
          sad: depressedGifOmori,
          annoyed: sadGifOmori,
          excited: excitedGifOmori
        }
    : useAltGifs
    ? {
        happy: happyGifAlt,
        neutral: neutralGifAlt,
        sad: sadGifAlt,
        annoyed: annoyedGifAlt,
        excited: excitedGifAlt
      }
    : {
        happy: happyGif,
        neutral: neutralGif,
        sad: sadGif,
        annoyed: annoyedGif,
        excited: excitedGif
      };


  let gifSrc = gifs.neutral;
  if (winPercentage > 75) {
    gifSrc = gifs.excited;
  } else if (winPercentage > 50) {
    gifSrc = gifs.happy;
  } else if (winPercentage < 50 && winPercentage > 25 && totalGames > 0) {
    gifSrc = gifs.annoyed;
  } else if (winPercentage <= 25 && totalGames > 0) {
    gifSrc = gifs.sad;
  }

  // Dynamic theme styles
  const isPink = theme === "pink";
  const backgroundImage = isPink ? pinkBackground : "none";
  const titleBg = isPink ? "#b78399" : "#ffffff";
  const borderColor = isPink ? "#fdc0d2" : "#000000";
  const textColor = isPink ? "white" : "#000000";
  const bunnyIcon = isPink ? rabbitGif : omoriGif;
  const backgroundColor = isPink ? "#FFDDE1" : "#ffffff"; // Pink vs White


  // Theme toggle (bunny click)
  const toggleTheme = () => {
    setTheme(prev => (prev === "pink" ? "omori" : "pink"));
  };
  

  return (
    <Container 
      fluid 
      className="vh-100 vw-100 d-flex flex-column justify-content-center align-items-center text-center overflow-hidden"
      style={{ fontFamily: "'Pixelify Sans', sans-serif", backgroundColor: backgroundColor }}
    >
      {/* Title Card */}
      <Card 
        className="shadow-lg flex-shrink-0 d-flex align-items-center justify-content-between px-3"
        style={{
          width: "400px",
          height: "80px",
          backgroundColor: titleBg,
          border: `4px solid ${borderColor}`,
          backgroundClip: "border-box",
          overflow: "hidden"
        }}
      >  
        <div style={{ 
          display: "flex", 
          alignItems: "center",  
          justifyContent: "space-between", 
          width: "100%",
          height: "100%"
        }}>
          <h1 style={{ 
            color: textColor, 
            margin: "0", 
            textAlign: "left", 
            flex: 1,
            display: "flex",
            alignItems: "center",
            fontSize: "36px"
          }}>
            W/L Counter!
          </h1>

          <img 
            src={bunnyIcon}
            alt="Theme Icon"
            onClick={toggleTheme}
            style={{ 
              width: "70px", 
              height: "70px", 
              alignSelf: "center",
              marginLeft: "10px",
              marginBottom: isPink ? "15px" : "0px",
              display: "flex",
              objectFit: "contain",
              cursor: "pointer" // 🔁 Makes it clickable
            }} 
          />
        </div>
      </Card>

      {/* Main Card */}
      <Card 
        className="p-4 shadow-lg flex-shrink-0 d-flex flex-column align-items-center"
        style={{ 
          width: "400px",
          minHeight: "500px",
          backgroundImage: `url(${backgroundImage})`,
          backgroundColor: isPink ? "transparent" : "white", // for omori
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          border: `4px solid ${borderColor}`,
          backgroundClip: "border-box",
          overflow: "hidden"
        }} 
      >
     <div className="d-flex justify-content-center gap-4">
      <h2 className="mb-3">
        Wins: <span className={isPink ? "text-success" : "text-black"}>{wins}</span>
      </h2>
      <h2 className="mb-3">
        Losses: <span className={isPink ? "text-danger" : "text-black"}>{losses}</span>
      </h2>
    </div>

    <h2 className="mb-4">
      Winrate: <span className={isPink ? "text-info" : "text-black"}>{winPercentage}%</span>
    </h2>

        {/* GIF Display */}
        <div 
          className="d-flex justify-content-center align-items-center"
          style={{ width: "300px", height: "350px", overflow: "hidden" }}
        >
          <Image 
            src={gifSrc}  
            alt="Win/Loss GIF" 
            className="mb-3"
            style={{
              width: "300px",
              height: "300px",
              objectFit: "cover",
              borderRadius: isPink ? "0px" : "16px",     // Rounded corners for Omori
              border: isPink ? "none" : "4px solid black" // Black border only in Omori theme
             }} 
          />
        </div>

        {/* Buttons */}
        <div className="d-flex justify-content-center mt-4 gap-2 flex-wrap">
          <Button variant="none" className={`custom-button ${isPink ? "pink" : "omori"}`} onClick={() => setWins(wins + 1)}>+ Win</Button>
          <Button variant="none" className={`custom-button ${isPink ? "pink" : "omori"}`} onClick={() => setLosses(losses + 1)}>+ Loss</Button>
          <Button variant="none" className={`custom-button ${isPink ? "pink" : "omori"}`} onClick={() => setWins(Math.max(0, wins - 1))}>- Win</Button>
          <Button variant="none" className={`custom-button ${isPink ? "pink" : "omori"}`} onClick={() => setLosses(Math.max(0, losses - 1))}>- Loss</Button>
          <Button variant="none" className={`custom-button ${isPink ? "pink" : "omori"}`} onClick={() => { setWins(0); setLosses(0); }}>Reset</Button>
          <Button variant="none" className={`custom-button ${isPink ? "pink" : "omori"}`} onClick={() => setUseAltGifs(prev => !prev)}>Change GIFs</Button>
        </div>
      </Card>
    </Container>
  );
}

export default App;

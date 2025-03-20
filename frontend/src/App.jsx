import { useState, useEffect } from "react";
import { Container, Button, Card, Image } from "react-bootstrap";
import "./App.css";
import pinkBackground from "./assets/pink2.jpg";
import rabbitGif from "./assets/rabbit.gif";

// Import GIFs
import happyGif from "./assets/peach-happy.gif";  
import neutralGif from "./assets/peach-and-goma-neutral.gif"; 
import sadGif from "./assets/peach-sad.gif"; 
import annoyedGif from "./assets/peach-annoyed.gif"; 
import excitedGif from "./assets/peach-excited.gif"; 

// Import alt GIFS
import happyGifAlt from "./assets/cat-jumping.gif";  
import neutralGifAlt from "./assets/chips-cat.gif"; 
import sadGifAlt from "./assets/cat-voices.gif"; 
import annoyedGifAlt from "./assets/cat-sad.gif"; 
import excitedGifAlt from "./assets/cat-devious.gif"; 

function App() {
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [useAltGifs, setUseAltGifs] = useState(false);


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

  const gifs = useAltGifs
  ? { happy: happyGifAlt, neutral: neutralGifAlt, sad: sadGifAlt, annoyed: annoyedGifAlt, excited: excitedGifAlt }
  : { happy: happyGif, neutral: neutralGif, sad: sadGif, annoyed: annoyedGif, excited: excitedGif };

  // Assign GIF based on win percentage
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

  return (
    <Container 
      fluid 
      className="vh-100 vw-100 d-flex flex-column justify-content-center align-items-center text-center overflow-hidden"
      style={{ fontFamily: "'Pixelify Sans', sans-serif", backgroundColor: "#FFDDE1" }}

    >
      {/* Title Card - Fixed Size */}
      <Card 
        className="shadow-lg flex-shrink-0 d-flex align-items-center justify-content-between px-3"
        style={{
          width: "400px",
          height: "80px",
          backgroundColor: "#b78399",
          border: "4px solid #fdc0d2",
          backgroundClip: "border-box",
          overflow: "hidden"
        }}
      >  
        {/* Wrapper div to center items vertically */}
        <div style={{ 
          display: "flex", 
          alignItems: "center",  // ✅ Centers items vertically
          justifyContent: "space-between", // ✅ Ensures title is left, bunny is right
          width: "100%",
          height: "100%" // ✅ Ensures content fills full card height
        }}>
          {/* Left-Aligned Title */}
          <h1 style={{ 
            color: "white", 
            margin: "0", 
            textAlign: "left", 
            flex: 1, // ✅ Ensures title takes up space before the bunny
            display: "flex",
            alignItems: "center", // ✅ Centers text within its container
            fontSize: "36px"
          }}>
            W/L Counter!
          </h1>

          {/* Right-Aligned Bunny */}
          <img 
            src={rabbitGif} // ✅ Load image from assets
            alt="Bunny" 
            style={{ 
              width: "70px", 
              height: "70px", 
              alignSelf: "center",
              marginLeft: "10px", // ✅ Adds spacing from the title
              marginBottom: "15px",
              display: "flex",
              objectFit: "contain" // ✅ Ensures image fills its container
            }} 
          />
        </div>
      </Card>


      {/* Main Card - Fixed Size */}
      <Card 
        className="p-4 shadow-lg flex-shrink-0 d-flex flex-column align-items-center"
        style={{ 
          width: "400px",
          minHeight: "500px",
          backgroundImage: `url(${pinkBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          border: "4px solid #fdc0d2",
          backgroundClip: "border-box",
          overflow: "hidden"

        }} 
      >
        <div className="d-flex justify-content-center gap-4">
          <h2 className="mb-3">Wins: <span className="text-success">{wins}</span></h2>
          <h2 className="mb-3">Losses: <span className="text-danger">{losses}</span></h2>
        </div>
        <h2 className="mb-4">Winrate: <span className="text-info">{winPercentage}%</span></h2>

        {/* Static GIF Container */}
        <div 
          className="d-flex justify-content-center align-items-center"
          style={{ width: "300px", height: "350px", overflow: "hidden" }}
        >
          <Image 
            src={gifSrc}  
            alt="Peach GIF" 
            className="mb-3"
            style={{ width: "300px", height: "300px", objectFit: "cover" }} 
          />
        </div>

        {/* Control Buttons */}
        <div className="d-flex justify-content-center mt-4 gap-2 flex-wrap">
        <Button 
          style={{ backgroundColor: "#b78399", borderColor: "#b78399", color: "white" }} 
          onClick={() => setWins(wins + 1)}
        >
          + Win
        </Button>

        <Button 
          style={{ backgroundColor: "#b78399", borderColor: "#b78399", color: "white" }} 
          onClick={() => setLosses(losses + 1)}
        >
          + Loss
        </Button>

        <Button 
          style={{ backgroundColor: "#b78399", borderColor: "#b78399", color: "white" }} 
          onClick={() => setWins(wins > 0 ? wins - 1 : 0)}
        >
          - Win
        </Button>

        <Button 
          style={{ backgroundColor: "#b78399", borderColor: "#b78399", color: "white" }} 
          onClick={() => setLosses(losses > 0 ? losses - 1 : 0)}
        >
          - Loss
        </Button>

        <Button 
          style={{ backgroundColor: "#b78399", borderColor: "#b78399", color: "white" }} 
          onClick={() => { setWins(0); setLosses(0); }}
        >
          Reset
        </Button>

        <Button 
          style={{ backgroundColor: "#b78399", borderColor: "#b78399", color: "white" }} 
          onClick={() => setUseAltGifs(!useAltGifs)}
        >
          Change GIFs
        </Button>

        </div>
      </Card>
    </Container>
  );
}

export default App;

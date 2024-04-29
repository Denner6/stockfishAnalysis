import React from "react";
import "./assets/index.css";

function FenPgnInput() {
    return (
        <div className="analyze">
            <div className="fen pair">
                <label>FEN</label>
                <input type="text" spellCheck="false" enterKeyHint="done"/>
            </div>
            <div className="pgn pair">
                <div>
                    <label>PGN</label>
                    <textarea spellCheck="false"></textarea>
                    <button 
                        className="import-pgn-btn"
                         onClick={() => alert("teste")}>
                        Import Pgn
                    </button>
                </div>
            </div>  
        </div>
    )
}

export default FenPgnInput;

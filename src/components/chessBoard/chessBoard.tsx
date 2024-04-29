import React, { useState } from "react";
import Chessground from "../_chessGround/_chessGround";
// Board

import getAvaibleMoves, { getFen } from "@board-back-end/boardController";
import getColor from "@board-back-end/getNextColorToPlay"

// CSS

import "./assets/css/chessground.cburnett.css"
import "./assets/css/chessground.base.css";
import "./assets/css/chessground.brown.css";

// Sounds

import moveSoundMp3 from "./assets/sounds/Move.mp3";
import captureSoundMp3 from "./assets/sounds/Capture.mp3";

const DEFAULT_POSITION = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

function playBoardSounds(capturedPiece: Boolean = false) {
    const moveSound = new Audio(moveSoundMp3);
    const capturedSound = new Audio(captureSoundMp3);
    
    const playSound = (sound: HTMLAudioElement) => sound.play();

    if (capturedPiece) playSound(capturedSound);
    else playSound(moveSound);
}

function ChessBoard() {
    const [currentFen, setCurrentFen] = useState(DEFAULT_POSITION) ;

    let colorToPlay = getColor(currentFen);
    let { avaibleMoves, isCheck, enPassant } = getAvaibleMoves(currentFen); 

    return (
        <div className="App">
            <Chessground config={
              {
                fen: currentFen,
                disableContextMenu: true, 
                viewOnly: false,
                check: isCheck,
                coordinates: true,
                turnColor: colorToPlay,
                highlight: {
                    lastMove: true,
                    check: true,
                },
                movable: {
                    dests: avaibleMoves,
                    free: false,
                    color: colorToPlay,
                    rookCastle: true,
                    events: {
                        after: (origin, dest, metadata) => {
                            const fenOptions = { from: origin, to:  dest }
                            const newFen = getFen(fenOptions, currentFen);

                            setCurrentFen(newFen);

                            const enPassantCapture = (enPassant.size > 0 && (enPassant.get(origin) === dest))
                            const capturedPiece = metadata.captured || enPassantCapture ? true : false
                            playBoardSounds(capturedPiece) 
                        }
                    },
                },
                premovable: {
                    enabled: false
                }
              }
            } />
        </div>
    );
}

export default ChessBoard;




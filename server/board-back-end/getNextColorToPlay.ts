import { Chess, validateFen } from "chess.js";
import { DEFAULT_POSITION } from "chess.js";

function getColor(fen) {
    if (!validateFen(fen)) {
        return null
    }
    const chess = new Chess(fen);
    return chess.turn() === "b" ? "black" : "white";
}

export default getColor;

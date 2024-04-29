import { Chess, DEFAULT_POSITION, validateFen, WHITE, BLACK } from "chess.js";
 
const mapCastling = [
    { from: "e1", to: "h1", olderTo: "g1" },
    { from: "e1", to: "a1", olderTo: "c1" },
    { from: "e8", to: "h8", olderTo: "g8" },
    { from: "e8", to: "a8", olderTo: "c8" }
]


function _changeSideToMove(fen: string): string {
    const side = "b";
    const chess = new Chess(fen);
    const [position, _, castling] = chess.fen().split(" ");
    const fenEdited = `${position} ${side} ${castling} - 0 1`;
    return fenEdited;
}

interface _Move {
    from: string;
    to: string;
    flags: string;
}

function _getAllAvaibleMoves(fen: string): _Move[] {
    const getMoves = (fen: string) => {
        const chess = new Chess(fen);
        const moves = chess.moves({ verbose: true });

        return moves;
    };
    const blackSideFen = _changeSideToMove(fen)
    const whiteMoves = getMoves(fen);
    const blackMoves = getMoves(blackSideFen);
    const allMoves = [...whiteMoves, ...blackMoves];

    return allMoves; 
}


const _arrayToMap = (moves: _Move[]): Array<Map<string, string[]>> => {
    const avaibleMoves = new Map();
    const enPassant = new Map<string, string>();

    for(const move of moves) {
        const square = avaibleMoves.get(move.from) || [];
        square.push(move.to);
        avaibleMoves.set(move.from, square);

        if (move.flags === "e") {
            enPassant.set(move.from, move.to);
        }
    }
    return [avaibleMoves, enPassant];
};

const allowRookCastle = (fen: string, avaibleMoves: Map<string, string[]>) => {
    for (const move of mapCastling) {
        const moveExists = avaibleMoves.has(move.from);
        const avaibleMovesArray = avaibleMoves.get(move.from);

        const moveIncludes =  avaibleMovesArray?.includes(move.olderTo); 
        
        if (moveExists && moveIncludes && avaibleMovesArray) {
            avaibleMovesArray.push(move.to);
            avaibleMoves.set(move.from, avaibleMovesArray);
        }
    }
};

function getAvaibleMoves(fen: string = DEFAULT_POSITION): Object {
    if (!validateFen(fen)) {
        throw new TypeError("Invalid fen");
    }
    const chess = new Chess(fen);
         
    const avaibleMovesArray = _getAllAvaibleMoves(fen);
    const [avaibleMovesMap, enPassant] = _arrayToMap(avaibleMovesArray);

    allowRookCastle(fen, avaibleMovesMap);

    return {
        avaibleMoves: avaibleMovesMap,
        isCheck: chess.isCheck(),
        enPassant
    };
}

interface _FenOptions {
    from: string,
    to: string
}

const _convertRookCastle = (options: _FenOptions, chess: Chess) => {
    const whiteKingPosition = chess.get("e1");
    const blackKingPosition = chess.get("e8");

    for (const castlingMove of mapCastling) {
         if ((whiteKingPosition || blackKingPosition) && (options.from === castlingMove.from) && (castlingMove.to.includes(options.to))) {
            options.to = castlingMove.olderTo 
        }
    }
    return options;
};

function getFen(options: _FenOptions, fen: string = DEFAULT_POSITION) {
    const chess = new Chess(fen);
    
    options = _convertRookCastle(options, chess)

    const move = chess.move(options);
 
    fen = chess.fen();
    return fen      
}

export { getAvaibleMoves as default, getFen };



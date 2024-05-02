import { Chess } from "chess.js";

import BookMoves from "./routes/bookMoves";
import Engine from "./routes/stockfishWorker";



const pgn: string = `
[Event "Live Chess"]
[Site "Chess.com"]
[Date "2024.04.17"]
[Round "?"]
[White "OjhaRohith"]
[Black "Deku164"]
[Result "1/2-1/2"]
[ECO "C21"]
[WhiteElo "750"]
[BlackElo "766"]
[TimeControl "600"]
[EndTime "10:34:33 PDT"]
[Termination "Game drawn by agreement"]

1. e4 e5 2. d4 exd4 3. c3 Nc6 4. Nf3 Nf6 5. e5 Nxe5 6. Nxe5 Qe7 7. cxd4 d6 8.
Qa4+ Bd7 9. Qb3 dxe5 10. dxe5 Qxe5+ 11. Be3 O-O-O 12. Bc4 Be6 13. O-O Ng4 14. g3
Nxe3 15. Qxe3 Qxb2 16. Bxe6+ fxe6 17. Nc3 Qb6 18. Qc1 Be7 19. Na4 Qa6 20. Qc2
Bf6 21. Rab1 Rd4 22. Nc5 Qc6 23. Rfc1 b6 24. Na6 Qxc2 25. Rxc2 Kb7 26. Nxc7 Rc8
27. Rbc1 Be5 28. Nxe6 Rxc2 29. Rxc2 Rd6 30. Ng5 h6 31. Nf3 Bf6 32. Kg2 a5 33. h4
g5 34. h5 Ka6 35. g4 b5 36. Nd2 a4 37. Ne4 Re6 38. f3 Re5 39. Rc6+ Ka5 40. Rxf6
b4 41. Rxh6 b3 42. axb3 axb3 43. Rc6 Ka4 44. h6 b2 45. Nc3+ Kb3 46. h7 Re8 47.
Kg3 Rh8 48. Rc7 1/2-1/2
`



function getFenHistory(): string[] {
    const chess1 = new Chess();
    const chess2 = new Chess();
    chess1.loadPgn(pgn);

    const chessHistory = chess1.history();
    const fens = chessHistory.map((move: string) => {
        chess2.move(move)
        return chess2.fen();
    })
   
    return fens;
}

const isNull = (value: any): Boolean => value === null;

function removeBookMovesFromMovesArray(fens: string[], bookMoves: string[]): string[] {
    const newFensWithoutBookMoves = fens
        .map((fen, index) => {
            if (!(fen === bookMoves[index])) {
                return fen;
            }
            return ""
        })
        .filter((value) => !(value === ""))
    return newFensWithoutBookMoves
}

async function main() {
    console.time()
    try {
        const fens = getFenHistory();
        const bookMovesObjects = BookMoves.getBookMoves(fens);
        const bookMovesFenArray = bookMovesObjects.map((bookMoveObject) => bookMoveObject.fen) 
        const stockfishFens = removeBookMovesFromMovesArray(fens, bookMovesFenArray)

        const stockfish = await Engine.getBestMoves(stockfishFens)
        console.log(bookMovesFenArray)
        console.log(fens) 
        console.log(stockfish.length) 
        console.timeEnd()
    } catch(e) {
        console.error(e)
    }
}

main();


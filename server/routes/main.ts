import { Chess } from "chess.js";
import { Worker } from "worker_threads";
import { isNull } from "util";

import BookMoves from "./bookMoves";
import Engine from "./stockfishWorker";



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



function sendMessageToWorker(data: string[], worker: Worker): Promise<any> {
    return new Promise((resolve, reject) => {
        worker.on("message", bestsMoves => {
            resolve(bestsMoves)
        });

        worker.on("error", error => {
            reject(error);
        });
        worker.postMessage(data);
    });
}

const getFenHalf = (fens: string[]): Array<string[]> => {
    const tamanhoSubarray = Math.ceil(fens.length / 3);

    const fensHalf1 = fens.slice(0, tamanhoSubarray);
    const fensHalf2 = fens.slice(tamanhoSubarray, tamanhoSubarray * 2);
    const fensHalf3 = fens.slice(tamanhoSubarray * 2);
    return [fensHalf1, fensHalf2, fensHalf3]
}

function getFenHistory(): string[] {
    const chess1 = new Chess();
    const chess2 = new Chess();
    chess1.loadPgn(pgn);

    const chessHistory = chess1.history();
    const fens = chessHistory.map((move) => {
        chess2.move(move)
        return chess2.fen();
    })
   
    return fens;
}

function removeBookMovesFromMovesArray(fens: string[], bookMoves: string[]) {
    const newFensWithoutBookMoves = fens
        .map((fen, index) => {
            if (!(fen === bookMoves[index])) {
                return fen;
            }
            return null
        })
        .filter((value) => !isNull(value))
    return newFensWithoutBookMoves
}

async function main() {
    console.time()
    const fens = getFenHistory();
    const bookMovesObjects = await BookMoves.getBookMoves(fens);
    const bookMovesFenArray = bookMovesObjects.map((bookMoveObject) => bookMoveObject.fen) 
    const stockfishFens = removeBookMovesFromMovesArray(fens, bookMovesFenArray)
    
    const stockfish = await Engine.getBestMoves(stockfishFens)

    console.log(stockfish) 
    console.log(stockfish.length) 
    console.timeEnd()
    //console.time()
    /*
    const [fensHalf1, fensHalf2, fensHalf3] = getFenHalf(stockfishFens)
    const stockfishWorker1: Worker = new Worker("./stockfishWorker.js");
    const stockfishWorker2: Worker = new Worker("./stockfishWorker.js");
    const stockfishWorker3: Worker = new Worker("./stockfishWorker.js");

    try {
        const [result1, result2, result3] = await Promise.all([
            sendMessageToWorker(fensHalf1, stockfishWorker1),
            sendMessageToWorker(fensHalf2, stockfishWorker2),
            sendMessageToWorker(fensHalf3, stockfishWorker3)
        ]);
        
        const bestsMoves = [...result1, ...result2, ...result3];

        console.log(bestsMoves, bestsMoves.length);
    } catch(error) {
        console.error(error);
    } finally {
        stockfishWorker1.terminate();
        stockfishWorker2.terminate();
    }
    console.timeEnd();*/
}

main();


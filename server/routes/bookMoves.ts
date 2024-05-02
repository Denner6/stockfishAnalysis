import * as bookMovesJson from "./bookMoves.json";


interface BookMove {
    name: string,
    fen: string,
    //src: string,
    //eco: string,
    //moves: string,
    //scid: string,
    //aliases: Object
}

const fens = [
  'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2',
  'rnbqkbnr/pppp1ppp/8/4p3/3PP3/8/PPP2PPP/RNBQKBNR b KQkq - 0 2',
  'rnbqkbnr/pppp1ppp/8/8/3pP3/8/PPP2PPP/RNBQKBNR w KQkq - 0 3',
  'rnbqkbnr/pppp1ppp/8/8/3pP3/2P5/PP3PPP/RNBQKBNR b KQkq - 0 3',
  'r1bqkbnr/pppp1ppp/2n5/8/3pP3/2P5/PP3PPP/RNBQKBNR w KQkq - 1 4',
  'r1bqkbnr/pppp1ppp/2n5/8/3pP3/2P2N2/PP3PPP/RNBQKB1R b KQkq - 2 4',
  'r1bqkb1r/pppp1ppp/2n2n2/8/3pP3/2P2N2/PP3PPP/RNBQKB1R w KQkq - 3 5',
  'r1bqkb1r/pppp1ppp/2n2n2/4P3/3p4/2P2N2/PP3PPP/RNBQKB1R b KQkq - 0 5',
  'r1bqkb1r/pppp1ppp/5n2/4n3/3p4/2P2N2/PP3PPP/RNBQKB1R w KQkq - 0 6',
  'r1bqkb1r/pppp1ppp/5n2/4N3/3p4/2P5/PP3PPP/RNBQKB1R b KQkq - 0 6',
  'r1b1kb1r/ppppqppp/5n2/4N3/3p4/2P5/PP3PPP/RNBQKB1R w KQkq - 1 7',
  'r1b1kb1r/ppppqppp/5n2/4N3/3P4/8/PP3PPP/RNBQKB1R b KQkq - 0 7',
  'r1b1kb1r/ppp1qppp/3p1n2/4N3/3P4/8/PP3PPP/RNBQKB1R w KQkq - 0 8',
  'r1b1kb1r/ppp1qppp/3p1n2/4N3/Q2P4/8/PP3PPP/RNB1KB1R b KQkq - 1 8',
  'r3kb1r/pppbqppp/3p1n2/4N3/Q2P4/8/PP3PPP/RNB1KB1R w KQkq - 2 9',
  'r3kb1r/pppbqppp/3p1n2/4N3/3P4/1Q6/PP3PPP/RNB1KB1R b KQkq - 3 9',
  'r3kb1r/pppbqppp/5n2/4p3/3P4/1Q6/PP3PPP/RNB1KB1R w KQkq - 0 10',
  'r3kb1r/pppbqppp/5n2/4P3/8/1Q6/PP3PPP/RNB1KB1R b KQkq - 0 10',
  'r3kb1r/pppb1ppp/5n2/4q3/8/1Q6/PP3PPP/RNB1KB1R w KQkq - 0 11',
  'r3kb1r/pppb1ppp/5n2/4q3/8/1Q2B3/PP3PPP/RN2KB1R b KQkq - 1 11',
  '2kr1b1r/pppb1ppp/5n2/4q3/8/1Q2B3/PP3PPP/RN2KB1R w KQ - 2 12',
  '2kr1b1r/pppb1ppp/5n2/4q3/2B5/1Q2B3/PP3PPP/RN2K2R b KQ - 3 12',
  '2kr1b1r/ppp2ppp/4bn2/4q3/2B5/1Q2B3/PP3PPP/RN2K2R w KQ - 4 13',
  '2kr1b1r/ppp2ppp/4bn2/4q3/2B5/1Q2B3/PP3PPP/RN3RK1 b - - 5 13',
  '2kr1b1r/ppp2ppp/4b3/4q3/2B3n1/1Q2B3/PP3PPP/RN3RK1 w - - 6 14',
  '2kr1b1r/ppp2ppp/4b3/4q3/2B3n1/1Q2B1P1/PP3P1P/RN3RK1 b - - 0 14',
  '2kr1b1r/ppp2ppp/4b3/4q3/2B5/1Q2n1P1/PP3P1P/RN3RK1 w - - 0 15',
  '2kr1b1r/ppp2ppp/4b3/4q3/2B5/4Q1P1/PP3P1P/RN3RK1 b - - 0 15',
  '2kr1b1r/ppp2ppp/4b3/8/2B5/4Q1P1/Pq3P1P/RN3RK1 w - - 0 16',
  '2kr1b1r/ppp2ppp/4B3/8/8/4Q1P1/Pq3P1P/RN3RK1 b - - 0 16',
  '2kr1b1r/ppp3pp/4p3/8/8/4Q1P1/Pq3P1P/RN3RK1 w - - 0 17',
  '2kr1b1r/ppp3pp/4p3/8/8/2N1Q1P1/Pq3P1P/R4RK1 b - - 1 17',
  '2kr1b1r/ppp3pp/1q2p3/8/8/2N1Q1P1/P4P1P/R4RK1 w - - 2 18',
  '2kr1b1r/ppp3pp/1q2p3/8/8/2N3P1/P4P1P/R1Q2RK1 b - - 3 18',
  '2kr3r/ppp1b1pp/1q2p3/8/8/2N3P1/P4P1P/R1Q2RK1 w - - 4 19',
  '2kr3r/ppp1b1pp/1q2p3/8/N7/6P1/P4P1P/R1Q2RK1 b - - 5 19',
  '2kr3r/ppp1b1pp/q3p3/8/N7/6P1/P4P1P/R1Q2RK1 w - - 6 20',
  '2kr3r/ppp1b1pp/q3p3/8/N7/6P1/P1Q2P1P/R4RK1 b - - 7 20',
  '2kr3r/ppp3pp/q3pb2/8/N7/6P1/P1Q2P1P/R4RK1 w - - 8 21',
  '2kr3r/ppp3pp/q3pb2/8/N7/6P1/P1Q2P1P/1R3RK1 b - - 9 21',
  '2k4r/ppp3pp/q3pb2/8/N2r4/6P1/P1Q2P1P/1R3RK1 w - - 10 22',
  '2k4r/ppp3pp/q3pb2/2N5/3r4/6P1/P1Q2P1P/1R3RK1 b - - 11 22',
  '2k4r/ppp3pp/2q1pb2/2N5/3r4/6P1/P1Q2P1P/1R3RK1 w - - 12 23',
  '2k4r/ppp3pp/2q1pb2/2N5/3r4/6P1/P1Q2P1P/1RR3K1 b - - 13 23',
  '2k4r/p1p3pp/1pq1pb2/2N5/3r4/6P1/P1Q2P1P/1RR3K1 w - - 0 24',
  '2k4r/p1p3pp/Npq1pb2/8/3r4/6P1/P1Q2P1P/1RR3K1 b - - 1 24'
]


function removeMoveCountFromFen(fen: string): string {
    let fenSplit = fen.split(" ");
    fenSplit = fenSplit.slice(0, -2)
    return fenSplit.join(" ")
}

class BookMoves {
    private static getBookMove(fen: string): BookMove | null {
        fen = removeMoveCountFromFen(fen);
        for (const bookMoveObject of bookMovesJson) {
            const fenWithoutCount = removeMoveCountFromFen(bookMoveObject.fen)
            if (fenWithoutCount === fen) {
                return {
                    name: bookMoveObject.name,
                    fen: bookMoveObject.fen
                }
            } 
        }
        return null;
    }

    static getBookMoves(fens: string[]) {
        const bookMoves: BookMove[] = [];
        for (const fen of fens) {
            const bookMoveObject = this.getBookMove(fen);
            if (bookMoveObject) bookMoves.push(bookMoveObject);
        }
        return bookMoves;
    }
}


export default BookMoves;


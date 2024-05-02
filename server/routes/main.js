"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var chess_js_1 = require("chess.js");
var util_1 = require("util");
var bookMoves_1 = require("./bookMoves");
var stockfishWorker_1 = require("./stockfishWorker");
var pgn = "\n[Event \"Live Chess\"]\n[Site \"Chess.com\"]\n[Date \"2024.04.17\"]\n[Round \"?\"]\n[White \"OjhaRohith\"]\n[Black \"Deku164\"]\n[Result \"1/2-1/2\"]\n[ECO \"C21\"]\n[WhiteElo \"750\"]\n[BlackElo \"766\"]\n[TimeControl \"600\"]\n[EndTime \"10:34:33 PDT\"]\n[Termination \"Game drawn by agreement\"]\n\n1. e4 e5 2. d4 exd4 3. c3 Nc6 4. Nf3 Nf6 5. e5 Nxe5 6. Nxe5 Qe7 7. cxd4 d6 8.\nQa4+ Bd7 9. Qb3 dxe5 10. dxe5 Qxe5+ 11. Be3 O-O-O 12. Bc4 Be6 13. O-O Ng4 14. g3\nNxe3 15. Qxe3 Qxb2 16. Bxe6+ fxe6 17. Nc3 Qb6 18. Qc1 Be7 19. Na4 Qa6 20. Qc2\nBf6 21. Rab1 Rd4 22. Nc5 Qc6 23. Rfc1 b6 24. Na6 Qxc2 25. Rxc2 Kb7 26. Nxc7 Rc8\n27. Rbc1 Be5 28. Nxe6 Rxc2 29. Rxc2 Rd6 30. Ng5 h6 31. Nf3 Bf6 32. Kg2 a5 33. h4\ng5 34. h5 Ka6 35. g4 b5 36. Nd2 a4 37. Ne4 Re6 38. f3 Re5 39. Rc6+ Ka5 40. Rxf6\nb4 41. Rxh6 b3 42. axb3 axb3 43. Rc6 Ka4 44. h6 b2 45. Nc3+ Kb3 46. h7 Re8 47.\nKg3 Rh8 48. Rc7 1/2-1/2\n";
function getFenHistory() {
    var chess1 = new chess_js_1.Chess();
    var chess2 = new chess_js_1.Chess();
    chess1.loadPgn(pgn);
    var chessHistory = chess1.history();
    var fens = chessHistory.map(function (move) {
        chess2.move(move);
        return chess2.fen();
    });
    return fens;
}
function removeBookMovesFromMovesArray(fens, bookMoves) {
    var newFensWithoutBookMoves = fens
        .map(function (fen, index) {
        if (!(fen === bookMoves[index])) {
            return fen;
        }
        return null;
    })
        .filter(function (value) { return !(0, util_1.isNull)(value); });
    return newFensWithoutBookMoves;
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var fens, bookMovesObjects, bookMovesFenArray, stockfishFens, stockfish, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.time();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    fens = getFenHistory();
                    return [4 /*yield*/, bookMoves_1.default.getBookMoves(fens)];
                case 2:
                    bookMovesObjects = _a.sent();
                    bookMovesFenArray = bookMovesObjects.map(function (bookMoveObject) { return bookMoveObject.fen; });
                    stockfishFens = removeBookMovesFromMovesArray(fens, bookMovesFenArray);
                    return [4 /*yield*/, stockfishWorker_1.default.getBestMoves(stockfishFens)];
                case 3:
                    stockfish = _a.sent();
                    console.log(fens);
                    console.log(stockfish.length);
                    console.timeEnd();
                    return [3 /*break*/, 5];
                case 4:
                    e_1 = _a.sent();
                    console.error(e_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
main();

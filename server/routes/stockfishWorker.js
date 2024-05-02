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
var node_uci_1 = require("node-uci");
var chess_js_1 = require("chess.js");
var Engine = /** @class */ (function () {
    function Engine() {
    }
    Engine.setupEngine = function () {
        return __awaiter(this, void 0, void 0, function () {
            var engine, _i, _a, _b, option, value;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        engine = new node_uci_1.Engine("./stockfish/stockfish-exec");
                        engine.init();
                        _i = 0, _a = Object.entries(this.engineOptions);
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        _b = _a[_i], option = _b[0], value = _b[1];
                        return [4 /*yield*/, engine.setoption(option, value)];
                    case 2:
                        _c.sent();
                        _c.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [4 /*yield*/, engine.isready()];
                    case 5:
                        _c.sent();
                        return [2 /*return*/, engine];
                }
            });
        });
    };
    Engine.convertBestMoveToFenString = function (move, fen) {
        var chess = new chess_js_1.Chess(fen);
        chess.move(move);
        return chess.fen();
    };
    Engine.getBestMoves = function (fenArray) {
        return __awaiter(this, void 0, void 0, function () {
            var bestsMoves, engine, _i, fenArray_1, fen, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        bestsMoves = [];
                        return [4 /*yield*/, this.setupEngine()];
                    case 1:
                        engine = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 8, 9, 11]);
                        _i = 0, fenArray_1 = fenArray;
                        _a.label = 3;
                    case 3:
                        if (!(_i < fenArray_1.length)) return [3 /*break*/, 7];
                        fen = fenArray_1[_i];
                        return [4 /*yield*/, engine.position(fen)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, engine.go({ depth: 15 })];
                    case 5:
                        result = _a.sent();
                        bestsMoves.push({
                            bestMove: result.bestmove,
                            fen: this.convertBestMoveToFenString(result.bestmove, fen)
                        });
                        _a.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 3];
                    case 7: return [3 /*break*/, 11];
                    case 8:
                        error_1 = _a.sent();
                        throw error_1;
                    case 9: return [4 /*yield*/, engine.quit()];
                    case 10:
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 11: return [2 /*return*/, bestsMoves];
                }
            });
        });
    };
    Engine.engineOptions = {
        MultiPv: "1",
        Threads: "2",
        Hash: "15"
    };
    return Engine;
}());
var fens = [
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
];
//Engine.getBestMoves(fens)
//  .then(data => console.log(data));
exports.default = Engine;

import movesJson from "../../gameMoves.json";
import bookMovesFenArrayJson from "./bookMoves.json";
import BookMoves from "@routes/bookMoves";

import test from "node:test";
import { strict as assert } from 'node:assert';

test("Book Moves", () => {
    const bookMovesObject = BookMoves.getBookMoves(movesJson);
    const bookMovesFenArray = bookMovesObject.map((bookMoveObject) => bookMoveObject.fen); 
    assert.equal(JSON.stringify(bookMovesFenArray), JSON.stringify(bookMovesFenArrayJson))
});
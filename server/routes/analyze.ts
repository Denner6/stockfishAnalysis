import express, { Request, Response } from 'express'

const router = express.Router();

router.get("/analyze", (request: Request, response: Response) => {
    //if (!allowOnlyFromHost(request)) {
      //  response.status(403)
})

export default router;

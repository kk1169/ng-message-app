import { Request, Response } from "express";

class TestController {
  public index(req: Request, res: Response) {
    return res.status(200).json({ status: true });
  }

  public test(req: Request, res: Response) {
    return res.status(200).json({ test: true, working: true });
  }
}

export default new TestController();

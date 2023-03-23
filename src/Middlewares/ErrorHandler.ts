import { NextFunction, Request, Response } from 'express';

class ErrorHandler {
  public static handle(
    error: Error,
    _req: Request,
    res: Response,
    next: NextFunction,
  ) {
    switch (error.message) {
      case 'Car not found':
        res.status(404).json({ message: error.message });
        break;
      case 'Invalid mongo id':
        res.status(422).json({ message: error.message });
        break;
      default:
        res.status(500).json({ message: error.message });
    }
    next();
  }
}

export default ErrorHandler;
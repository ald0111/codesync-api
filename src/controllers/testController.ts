import { Request, Response } from 'express';
export function testEndpoint(req: Request, res: Response) {
  res.json({ message: 'API with TypeScript is working!' });
}

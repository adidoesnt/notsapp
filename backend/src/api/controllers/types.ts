import type { AuthenticatedRequest } from "api/middleware";
import type { NextFunction, Request, Response } from 'express';

export type ControllerProps = {
    request: Request | AuthenticatedRequest;
    response: Response;
    next: NextFunction;
};
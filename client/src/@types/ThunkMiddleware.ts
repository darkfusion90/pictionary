import { ThunkDispatch, Middleware, Action } from "@reduxjs/toolkit";

export type ThunkMiddleware = Middleware<any, any, ThunkDispatch<any, any, Action>>
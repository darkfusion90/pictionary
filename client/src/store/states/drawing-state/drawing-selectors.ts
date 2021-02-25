import { Selector } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import DrawingState from "./DrawingState";

export const selectDrawingState: Selector<RootState, DrawingState> = (state) => state.drawingState
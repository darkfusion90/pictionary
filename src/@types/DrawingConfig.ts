import IPosition from "./Position";

interface DrawingConfig {
    mousePos: IPosition
    prevMousePos: IPosition
    lineWidth: number
    strokeStyle: string
    tool: 'brush' | 'eraser'
    isDrawing: boolean
}

export default DrawingConfig
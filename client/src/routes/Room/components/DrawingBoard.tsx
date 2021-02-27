import React from 'react'

import DrawingConfig from '../../../@types/DrawingConfig'
import IPosition from '../../../@types/Position'

interface IGestureHandlers {
    onMouseUp?: React.MouseEventHandler
    onMouseDown?: React.MouseEventHandler
    onMouseMove?: React.MouseEventHandler

    onTouchStart?: React.TouchEventHandler
    onTouchMove?: React.TouchEventHandler
    onTouchEnd?: React.TouchEventHandler
}

export interface IDrawingBoardProps extends BasicProps {
    shouldDisableCanvas?: boolean
    drawConfig: DrawingConfig
    updateDrawConfig: ValueCallback<DrawingConfig>
}

class DrawingBoard extends React.PureComponent<IDrawingBoardProps> {
    canvas: React.RefObject<HTMLCanvasElement>

    constructor(props: IDrawingBoardProps) {
        super(props)
        this.canvas = React.createRef<HTMLCanvasElement>()
    }

    componentDidMount() {
        this.draw()
    }

    componentDidUpdate() {
        this.draw()
    }

    getCanvasContext = (): CanvasRenderingContext2D | null => {
        if (this.canvas.current) {
            return this.canvas.current.getContext('2d')
        }

        return null
    }

    handleTouchStart: React.TouchEventHandler = () => {
        this.props.updateDrawConfig({
            ...this.props.drawConfig,
            isDrawing: true,
        })
    }

    handleTouchMove: React.TouchEventHandler = (ev) => {
        const touchPos = ev.touches[0]
        this.updateMousePosition({
            x: touchPos.clientX,
            y: touchPos.clientY
        })
    }

    handleMouseMove: React.MouseEventHandler = (ev) => {
        this.updateMousePosition({
            x: ev.clientX,
            y: ev.clientY
        })
    }

    handleMouseDown: React.MouseEventHandler = (ev) => {
        const evMousePos = this.getMousePosRelativeToCanvas({
            x: ev.clientX,
            y: ev.clientY
        })

        this.props.updateDrawConfig({
            ...this.props.drawConfig,
            isDrawing: true,
            mousePos: evMousePos,
            prevMousePos: evMousePos
        })
    }

    getMousePosRelativeToCanvas = (originalPosition: IPosition): IPosition => {
        const canvas = this.canvas.current
        if (!canvas) return { x: -1, y: -1 }

        const canvasRect = canvas.getBoundingClientRect();
        var x = originalPosition.x - canvasRect.left
        var y = originalPosition.y - canvasRect.top

        x /= canvasRect.width
        y /= canvasRect.height

        x *= canvas.width
        y *= canvas.height

        return { x, y }
    }

    updateMousePosition = (eventPosition: IPosition) => {
        const { updateDrawConfig, drawConfig } = this.props

        const mousePos = this.getMousePosRelativeToCanvas(eventPosition)

        updateDrawConfig({
            ...drawConfig,
            mousePos,
            prevMousePos: drawConfig.mousePos
        })
    }

    draw = () => {
        const { drawConfig } = this.props

        if (!drawConfig.isDrawing) {
            return
        }

        const canvasContext = this.getCanvasContext()
        if (!canvasContext) {
            return
        }

        canvasContext.beginPath()
        if (drawConfig.tool === 'brush') {
            canvasContext.globalCompositeOperation = 'source-over';
            canvasContext.strokeStyle = 'black'
            canvasContext.lineWidth = drawConfig.lineWidth
        } else {
            canvasContext.globalCompositeOperation = 'destination-out';
            canvasContext.lineWidth = 10
        }

        const { prevMousePos: lineFrom, mousePos: lineTo } = drawConfig
        canvasContext.moveTo(lineFrom.x, lineFrom.y)
        canvasContext.lineTo(lineTo.x, lineTo.y)

        canvasContext.lineJoin = canvasContext.lineCap = 'round'
        canvasContext.stroke()
    }

    stopDrawing = () => {
        this.props.updateDrawConfig({
            ...this.props.drawConfig,
            isDrawing: false
        })
    }

    render() {
        const gestureHandlers: IGestureHandlers = {}

        // When disabled, our canvas will be "read-only" since we are not intercepting mouse events
        if (!this.props.shouldDisableCanvas) {
            gestureHandlers.onMouseDown = this.handleMouseDown
            gestureHandlers.onMouseUp = this.stopDrawing
            gestureHandlers.onMouseMove = this.handleMouseMove

            gestureHandlers.onTouchMove = this.handleTouchMove
            gestureHandlers.onTouchStart = this.handleTouchStart
            gestureHandlers.onTouchEnd = this.stopDrawing
        }

        return (
            <canvas
                ref={this.canvas}
                className={this.props.className}
                {...gestureHandlers}
            />
        )
    }
}

export default DrawingBoard

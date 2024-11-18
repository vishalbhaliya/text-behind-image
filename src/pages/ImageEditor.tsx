"use client"

import { useRef, useState } from "react"
import { Eraser, Redo, Undo } from 'lucide-react'
import { Button } from "../components/ui/button"
import { Slider } from "../components/ui/slider"
import { Card } from "../components/ui/card"

export default function Component() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
//   const imageRef = useRef<HTMLImageElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [brushSize, setBrushSize] = useState(20)
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [history, setHistory] = useState<ImageData[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const img = new Image()
        img.onload = () => {
          const canvas = canvasRef.current
          if (canvas) {
            canvas.width = img.width
            canvas.height = img.height
            const ctx = canvas.getContext("2d")
            ctx?.drawImage(img, 0, 0)
            // Save initial state
            const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height)
            if (imageData) {
              setHistory([imageData])
              setHistoryIndex(0)
            }
          }
        }
        img.src = event.target?.result as string
        setOriginalImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (ctx) {
      ctx.beginPath()
      const rect = canvas?.getBoundingClientRect()
      const x = e.clientX - (rect?.left ?? 0)
      const y = e.clientY - (rect?.top ?? 0)
      ctx.moveTo(x, y)
      ctx.lineWidth = brushSize
      ctx.lineCap = "round"
      ctx.strokeStyle = "rgba(255, 255, 255, 0.5)"
    }
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (ctx) {
      const rect = canvas?.getBoundingClientRect()
      const x = e.clientX - (rect?.left ?? 0)
      const y = e.clientY - (rect?.top ?? 0)
      ctx.lineTo(x, y)
      ctx.stroke()
    }
  }

  const stopDrawing = () => {
    setIsDrawing(false)
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (ctx) {
      ctx.closePath()
      // Save state after drawing
      const imageData = ctx.getImageData(0, 0, canvas?.width ?? 0, canvas?.height ?? 0)
      setHistory((prev) => [...prev.slice(0, historyIndex + 1), imageData])
      setHistoryIndex((prev) => prev + 1)
    }
  }

  const undo = () => {
    if (historyIndex > 0) {
      const canvas = canvasRef.current
      const ctx = canvas?.getContext("2d")
      if (ctx) {
        setHistoryIndex((prev) => prev - 1)
        ctx.putImageData(history[historyIndex - 1], 0, 0)
      }
    }
  }

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const canvas = canvasRef.current
      const ctx = canvas?.getContext("2d")
      if (ctx) {
        setHistoryIndex((prev) => prev + 1)
        ctx.putImageData(history[historyIndex + 1], 0, 0)
      }
    }
  }

  const removeObjects = async () => {
    // This is where you would integrate with an inpainting API
    // For demonstration, we'll just show an alert
    alert("In a production environment, this would send the mask and image to an inpainting API")
  }

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <Card className="p-4 w-full max-w-3xl">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={undo} disabled={historyIndex <= 0}>
              <Undo className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={redo} disabled={historyIndex >= history.length - 1}>
              <Redo className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Eraser className="h-4 w-4" />
            <Slider
              value={[brushSize]}
              onValueChange={(value) => setBrushSize(value[0])}
              min={5}
              max={50}
              step={1}
              className="w-32"
            />
          </div>
          <Button onClick={removeObjects} disabled={!originalImage}>
            Remove Objects
          </Button>
        </div>
        <div className="relative border rounded-lg overflow-hidden">
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            className="max-w-full h-auto cursor-crosshair"
          />
          {!originalImage && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted">
              <label className="cursor-pointer">
                <input type="file" accept="image/*" onChange={handleImageUpload} className="sr-only" />
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Click to upload an image</p>
                </div>
              </label>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
'use client'

import { useState, useRef, ChangeEvent, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Download, ImageIcon, Plus, Trash2 } from 'lucide-react'
import { removeBackground } from '@imgly/background-removal'
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TextLayer } from '@/types/TextBehindImage.interface'
import { FONTS } from '@/lib/utils'

export default function TextBehindImage() {
  const [imageUrl, setImageUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [canDownload, setCanDownload] = useState(false)
  const [textLayers, setTextLayers] = useState<TextLayer[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  }

  const handleAddTextLayer = () => {
    const newLayer: TextLayer = {
      id: Date.now().toString(),
      text: 'New text',
      fontSize: 48,
      textColor: '#ffffff',
      textX: 50,
      textY: 50,
      selectedFont: FONTS[0].style,
      fontWeight: 400,
      textRotation: 0,
    }
    setTextLayers([...textLayers, newLayer])
  }

  const handleRemoveTextLayer = (id: string) => {
    setTextLayers(textLayers.filter(layer => layer.id !== id))
  }

  const handleTextLayerChange = (id: string, changes: Partial<TextLayer>) => {
    setTextLayers(textLayers.map(layer => 
      layer.id === id ? { ...layer, ...changes } : layer
    ))
  }

  const handleDownload = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const dataUrl = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.href = dataUrl
      link.download = 'text-behind-image.png'
      link.click()
    }
  }

  const handleRemoveImage = () => {
    setImageUrl('')
    setTextLayers([])
  }

  useEffect(() => {
    if (!imageUrl) return

    const img = new Image()
    img.onload = async () => {
      const canvas = canvasRef.current
      const ctx = canvas?.getContext('2d')
      if (!canvas || !ctx) return

      setIsLoading(true)
      setCanDownload(false)

      canvas.width = img.width
      canvas.height = img.height

      ctx.drawImage(img, 0, 0)
      ctx.save()

      textLayers.forEach(layer => {
        const { text, fontSize, textColor, textX, textY, selectedFont, fontWeight, textRotation } = layer

        // Apply rotation
        const x = (textX / 100) * canvas.width
        const y = (textY / 100) * canvas.height
        ctx.save()
        ctx.translate(x, y)
        ctx.rotate((textRotation * Math.PI) / 180)
        ctx.translate(-x, -y)

        ctx.font = `${fontWeight} ${fontSize}px ${selectedFont}`
        ctx.fillStyle = textColor
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'

        ctx.fillText(text, x, y)
        ctx.restore()
      })

      try {
        const imageBlob = await removeBackground(imageUrl)
        const removedBgImageUrl = URL.createObjectURL(imageBlob)
        const removedBgImg = new Image()
        removedBgImg.crossOrigin = "anonymous"
        removedBgImg.onload = () => {
          ctx.drawImage(removedBgImg, 0, 0, canvas.width, canvas.height)
          setIsLoading(false)
          setCanDownload(true)
        }
        removedBgImg.src = removedBgImageUrl
      } catch (error) {
        console.error('Error removing background:', error)
        setIsLoading(false)
        setCanDownload(true)
      }
    }
    img.src = imageUrl
    img.crossOrigin = 'anonymous'
  }, [imageUrl, textLayers])

  return (
    <main className="flex h-screen">
      <div className="flex-1 flex flex-col p-0">
        <h1 className="text-2xl font-bold mb-2">Text Behind Image</h1>
        <h4 className="text-sm text-gray-500 mb-4">
          Upload an image and add text layers to create a text-behind-image effect.
        </h4>
        <div className="flex-1 relative rounded-lg overflow-hidden bg-white shadow-lg">
          {imageUrl ? (
            <>
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full object-contain"
              />
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <Loader2 className="w-8 h-8 text-white animate-spin" />
                </div>
              )}
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <ImageIcon className="w-16 h-16 text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">No image uploaded</p>
              <Input
              id="image-upload"
              type="file"
              accept="image/jpg, image/jpeg, image/png"
              onChange={handleImageUpload}
              className="hidden" />
              <Button
                onClick={() => document.getElementById('image-upload')?.click()}
                className="mt-4"
              >
                Choose Image
              </Button>
            </div>
          )}
        </div>
        <div className="mt-4 flex gap-4">
          {imageUrl &&
            <>
            <Button
              onClick={() => handleRemoveImage()}
              className="flex-1"
          >
            Remove Image
          </Button>
          
            <Button
              onClick={handleDownload}
              disabled={!canDownload}
              className="flex-1"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Image
              </Button>
            </>
          }
        </div>
      </div>
      
      {imageUrl && (
        <div className="w-96 bg-white mt-16 p-6 overflow-hidden flex flex-col">
            <Button onClick={handleAddTextLayer} className="w-full mb-4">
              <Plus className="w-4 h-4 mr-2" />
              Add Text Layer
            </Button>
          <ScrollArea className="flex-1 -mr-4 pr-4">
            <Accordion type="single" collapsible className="w-full">
              {textLayers.map((layer, index) => (
                <AccordionItem value={layer.id} key={layer.id}>
                  <AccordionTrigger>Text Layer {index + 1}</AccordionTrigger>
                  <AccordionContent>
                    <Card>
                      <CardContent className="pt-6 space-y-4">
                        <div>
                          <Label htmlFor={`text-input-${layer.id}`}>Text</Label>
                          <Input
                            id={`text-input-${layer.id}`}
                            type="text"
                            value={layer.text}
                            onChange={(e) => handleTextLayerChange(layer.id, { text: e.target.value })}
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <Label htmlFor={`font-size-${layer.id}`}>Font Size</Label>
                          <Slider
                            id={`font-size-${layer.id}`}
                            min={12}
                            max={200}
                            step={1}
                            value={[layer.fontSize]}
                            onValueChange={(value) => handleTextLayerChange(layer.id, { fontSize: value[0] })}
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <Label htmlFor={`text-color-${layer.id}`}>Text Color</Label>
                          <Input
                            id={`text-color-${layer.id}`}
                            type="color"
                            value={layer.textColor}
                            onChange={(e) => handleTextLayerChange(layer.id, { textColor: e.target.value })}
                            className="mt-1 h-10 w-full"
                          />
                        </div>

                        <div>
                          <Label htmlFor={`text-x-${layer.id}`}>Horizontal Position</Label>
                          <Slider
                            id={`text-x-${layer.id}`}
                            min={0}
                            max={100}
                            step={1}
                            value={[layer.textX]}
                            onValueChange={(value) => handleTextLayerChange(layer.id, { textX: value[0] })}
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <Label htmlFor={`text-y-${layer.id}`}>Vertical Position</Label>
                          <Slider
                            id={`text-y-${layer.id}`}
                            min={0}
                            max={100}
                            step={1}
                            value={[layer.textY]}
                            onValueChange={(value) => handleTextLayerChange(layer.id, { textY: value[0] })}
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <Label htmlFor={`text-rotation-${layer.id}`}>Text Rotation</Label>
                          <Slider
                            id={`text-rotation-${layer.id}`}
                            min={0}
                            max={360}
                            step={1}
                            value={[layer.textRotation]}
                            onValueChange={(value) => handleTextLayerChange(layer.id, { textRotation: value[0] })}
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <Label htmlFor={`font-select-${layer.id}`}>Font</Label>
                          <Select 
                            onValueChange={(value) => handleTextLayerChange(layer.id, { selectedFont: value })} 
                            value={layer.selectedFont}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a font" />
                            </SelectTrigger>
                            <SelectContent>
                              {FONTS.map((font) => (
                                <SelectItem key={font.name} value={font.style}>
                                  <span style={{ fontFamily: font.style }}>{font.name}</span>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor={`font-weight-${layer.id}`}>Font Weight</Label>
                          <Slider
                            id={`font-weight-${layer.id}`}
                            min={100}
                            max={900}
                            step={100}
                            value={[layer.fontWeight]}
                            onValueChange={(value) => handleTextLayerChange(layer.id, { fontWeight: value[0] })}
                            className="mt-1"
                          />
                        </div>

                        <Button 
                          variant="destructive" 
                          onClick={() => handleRemoveTextLayer(layer.id)}
                          className="w-full"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Remove Layer
                        </Button>
                      </CardContent>
                    </Card>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollArea>
        </div>
      )}
    </main>
  )
}

export const renderPredictions = (predictions, cxt) => {
    cxt.clearRect(0, 0, cxt.canvas.width, cxt.canvas.height)

    // Fonts
    const font = "16px sans-sarif"
    cxt.font = font
    cxt.textBaseLine = "top"
    predictions.forEach((prediction) => {
        const [x, y, width, height] = prediction['bbox']
        const isPerson = prediction.class === "person"

        // Bounding box 
        cxt.strokeStyle = isPerson? "#ff0000": "#00ffff"
        cxt.lineWidth = 4
        cxt.strokeRect(x, y, width, height)

        // Fill Color
        cxt.fillStyle = `rgba(255, 0, 0, ${isPerson? 0.2: 0})`
        cxt.fillRect(x, y, width, height)

        // Draw the label background
        cxt.fillStyle = isPerson ? "ff0000": "00ffff"
        const textWidth = cxt.measureText(prediction.class).width
        const textHeight = parseInt(font, 10) // base 10
        cxt.fillRect(x, y, textWidth + 4, textHeight + 4)
        cxt.fillStyle = "#000000"
        cxt.fillText(prediction.class, x, y)
    });
}
"use client"

import React, { useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import { load as cocoSSDLoad } from '@tensorflow-models/coco-ssd'
import * as tf from '@tensorflow/tfjs'
import { renderPredictions } from '../utils/render-predictions'


let detectInterval
const ObjectDetection = () => {
    const [isLoading, setIsLoading] = useState(true)
    const webcamRef = useRef(null)
    const canvasRef = useRef(null)

    const runCoco = async () => {
        setIsLoading(true)
        const model = await cocoSSDLoad()
        setIsLoading(false)
        detectInterval = setInterval(() => {
            runObjectDetection(model)
        }, 10)
    }

    const runObjectDetection = async (model) => {
        if (
            canvasRef.current && 
            webcamRef.current &&
            webcamRef.current.video?.readyState === 4
        ) {
            canvasRef.current.width = webcamRef.current.video.videoWidth
            webcamRef.current.height = webcamRef.current.video.videoHeight

            // find all the detected objects
            const detectedObjects = await model.detect(webcamRef.current.video, undefined, 0.6)
            // console.log(detectedObjects)
            const context = canvasRef.current.getContext("2d")
            renderPredictions(detectedObjects, context)
        }
    }

    const showMyVideo = () => {
        if (webcamRef.current !== null && webcamRef.current.video?.readyState === 4) {
            const myVideoWidth = webcamRef.current.video.videoWidth
            const myVideoHeight = webcamRef.current.video.videoHeight

            webcamRef.current.video.width = myVideoWidth
            webcamRef.current.video.height = myVideoHeight
        }
    }

    useEffect(() => { 
        runCoco()
        showMyVideo() 
    }, [])
    return (
        <div className='mt-8'>
            {isLoading ? (
                <div className="gradient-text"> Loading AI Model <span className='animate-spin'> ...</span>
                </div>
                ) :  (
                    <div className='relative flex justify-center items-center gradient p-1.5 rounded-md'>
                        {/* webcam */}
                        <Webcam 
                            ref={webcamRef} 
                            className="rounded-md w-full h-screen" 
                            muted
                        >
                        </Webcam>
                        {/* canvas */}
                        <canvas ref={canvasRef} 
                            className='absolute top-0 left-0 w-full z-9999 lg:h-[720px]'
                        />
                    </div>
                )
            }
        </div>
    )
}

export default ObjectDetection

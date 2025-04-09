namespace SpriteKind {
    export const Temporary = SpriteKind.create()
}
let bgX = 0
let bgY = 0
let ID54656D704E756D3220 = 0
let closestPoint: number[] = []
let dist = 0
let points: number[][] = []
let y = 0
let x = 0
let TempImg: Image = null
enum DegréesToRotate {
    clockwise = 1,
    counterclockwise = 2,
    dubbleClockwise = 3
}
enum Size {
    Whith = 1,
    Hight = 2
}

function _1DPixelValue121(X: number, Img: Image) {
    return (Img.getPixel(X + 1, 0) + (Img.getPixel(X - 1, 0) + Img.getPixel(X, 0))) / 3
}
function ID506978656C56616C7565(X: number, Y: number, Image2: Image) {
    return (Image2.getPixel(X + 1, Y) + Image2.getPixel(X - 1, Y) + (Image2.getPixel(X, Y + 1) + Image2.getPixel(X, Y - 1)) + (Image2.getPixel(X + 1, Y + 1) + Image2.getPixel(X + 1, Y - 1) + (Image2.getPixel(X - 1, Y + 1) + Image2.getPixel(X - 1, Y - 1)))) / 8
}
/**
 * Image Editor
 */
//% weight=49 color=#e38527 icon="\uf1c5"
namespace Image_Editor {
    //% block="draw Bezier curve from x$x1 y$y1 to x$x3 y$y3 with control points x$x2 y$y2 in$image"
    //% image.shadow=screen_image_picker
    export function DrawBezierCurve(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, image: Image) {
        let t = 0
        let resolution = (y3 + y1) * (x3 + x1) / 3
        for (let i = 0; i <= resolution; i++) {
            t = i / resolution
            let x = (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * x2 + t * t * x3
            let y = (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * y2 + t * t * y3
            image.setPixel(x, y, 1)
        }
        return image
    }
    /**
     * TODO: draw myImage onto myImage2,
     * @param myImage myImage,
     * @param myImage2 myImage2,
     */
    //% block="draw $myImage onto $myImage2"
    //% myImage.shadow=screen_image_picker
    //% myImage2.shadow=screen_image_picker
    export function Print(myImage: Image, myImage2: Image): Image {
        TempImg = myImage2.clone()
        for (let X = 0; X <= TempImg.width; X++) {
            for (let Y = 0; Y <= TempImg.height; Y++) {
                if (myImage.getPixel(X, Y) != 0) {
                    myImage2.setPixel(X, Y, myImage.getPixel(X, Y))
                }
            }
        }
        return myImage2
    }
    //% block="draw VoronoiDiagram length$Xsize height$Ysize with$numPoints points"
    export function drawVoronoiDiagram(numPoints: number, Xsize: number, Ysize: number) {
        TempImg = image.create(Xsize, Ysize)
        points = []
        // Generate random points if none are provided
        if (0 == null || points.length < numPoints) {
            for (let index = 0; index < numPoints; index++) {
                x = randint(0, TempImg.width)
                y = randint(0, TempImg.height)
                points.push([x, y])
                screen.drawCircle(x, y, 2, 1)
            }
        }
        points = points.slice(0, numPoints)
        // Calculate and draw Voronoi diagram
        for (let y2 = 0; y2 <= TempImg.height - 1; y2++) {
            for (let x2 = 0; x2 <= TempImg.width - 1; x2++) {
                let closestDist = Infinity
                // Find closest point to current pixel
                for (let j = 0; j <= numPoints - 1; j++) {
                    dist = Math.sqrt((points[j][0] - x2) ** 2 + (points[j][1] - y2) ** 2)
                    if (dist < closestDist) {
                        closestDist = dist
                        closestPoint = points[j]
                    }
                }
                TempImg.setPixel(x2, y2, closestPoint[0] * closestPoint[1] % 15 + closestPoint[0])
            }
        }
        return TempImg
    }

    /**
     * TODO: 1D Noise Image Witht 160 Thicness 3,
     * @param W The Width you want,
     * @param Thicness how big the spots are,
     */
    //% block="1D Noise Image Witht $W Thicness $Thicness"
    //% W.defl=160
    //% Thicness.defl=2
    export function CreateNoiseImage1D(W: number, Thicness: number): Image {
        TempImg = image.create(W, 1)
        for (let X = 0; X <= W; X++) {
            TempImg.setPixel(X, 0, randint(3, 15))
        }
        for (let i = 0; i < Thicness; i++) {
            for (let X2 = 0; X2 <= W; X2++) {
                TempImg.setPixel(X2, 0, _1DPixelValue121(X2, TempImg))
            }
        }
        return TempImg
    }


    /**
     * TODO: describe your function here, makes perline noise from en image
     * @param Image2 the image to Create prerline noise,
     * @param BlendingLevel the Blending Level,
     */
    //% block="2D Noise Image Witht $W Height $H Thicness $BlendingLevel"
    //% BlendingLevel.defl=3
    //% W.defl=160
    //% H.defl=120
    //% BlendingLevel.number
    export function CreateNoiseImage2D(W: number, H: number, BlendingLevel: number): Image {
        TempImg = image.create(W, H)
        for (let X = 0; X <= TempImg.width; X++) {
            for (let Y = 0; Y <= TempImg.height; Y++) {
                if (X == 0 || Y == 0 || X == TempImg.width - 1 || Y == TempImg.height - 1) {
                    TempImg.setPixel(X, Y, randint(8, 14))
                } else {
                    TempImg.setPixel(X, Y, randint(3, 15))
                }
            }
        }
        for (let Times = 0; Times <= 1; Times++) {
            for (let X2 = 0; X2 <= TempImg.width; X2++) {
                TempImg.setPixel(X2, Times * (TempImg.height - 1), ID506978656C56616C7565(X2, Times * (TempImg.height - 1), TempImg) + 1)
            }
            for (let Y2 = 0; Y2 <= TempImg.height; Y2++) {
                TempImg.setPixel(Times * (TempImg.width - 1), Y2, ID506978656C56616C7565(Times * (TempImg.width - 1), Y2, TempImg) + 1)
            }
        }
        for (let Times = 0; Times < BlendingLevel; Times++) {
            for (let X2 = 0; X2 <= TempImg.width - 3; X2++) {
                for (let Y2 = 0; Y2 <= TempImg.height - 3; Y2++) {
                    TempImg.setPixel(X2 + 1, Y2 + 1, ID506978656C56616C7565(X2 + 1, Y2 + 1, TempImg))
                }
            }
        }

        return TempImg
    }
    /**
     * TODO: describe your function here, rotate any square image
     * @param myImage describe parameter here, the image you want to rotate
    * @param Rotate describe parameter here, rotate it clockwise or counterclockwise
     */
    //% block="Rotate $myImage 90° $Rotate"
    //% myImage.shadow=screen_image_picker
    //% Rotate.enum

    export function Rotate(myImage: Image, Rotate: DegréesToRotate): Image {
        TempImg = image.create(myImage.width, myImage.height)
        if (Rotate == 1) {
            for (let X1 = 0; X1 <= TempImg.width; X1++) {
                for (let Y1 = 0; Y1 <= TempImg.height; Y1++) {
                    TempImg.setPixel(X1, Y1, myImage.getPixel(myImage.height - Y1, X1))
                }
            }
        } else if (Rotate == 2) {
            for (let X2 = 0; X2 <= TempImg.width; X2++) {
                for (let Y2 = 0; Y2 <= TempImg.height; Y2++) {
                    TempImg.setPixel(X2, Y2, myImage.getPixel(Y2, myImage.width - X2))
                }
            }
        } else {
            myImage.flipX()
            myImage.flipY()
        }
        return TempImg
    }

    /**
     * TODO: describe your function here, find the width or the height of en image
     * @param image describe parameter here, the image you want to find the width or the height
    * @param size describe parameter here, Choose if you want to know the width or the height
     */
    //% block="$size of $MyImage "
    //% MyImage.shadow=screen_image_picker
    //% size.Size
    // come back to this one 
    export function FindSizeOf(size: Size, MyImage: Image): number {
        if (size == 1) {
            return MyImage.width
        } else {
            return MyImage.height
        }
    }
    /**
     * TODO: describe your function here, maks a grid with your image
     * @param image describe parameter here, The image you want to make a grid of
     * @param Xtimes describe parameter here, the amont of times to place your image on the X axes
     * @param Ytimes describe parameter here, the amont of times to place your image on the Y axes
     */
    //% block="Grid of $imagE size x $Xtimes y $Ytimes"
    //% imagE.shadow=screen_image_picker
    //% Xtimes.Number
    //% Ytimes.Number
    export function MakeGrid(imagE: Image, Xtimes: number, Ytimes: number): Image {
        TempImg = image.create(imagE.width * Xtimes, imagE.height * Ytimes)
        for (let X = 0; X <= imagE.width * Xtimes; X++) {
            for (let Y = 0; Y <= imagE.height * Ytimes; Y++) {

                TempImg.setPixel(X, Y, imagE.getPixel(X % imagE.width, Y % imagE.height))
            }
        }
        return TempImg
    }
    //% block="Draw $background onto $foreground x$offsetX y$offsetY"
    //% background.shadow=screen_image_picker
    //% foreground.shadow=screen_image_picker
    //% foreground.width.defl=160
    //% foreground.height.defl=120
    //% offsetX.number
    //% offsetY.number
    export function pasteImage(background: Image, foreground: Image, offsetX: number, offsetY: number): Image {
        bgY = 0
        bgX = 0
        for (let x = 0; x <= Math.max(background.width, foreground.width) - 1; x++) {
            for (let y = 0; y <= background.height - 1; y++) {
                // Calculate the coordinates in the background image
                bgX = x + offsetX
                bgY = y + offsetY
                // Check if this pixel is inside the bounds of the background image
                if ((!(background.getPixel(bgX, bgY) == 0)) && (bgX >= 0 && bgX < foreground.width && bgY >= 0 && bgY < foreground.height)) {
                    // Set the color of the corresponding pixel in the background image
                    foreground.setPixel(bgX, bgY, background.getPixel(x, y))
                }
            }
        }
        return foreground
    }
    //% block="cut $Img from x$x1 y$y1 to x$x2 y$y2"
    //% Img.shadow=screen_image_picker
    export function cutImage(x1: number, y1: number, x2: number, y2: number, Img: Image): Image {
        TempImg = image.create(x2 - x1 + 1, y2 - y1 + 1)
        for (let i = 0; i <= x2; i++) {
            for (let j = 0; j <= y2; j++) {
                TempImg.setPixel(i + x1, j + y1, Img.getPixel(i, j))
            }
        }
        return TempImg
    }
    //% block="Resize $myImage to $num"
    //% myImage.shadow=screen_image_picker
    export function Resize(num: number, myImage: Image): Image {
        let TempImg = image.create(myImage.width * num, myImage.height * num)
        for (let x = 0; x <= myImage.width * num; x++) {
            for (let y = 0; y <= myImage.height * num; y++) {
                TempImg.setPixel(x, y, myImage.getPixel(x / num, y / num))
            }
        }
        return TempImg
    }
    //% block="set size of $myImage to x $num y $num2"
    //% myImage.shadow=screen_image_picker
    export function ResizeExact(num: number, num2: number, myImage: Image): Image {
        TempImg = image.create(num, num2)
        for (let x = 0; x <= num; x++) {
            for (let y = 0; y <= num2; y++) {
                TempImg.setPixel(x, y, myImage.getPixel(x * (myImage.width / num), y * (myImage.height / num2)))
            }
        }
        return TempImg
    }

}
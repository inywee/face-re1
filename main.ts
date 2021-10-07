radio.onReceivedNumber(function (receivedNumber) {
    basic.clearScreen()
    처음_시간 = input.runningTime()
    상태변수 = receivedNumber
    basic.showNumber(상태변수)
    while (상태변수 == 1) {
        huskylens.request()
        프레임_인식 = huskylens.getBox(HUSKYLENSResultType_t.HUSKYLENSResultBlock)
        학습_결과 = huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock)
        if (프레임_인식 > 0) {
            if (학습_결과 == true) {
                basic.showIcon(IconNames.Heart)
                basic.pause(100)
                basic.clearScreen()
            } else {
                basic.pause(100)
                나쁜놈 += 1
                basic.showNumber(나쁜놈)
                basic.clearScreen()
                basic.pause(100)
            }
        }
        if (input.runningTime() - 처음_시간 > 작동시간) {
            상태변수 = 0
            나쁜놈 = 0
            basic.clearScreen()
        }
    }
})
let 학습_결과 = false
let 프레임_인식 = 0
let 처음_시간 = 0
let 상태변수 = 0
let 나쁜놈 = 0
let 작동시간 = 0
작동시간 = 1000 * 10
huskylens.initI2c()
radio.setGroup(1)
huskylens.initMode(protocolAlgorithm.ALGORITHM_FACE_RECOGNITION)
나쁜놈 = 0
상태변수 = 0
basic.forever(function () {
    if (나쁜놈 == 1) {
        radio.sendNumber(3)
    }
    if (나쁜놈 > 5) {
        radio.sendNumber(2)
        나쁜놈 = 0
    }
})

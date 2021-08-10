export function convertSecondsToHoursMinutes(secs:number) {
    let hours = Math.floor(secs / 3600)
    
    let minutes = Math.floor((secs - hours * 3600) / 60)
    let ss = secs % 60
    let hourStr = hours > 0 ? ((hours >= 10) ? hours.toString() : '0' + hours.toString()) + ':' : ''
    let minStr = minutes > 0 ? ((minutes >= 10) ? minutes.toString() : '0' + minutes.toString()) : '00'
    let secStr = ss > 0 ? ((ss >= 10) ? ss.toString() : '0' + ss.toString()) : '00'
    return hourStr + minStr + ':' + secStr
}

export function isLeapYear(year:number) {
    return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0
}

export function daysCount(month:number, year: number) {
    switch (month) {
        case 1: case 3: case 5: case 7: case 8: case 10: case 12: {
            return 31
        }
        break
        case 4: case 6: case 9: case 11: {
            return 30
        }
        break
        case 2 : {
            let leap = isLeapYear(year)
            if (leap) {
                return 29
            }
            return 28
        }
        break
    } 
    return 0
}
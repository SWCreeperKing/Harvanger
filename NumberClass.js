class NumberClass {
    constructor(mantissa = 0, exponent = 0) {
        this.mantissa = mantissa
        this.exponent = exponent
        if (mantissa === 0) this.exponent = 0
        this.update()
    }

    update() {
        if (this.mantissa >= 10) {
            let log = Math.trunc(Math.log10(this.mantissa))
            this.mantissa /= Math.pow(10, log)
            this.exponent += log
        } else if (this.mantissa < 1 && this.mantissa > 0 && this.exponent > 0) {
            this.exponent--
            this.mantissa *= 10
        }
        if (this.mantissa < 0 || this.exponent < 0) {
            this.mantissa = 0
            this.exponent = 0
        }
        this.mantissa = parseFloat(this.mantissa.toFixed(5))
        this.exponent = parseInt(this.exponent.toFixed())
    }

    add(tmpNum) {
        let num = this.checkNum(tmpNum)
        return new NumberClass(this.mantissa + num.mantissa / Math.pow(10, this.exponent - num.exponent), this.exponent)
    }

    sub(tmpNum) {
        let num = this.checkNum(tmpNum)
        let delta = this.exponent - num.exponent
        if (delta < 0) return new NumberClass()
        return new NumberClass(this.mantissa - num.mantissa / Math.pow(10, delta), this.exponent)
    }

    multi(tmpNum) {
        let num = this.checkNum(tmpNum)
        if (num.isEqualTo(0) || this.isEqualTo(0)) return new NumberClass()
        return new NumberClass(this.mantissa * num.mantissa, this.exponent + num.exponent)
    }

    div(tmpNum) {
        let num = this.checkNum(tmpNum)
        if (!this.isGreaterThanOrEqualTo(num) || num.isEqualTo(0)) return new NumberClass()
        if (this.isEqualTo(num)) return new NumberClass(1)
        return new NumberClass(this.mantissa / num.mantissa, this.exponent - num.exponent)
    }

    isGreaterThan(tmpNum) {
        let num = this.checkNum(tmpNum)
        if (this.exponent > num.exponent) return true
        else if (this.exponent === num.exponent) return this.mantissa > num.mantissa
        else return false
    }

    isEqualTo(tmpNum) {
        let num = this.checkNum(tmpNum)
        return this.exponent === num.exponent && this.mantissa.toFixed(5) === num.mantissa.toFixed(5);
    }

    isGreaterThanOrEqualTo(tmpNum) {
        let num = this.checkNum(tmpNum)
        return this.isGreaterThan(num) || this.isEqualTo(num)
    }

    checkNum(num) {
        if (num instanceof NumberClass) return num
        return new NumberClass(num)
    }

    toString() {
        if (this.exponent <= 2) return (this.mantissa * Math.pow(10, this.exponent)).toFixed(2)
        if (this.exponent === 0) return this.mantissa.toFixed(2)
        else return this.mantissa.toFixed(2) + "e" + this.exponent
    }

    toFullString() {
        return this.mantissa + " E " + this.exponent
    }
}
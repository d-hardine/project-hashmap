function hash(keyString, maxBuckets) {
    let hashCode = 0
    let primeNumber = 31
    for (let i = 0; i < keyString.length; i++)
        hashCode = (primeNumber * hashCode + keyString.charCodeAt(i)) % maxBuckets
    return hashCode
}

export class HashMap {
    constructor() {
        this.buckets = []
        this.maxBuckets = 16
        this.loadFactor = 0.75
        this.totalEntries = 0
    }

    print() {
        console.log(this.buckets, this.totalEntries)
    }

    doubleBuckets() { //double the buckets and also rehash the keys
        this.maxBuckets = this.maxBuckets * 2
        this.totalEntries = 0
        let oldEntries = this.entries()
        this.buckets = []
        for(let i = 0; i < oldEntries.length; i++) {
            this.set(oldEntries[i][0], oldEntries[i][1])
        }
    }

    set(key, value) {
        this.totalEntries += 1
        if(this.totalEntries > this.maxBuckets * 0.75){ //0.75 is the load factor, if exceeds it, double the bucket and rehash
            this.totalEntries -= 1
            this.doubleBuckets()
            this.set(key, value)
        }
        else {
            //this.totalEntries += 1
            const index = hash(key, this.maxBuckets) //hash the key and value pair
            if(this.buckets[index] === undefined) { //if the bucket if empty
                this.buckets[index] = [[key, value]]
            } else {
                let inserted = false
                for(let i = 0; i < this.buckets[index].length; i++) { //overwrite the value from the same key
                    if(this.buckets[index][i][0] === key) {
                        this.buckets[index][i][1] = value
                        inserted = true
                    }
                }
                if(inserted === false) //insert key value combination to the respective bucket index
                    this.buckets[index].push([key, value])
            }
        }
    }

    get(key) {
        const index = hash(key, this.maxBuckets)
        if(this.buckets[index] === undefined)
            return null
        else {
            for (let i = 0; i < this.buckets[index].length; i++) {
                if(this.buckets[index][i][0] === key) {
                    console.log(this.buckets[index][i][1])
                    return this.buckets[index][i][1]
                }
                else {
                    console.log(null)
                    return null
                }
            }
        }
    }

    has(key) {
        const index = hash(key, this.maxBuckets)
        if(this.buckets[index] === undefined) {
            console.log(false)
            return false
        }
        else {
            for (let i = 0; i < this.buckets[index].length; i++) {
                if(this.buckets[index][i][0] === key) {
                    console.log(true)
                    return true
                }
                console.log(false)
                return false

            }
        }
    }

    remove(key) {
        const index = hash(key, this.maxBuckets)
        if(this.buckets[index] === undefined) {
            console.log(false)
            return false
        }
        else {
            for(let i = 0; i < this.buckets[index].length; i++) {
                if(this.buckets[index][i][0] === key) {
                    delete this.buckets[index][i]
                    this.buckets[index].splice(i,1)
                    this.totalEntries -= 1
                    console.log(true)
                    return true
                }
            }
            console.log(false)
            return false
        }
    }

    length() {
        console.log(this.totalEntries)
        return this.totalEntries
    }

    clear() {
        this.buckets = []
    }

    keys() {
        let keyArray = []
        for(let i = 0; i < this.buckets.length; i++) {
            if(this.buckets[i] !== undefined) {
                for(let j = 0; j < this.buckets[i].length; j++) {
                    keyArray.push(this.buckets[i][j][0])
                }
            }
        }
        return keyArray
    }

    values() {
        let valueArray = []
        for(let i = 0; i < this.buckets.length; i++) {
            if(this.buckets[i] !== undefined) {
                for(let j = 0; j < this.buckets[i].length; j++) {
                    valueArray.push(this.buckets[i][j][1])
                }
            }
        }
        return valueArray
    }

    entries() {
        let entryArray = []
        for(let i = 0; i < this.buckets.length; i++) {
            if(this.buckets[i] !== undefined) {
                for(let j = 0; j < this.buckets[i].length; j++) {
                    entryArray.push(this.buckets[i][j])
                }
            }
        }
        return entryArray
    }
}


class quickUnion {
    constructor(arr){
        this.ids = []
        for(let i = 0; i < arr.length; i++){
            this.ids.push(i)
        }
    }

    root(p){
        const { ids } = this;
        while(ids[p] !== p){ p = ids[p] }
        return p
    }

    connected(p, q){
        return this.root(p) === this.root(q)
    }

    union(p, q){
        const { ids } = this
        ids[this.root(p)] = this.root(q)
    }
}



if (require.main === module) {
    const arr = [1, 2, 3, 4, 5, 6, 1]
    const qu = new quickUnion(arr)
    qu.union(0, 6)
    qu.union(1, 3)
    qu.union(2, 6)
    qu.union(1, 0)
    console.log(qu)
    console.log(qu.connected(0, 6)) // true
    console.log(qu.connected(2, 0)) // true
    console.log(qu.connected(2, 3)) // true
    console.log(qu.connected(1, 0)) // true
    console.log(qu.connected(5, 6)) // false

}
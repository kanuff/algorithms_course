

class quickFind{
    constructor(arr){
        this.ids = []
        for(let i = 0; i < arr.length; i++){
            this.ids.push(i)
        }
    }

    connected(p, q){
        return this.ids[p] === this.ids[q]
    }

    union(p, q){
        const { ids } = this;
        const pid = ids[p]
        const qid = ids[q]
        for(let i = 0; i < ids.length; i++){
            if (ids[i] === pid){ ids[i] = qid }
        }
    }
}


if (require.main === module) {
    const arr = [1,2,3,4,5,6,1]
    const qf = new quickFind(arr)
    qf.union(0, 7)
    qf.union(1, 3)
    qf.union(2, 7)
    console.log(qf.connected(0,7)) // true
    console.log(qf.connected(0,2)) // true
    console.log(qf.connected(2,3)) // false

}
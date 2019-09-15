class weightedQuickUnion {
    constructor(arr){
        this.ids = []
        this.sz = new Array(arr.length).fill(1)
        for(let i = 0; i < arr.length; i++){
            this.ids.push(i)
        }
    }

    root(p) {
        const { ids } = this;
        while (ids[p] !== p) { 
            ids[p] = ids[ids[p]]; 
            p = ids[p]
        }
        return p
    }

    connected(p, q) {
        return this.root(p) === this.root(q)
    }

    union(p, q) {
        const { ids, sz } = this
        const proot = this.root(p)
        const qroot = this.root(q)
        if (sz[proot] < sz[qroot]) { 
            ids[proot] = qroot; 
            sz[qroot]++ 
        } else { 
            ids[qroot] = proot; 
            sz[proot]++ 
        }
    }
}

if (require.main === module) {
    const arr = [1, 2, 3, 4, 5, 6, 1]
    const wqu = new weightedQuickUnion(arr)
    wqu.union(0, 6)
    wqu.union(1, 3)
    wqu.union(2, 6)
    wqu.union(1, 0)
    console.log(wqu)
    console.log(wqu.connected(0, 6)) // true
    console.log(wqu.connected(2, 0)) // true
    console.log(wqu.connected(2, 3)) // true
    console.log(wqu.connected(1, 0)) // true
    console.log(wqu.connected(5, 6)) // false
}
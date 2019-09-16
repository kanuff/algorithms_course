class percolation {
    constructor(N){
        // build grid
        this.N = N
        this.len = N**2;
        this.sz = new Array(this.len).fill(1)
        this.grid = []
        for (let i = 0; i < N**2; i++){
            this.grid.push({site: i, status: "closed" })
        }

        // build virtual top site
        for(let t = 0; t < N; t++){
            this.grid[t] = { site: 0, status: "closed" }
        }
        // build virtual bottom site
        for(let b = this.len; b > this.len - N; b--){
            this.grid[b] = { site: this.len - 1, status: "closed" }
        }
        // this.closed_sites = this.grid.filter(site => site.status === "closed")
        this.closed_sites = [...Array(this.len).keys()]

    }

    root(p) {
        const { grid } = this;
        while (grid[p].site !== p) {
            p = grid[p].site
        }
        return p
    }

    connected(p, q) {
        return this.root(p) === this.root(q)
    }

    percolated() {
        return this.connected(0, this.len)
    }

    union(p, q) {
        if( this.connected(p,q)) { return }
        const { grid, sz } = this
        const proot = this.root(p)
        const qroot = this.root(q)
        if (sz[proot] < sz[qroot]) {
            grid[proot].site = qroot;
            sz[qroot]++
        } else {
            grid[qroot].site = proot;
            sz[proot]++
        }
    }

    random_site(){
        const { closed_sites } = this;
        if( closed_sites.length <= 0 ){ return "All sites are open!" }

        const rand_idx = Math.floor(Math.random() * closed_sites.length)
        return closed_sites.splice(rand_idx, 1)
    }

    find_adjacent_open_sites(idx){
        const { N, len } = this;
        const up = idx - N < 0 ? null : idx - N
        const down = idx + N > len ? null : idx + N
        const left = (idx - 1) % N == N - 1 ? null : idx - 1
        const right = (idx + 1)%N == 0 ? null : idx + 1
        return [up, down, left, right].filter( el => el !== null && el >= 0 && el < len)
    }

    open_site(idx) {
        const { grid } = this;
        grid[idx].status = "open"
        const adj_sites = this.find_adjacent_open_sites(idx)
        adj_sites.forEach(a => {
            if (grid[a].status === "open") {
                this.union(a, idx)
            }
        })
    }

    runSim(output = false){
        let idx;
        let tries = 0;
        while ( !this.percolated() ) {
            tries += 1
            idx = this.random_site()[0]
            this.open_site(idx)
        }
        if(output){
            console.log(this)
            console.log(`Percolated after ${tries} iterations`)
        }
        return tries
    }
}

if (require.main === module) {
    const N = 100
    const simulations = 100
    const tries = []
    for(let i = 0; i < simulations; i++){
        const perc = new percolation(N)
        tries.push(perc.runSim())
    }
    console.log(tries)
    const sum = tries.reduce( ( acc, el ) => acc + el)
    console.log( sum / (simulations * (N**2) ) )


}
exports.default  = (resolution)=>{
    const world = [];
    for (let x = 0; x < resolution; x++){
        world[x] = [];
        for (let y = 0; y < resolution; y++){
            world[x][y] = Math.random()*255;
        }
    }
    return world;
}

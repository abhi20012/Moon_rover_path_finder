
("use strict");
/**
 * Astar search algorithm
 *
 * @param {Node} start
 * @param {Node} end
 * @param {Number} t
 */
function astar(start, end, t) {
    grid.setAlgo(astar);
    // grid.resetPath();
    let openset = [start];
    drawing = false;
    grid.drawing = false;
    grid.removeEventListeners();
    
    for (let row of grid.nodes) {
        for (let node of row) {
            node.g = Infinity;
            node.f = Infinity;
            node.h = 0;
            node.visited = false;
            node.removeColor();
            node.previous = null;
        }
    }

    start.g = 0;
    start.f = heruistic(start, end);
    let cnode = null;

    if (t != 0) {
        let int = setInterval(() => {
            if (openset.length != 0) {
                let cnode = getLowestF();

                if (cnode == end) {
                    console.log("done");
                    retracePath(cnode, 100);
                    clearInterval(int);
                    return;
                }

                openset.splice(openset.indexOf(cnode), 1);
                cnode.visited = true;
                cnode.setColour("#3f51b5"); 

                for (let neighbor of cnode.neighbors) {
                    if (!neighbor.visited && !neighbor.obstacle) {
                        // console.log("itter");
                        let tempG = cnode.g + heruistic(cnode, neighbor);
                        if (tempG < neighbor.g) {
                            neighbor.previous = cnode;
                            neighbor.g = tempG;
                            neighbor.f = tempG + heruistic(neighbor, end);
                            if (!openset.includes(neighbor)) openset.push(neighbor);
                        }
                    }
                }
            } else {
                clearInterval(int);
                return false;   
            }
        }, t);
    } else {
        while (openset.length != 0) {
            let cnode = getLowestF();

            if (cnode == end) {
                console.log("done");
                retracePath(cnode, 0);
                break;
                return;
            }

            openset.splice(openset.indexOf(cnode), 1);
            cnode.visited = true;
            cnode.setColour("#3f51b5", true); 

            for (let neighbor of cnode.neighbors) {
                if (!neighbor.visited && !neighbor.obstacle) {
                    // console.log("itter");
                    let tempG = cnode.g + heruistic(cnode, neighbor);
                    if (tempG < neighbor.g) {
                        neighbor.previous = cnode;
                        neighbor.g = tempG;
                        neighbor.f = tempG + heruistic(neighbor, end);
                        if (!openset.includes(neighbor)) openset.push(neighbor);
                    }
                }
            }
        }
    }

    function getLowestF() {
        let lowestF = Infinity;
        let res;
        for (let node of openset) {
            if (node.f < lowestF) {
                lowestF = node.f;
                res = node;
            }
        }
        return res;
    }

    function heruistic(current, end) {
        return Math.abs(current.x - end.x) + Math.abs(current.y - end.y);
        // return Math.sqrt(((current.x - end.x) * (current.x - end.x)) + ((current.y - end.y) * (current.y - end.y)))
    }
}
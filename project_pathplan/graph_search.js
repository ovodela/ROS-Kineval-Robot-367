/*|\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\
|\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/|
||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/
/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\

    2D Path Planning in HTML5 Canvas | Graph Search Methods

    Stencil methods for student implementation of graph search algorithms.

    @author ohseejay / https://github.com/ohseejay
                     / https://bitbucket.org/ohseejay

    Chad Jenkins
    Laboratory for Perception RObotics and Grounded REasoning Systems
    University of Michigan

    License: Michigan Honor License

    Usage: see search_canvas.html

|\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/|
||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/
/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\
\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/*/

function getElement(G, heap, index){
    return G[heap[index - 1][0], heap[index - 1][1]].priority;
}

function swap(heap, index1, index2){
    var temp = heap[index1 - 1];
    heap[index1 - 1] = heap[index2 - 1];
    heap[index2 - 1] = temp;
}

function shiftUp(G, heap){
    var index = heap.length;
    while (index > 1 && (getElement(G, heap, Math.floor(index / 2)) > getElement(G, heap, index))){ // 2 > 1
        swap(heap, index, Math.floor(index / 2));
        index = Math.floor(index / 2);
    }
}

function shiftDown(G, heap, k){
    var sz = heap.length;
    while (2 * k <= sz){
        var j = 2 * k;
        if (j < sz && getElement(G, heap, j) > getElement(G, heap, j + 1)) ++j; // 1 < 2
        if (!(getElement(G, heap, k) > getElement(G, heap, j))) break; // 2 >= 1
        swap(heap, k, j);
        k = j;
    }
}// shiftDown

function minheap_insert(G, heap, new_element) {
    heap.push(new_element);
    shiftUp(G, heap);
}

function minheap_extract(G, heap) {
    var temp = heap[0];
    heap[0] = heap[heap.length - 1];
    heap.pop();
    shiftDown(G, heap, 1);
    return temp;
}

function initSearchGraph() {

    // create the search queue
    visit_queue = [];

    // initialize search graph as 2D array over configuration space
    //   of 2D locations with specified spatial resolution
    G = [];
    for (iind=0,xpos=-2;xpos<7;iind++,xpos+=eps) {
        G[iind] = [];
        for (jind=0,ypos=-2;ypos<7;jind++,ypos+=eps) {
            G[iind][jind] = {
                i:iind,j:jind, // mapping to graph array
                x:xpos,y:ypos, // mapping to map coordinates
                parent:null, // pointer to parent in graph along motion path
                distance:10000, // distance to start via path through parent
                visited:false, // flag for whether the node has been visited
                priority:null, // visit priority based on fscore
                queued:false // flag for whether the node has been queued for visiting
            };

            // STENCIL: determine whether this graph node should be the start
            //   point for the search
            if (ypos == q_init[1] && xpos == q_init[0]){
                G[iind][jind].queued = true;
                G[iind][jind].distance = 0;
                G[iind][jind].priority = 1;
                G[iind][jind].parent = G[iind][jind];
                minheap_insert(G, visit_queue, [iind, jind]);
            }
        }
    }
}

function calc_priority(G, curr, goal){
    var xDiff =  G[goal[0]][goal[1]].x - G[curr[0]][curr[1]].x;
    var yDiff =  G[goal[0]][goal[1]].y - G[curr[0]][curr[1]].y;
    var euclidDist = Math.sqrt(xDiff * xDiff + yDiff * yDiff);

    return euclidDist + G[curr[0]][curr[1]].distance;

}
//old check node
// if (!G[temp_x][temp_y].visited && testCollision(G[temp_x][temp_y].x, G[temp_x][temp_y].y)){

//     if(!(G[temp_x][temp_y].x == q_goal[0] && G[temp_x][temp_y].y == q_goal[1])){
//         G[temp_x][temp_y].queued = true;
//         minheap_insert(visit_queue, [temp_x, temp_y]);
//         if (G[arr[0]][arr[1]].distance + 1 < G[temp_x][temp_y].distance){
//             G[temp_x][temp_y].distance = G[arr[0]][arr[1]].distance + 1;
//             G[temp_x][temp_y].parent = G[arr[0]][arr[1]];
//             G[temp_x][temp_y].queued = true;
//             G[temp_x][temp_y].priority = calc_distance(G, [temp_x, temp_y], q_goal);
//             // minheap_insert(visit_queue, [arr[0], arr[1] - 1, G[arr[0]][arr[1] - 1].priority]);
//         }
//     }
//     else{
//         search_iterate = false;
//         drawHighlightedPathGraph;
//         return "succeeded";
//     }
// }

function iterateGraphSearch() {

    // STENCIL: implement a single iteration of a graph search algorithm
    //   for A-star (or DFS, BFS, Greedy Best-First)
    //   An asynch timing mechanism is used instead of a for loop to avoid
    //   blocking and non-responsiveness in the browser.
    //
    //   Return "failed" if the search fails on this iteration.
    //   Return "succeeded" if the search succeeds on this iteration.
    //   Return "iterating" otherwise.
    //
    //   When search is complete ("failed" or "succeeded") set the global variable 
    //   search_iterate to false. 
    //
    //   Provided support functions:
    //
    //   testCollision - returns whether a given configuration is in collision
    //   drawHighlightedPathGraph - draws a path back to the start location
    //   draw_2D_configuration - draws a square at a given location

    // while(!visit_queue.empty){
        var arr = visit_queue.minheap_extract(G, visit_queue);
        G[arr[0]][arr[1]].visited = true;
        
        //east
        var temp_x = arr[0] + eps;
        var temp_y = arr[1];

        if (!G[temp_x][temp_y].visited && testCollision(G[temp_x][temp_y].x, G[temp_x][temp_y].y)){

            if(!(G[temp_x][temp_y].x == q_goal[0] && G[temp_x][temp_y].y == q_goal[1])){
                G[temp_x][temp_y].queued = true;
                minheap_insert(visit_queue, [temp_x, temp_y]);
                if (G[arr[0]][arr[1]].distance + 1 < G[temp_x][temp_y].distance){
                    G[temp_x][temp_y].distance = G[arr[0]][arr[1]].distance + 1;
                    G[temp_x][temp_y].parent = G[arr[0]][arr[1]];
                    G[temp_x][temp_y].queued = true;
                    G[temp_x][temp_y].priority = calc_distance(G, [temp_x, temp_y], q_goal);
                    // minheap_insert(visit_queue, [arr[0], arr[1] - 1, G[arr[0]][arr[1] - 1].priority]);
                }
            }
            else{
                search_iterate = false;
                drawHighlightedPathGraph;
                return "succeeded";
            }
        }

        //south
        temp_x = arr[0];
        temp_y = arr[1] - eps;
        if (!G[temp_x][temp_y].visited && testCollision(G[temp_x][temp_y].x, G[temp_x][temp_y].y)){

            if(!(G[temp_x][temp_y].x == q_goal[0] && G[temp_x][temp_y].y == q_goal[1])){
                G[temp_x][temp_y].queued = true;
                minheap_insert(visit_queue, [temp_x, temp_y]);
                if (G[arr[0]][arr[1]].distance + 1 < G[temp_x][temp_y].distance){
                    G[temp_x][temp_y].distance = G[arr[0]][arr[1]].distance + 1;
                    G[temp_x][temp_y].parent = G[arr[0]][arr[1]];
                    G[temp_x][temp_y].priority = calc_distance(G, [temp_x, temp_y], q_goal);
                    // minheap_insert(visit_queue, [arr[0], arr[1] - 1, G[arr[0]][arr[1] - 1].priority]);
                }
            }
            else{
                search_iterate = false;
                drawHighlightedPathGraph;
                return "succeeded";
            }
        }

        //west
        temp_x = arr[0] - eps;
        temp_y = arr[1];
        if (!G[temp_x][temp_y].visited && testCollision(G[temp_x][temp_y].x, G[temp_x][temp_y].y)){

            if(!(G[temp_x][temp_y].x == q_goal[0] && G[temp_x][temp_y].y == q_goal[1])){
                G[temp_x][temp_y].queued = true;
                minheap_insert(visit_queue, [temp_x, temp_y]);
                if (G[arr[0]][arr[1]].distance + 1 < G[temp_x][temp_y].distance){
                    G[temp_x][temp_y].distance = G[arr[0]][arr[1]].distance + 1;
                    G[temp_x][temp_y].parent = G[arr[0]][arr[1]];
                    G[temp_x][temp_y].priority = calc_distance(G, [temp_x, temp_y], q_goal);
                    // minheap_insert(visit_queue, [arr[0], arr[1] - 1, G[arr[0]][arr[1] - 1].priority]);
                }
            }
            else{
                search_iterate = false;
                drawHighlightedPathGraph;
                return "succeeded";
            }
        }

        //north 
        temp_x = arr[0];
        temp_y = arr[1] + eps;
        if (!G[temp_x][temp_y].visited && testCollision(G[temp_x][temp_y].x, G[temp_x][temp_y].y)){

            if(!(G[temp_x][temp_y].x == q_goal[0] && G[temp_x][temp_y].y == q_goal[1])){
                G[temp_x][temp_y].queued = true;
                minheap_insert(visit_queue, [temp_x, temp_y]);
                if (G[arr[0]][arr[1]].distance + 1 < G[temp_x][temp_y].distance){
                    G[temp_x][temp_y].distance = G[arr[0]][arr[1]].distance + 1;
                    G[temp_x][temp_y].parent = G[arr[0]][arr[1]];
                    G[temp_x][temp_y].priority = calc_distance(G, [temp_x, temp_y], q_goal);
                    // minheap_insert(visit_queue, [arr[0], arr[1] - 1, G[arr[0]][arr[1] - 1].priority]);
                }
            }
            else{
                search_iterate = false;
                drawHighlightedPathGraph;
                return "succeeded";
            }
        }

        return "iterating";
    //}

}

//////////////////////////////////////////////////
/////     MIN HEAP IMPLEMENTATION FUNCTIONS
//////////////////////////////////////////////////

    // STENCIL: implement min heap functions for graph search priority queue.
    //   These functions work use the 'priority' field for elements in graph.


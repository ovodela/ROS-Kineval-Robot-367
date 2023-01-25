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

function getElement(heap, index){
    return G[heap[index - 1][0]][heap[index - 1][1]].priority;
}

function swap(heap, index1, index2){
    var temp = heap[index1 - 1];
    heap[index1 - 1] = heap[index2 - 1];
    heap[index2 - 1] = temp;
}

function shiftUp(heap){
    var index = heap.length;
    // console.log(index);
    while (index > 1 && (getElement(heap, Math.floor(index / 2)) > getElement(heap, index))){ // 2 > 1
        swap(heap, index, Math.floor(index / 2));
        index = Math.floor(index / 2);
    }
}

function shiftDown(heap, k){
    var sz = heap.length;
    while (2 * k <= sz){
        var j = 2 * k;
        if (j < sz && getElement(heap, j) > getElement(heap, j + 1)) ++j; // 1 < 2
        if (!(getElement(heap, k) > getElement(heap, j))) break; // 2 >= 1
        swap(heap, k, j);
        k = j;
    }
}// shiftDown

function minheap_insert(heap, new_element) {
    heap.push(new_element);
    shiftUp(heap);
}

function minheap_extract(heap) {
    var temp = heap[0];
    heap[0] = heap[heap.length - 1];
    heap.pop();
    shiftDown(heap, 1);
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
            if ((Math.abs(xpos - q_init[0]) < (eps/2))  && (Math.abs(ypos - q_init[1]) < (eps/2))){
                G[iind][jind].queued = true;
                G[iind][jind].distance = 0;
                G[iind][jind].priority = 1;
                G[iind][jind].parent = G[iind][jind];
                minheap_insert(visit_queue, [iind, jind]);
                console.log("initial point added");
            }
        }
    }
}

function calc_priority(curr, goal){
    var xDiff =  goal[0] - G[curr[0]][curr[1]].x;
    var yDiff =  goal[1] - G[curr[0]][curr[1]].y;
    var euclidDist = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
    // console.log("calcPriority");
    return euclidDist + (G[curr[0]][curr[1]].distance / 9);

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

function checkNode(arr, temp_x, temp_y){
    // console.log("checkNode");
    if (!G[temp_x][temp_y].visited && !testCollision([G[temp_x][temp_y].x, G[temp_x][temp_y].y])){
        // console.log(1);
        if(!G[temp_x][temp_y].queued){
            if(!((Math.abs(G[temp_x][temp_y].x - q_goal[0]) < (eps/2)) && (Math.abs(G[temp_x][temp_y].y - q_goal[1]) < (eps/2)))){
                // console.log(2);
                G[temp_x][temp_y].queued = true;
                G[temp_x][temp_y].distance = G[arr[0]][arr[1]].distance + 1;
                G[temp_x][temp_y].priority = calc_priority([temp_x, temp_y], q_goal);
                G[temp_x][temp_y].parent = G[arr[0]][arr[1]];

                minheap_insert(visit_queue, [temp_x, temp_y]);
                draw_2D_configuration([G[temp_x][temp_y].x, G[temp_x][temp_y].y], "queued");
                // if (G[arr[0]][arr[1]].distance + 1 < G[temp_x][temp_y].distance){
                //     G[temp_x][temp_y].distance = G[arr[0]][arr[1]].distance + 1;
                //     G[temp_x][temp_y].parent = G[arr[0]][arr[1]];
                //     G[temp_x][temp_y].priority = calc_priority([temp_x, temp_y], q_goal);
                // }
            }
            else{
                search_iterate = false;
                drawHighlightedPathGraph(G[temp_x][temp_y]);
                return "succeeded";
            }
        }
        else{
            if (G[arr[0]][arr[1]].distance + 1 < G[temp_x][temp_y].distance){
                G[temp_x][temp_y].distance = G[arr[0]][arr[1]].distance + 1;
                G[temp_x][temp_y].parent = G[arr[0]][arr[1]];
                G[temp_x][temp_y].priority = calc_priority([temp_x, temp_y], q_goal);
            }
        }
    }
    return "null";
}

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
        console.log("start");
        if (visit_queue.length == 0){ 
            search_iterate = false;
            return "failed";
        }
        var arr = minheap_extract(visit_queue);
        draw_2D_configuration([G[arr[0]][arr[1]].x, G[arr[0]][arr[1]].y], "visited");
        G[arr[0]][arr[1]].visited = true;
        search_visited++;
        console.log("visit");
        // console.log(arr);
        
        //east
        var temp_x = arr[0] + 1;
        var temp_y = arr[1];
        var ret = checkNode(arr, temp_x, temp_y);
        if (ret == "succeeded") return ret;

        //south
        temp_x = arr[0];
        temp_y = arr[1] - 1;
        ret = checkNode(arr, temp_x, temp_y);
        if (ret == "succeeded") return ret;

        //west
        temp_x = arr[0] - 1;
        temp_y = arr[1];
        ret = checkNode(arr, temp_x, temp_y);
        if (ret == "succeeded") return ret;

        //north 
        temp_x = arr[0];
        temp_y = arr[1] + 1;
        ret = checkNode(arr, temp_x, temp_y);
        if (ret == "succeeded") return ret;

        return "iterating";
    //}

}

//////////////////////////////////////////////////
/////     MIN HEAP IMPLEMENTATION FUNCTIONS
//////////////////////////////////////////////////

    // STENCIL: implement min heap functions for graph search priority queue.
    //   These functions work use the 'priority' field for elements in graph.


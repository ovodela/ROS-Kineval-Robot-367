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
    return heap[index - 1][2];
}

function swap(heap, index1, index2){
    var temp = heap[index1 - 1];
    heap[index1 - 1] = heap[index2 - 1];
    heap[index2 - 1] = temp;
}

function shiftUp(heap){
    var index = heap.length;
    
    while (index > 1 && (getElement(heap, math.floor(index / 2)) > getElement(heap, index))){ // 2 > 1
        swap(heap, index, math.floor(index / 2));
        index = math.floor(index / 2);
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
            if (ypos == 0 && xpos == 0){
                G[iind][jind].queued = true;
                G[iind][jind].distance = 0;
                G[iind][jind].priority = 1;
                G[iind][jind].parent = G[iind][jind];
                minheap_insert(visit_queue, [iind, jind, G[iind][jind].priority]);
            }
        }
    }
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
        var arr = visit_queue.minheap_extract(visit_queue);
        G[arr[0]][arr[1]].visited = true;
        
        if (!G[arr[0]][arr[1] - 1].visited && testCollision(G[arr[0]][arr[1] - 1].x, G[arr[0]][arr[1] - 1].y)){
            G[arr[0]][arr[1] - 1].parent = G[arr[0]][arr[1]];
            G[arr[0]][arr[1] - 1].visited = true;

            if(!G[arr[0]][arr[1] - 1] != goal){
                G[arr[0]][arr[1] - 1].distance = G[arr[0]][arr[1]].distance + 1;
                // G[arr[0]][arr[1] - 1].parent = G[arr[0]][arr[1]];
                G[arr[0]][arr[1] - 1].queued = true;
                G[arr[0]][arr[1] - 1].priority = calc_distance(G[arr[0]][arr[1] - 1], _____);
                minheap_insert(visit_queue, [arr[0], arr[1] - 1, G[arr[0]][arr[1] - 1].priority]);
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


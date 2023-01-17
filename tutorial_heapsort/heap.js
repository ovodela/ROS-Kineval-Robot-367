/*|\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\
|\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/|
||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/
/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\

    Heap Sort Stencil | JavaScript support functions

    Quick JavaScript Code-by-Example Tutorial 
     
    @author ohseejay / https://github.com/ohseejay
                     / https://bitbucket.org/ohseejay

    Chad Jenkins
    Laboratory for Perception RObotics and Grounded REasoning Systems
    University of Michigan

    License: Michigan Honor License 

|\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/|
||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/
/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\
\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/*/


// create empty object 
minheaper = {}; 

//helper

function getElement(heap, index){
    return heap[index - 1];
}

function swap(heap, index1, index2){
    var temp = heap[index1 - 1];
    heap[index1 - 1] = heap[index2 - 1];
    heap[index2 - 1] = temp;
}

function shiftUp(heap){
    var index = heap.length;
    // console.log("    shiftUp");
    while (index > 1 && (getElement(heap, Math.floor(index / 2)) > getElement(heap, index))){ // 2 > 1
        // console.log("    inside while loop");
        swap(heap, index, Math.floor(index / 2));

        // console.log("   swapped");
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

// define insert function for min binary heap
function minheap_insert(heap, new_element) {
    //from lab
    // var elementIdx = heap.length;
    // var prntIdx = math.floor((elementIdx - 1) / 2);

    // heap.push(new_element);

    // var heaped = (elementIdx <= 0) || (heap[prntIdx] <= heap[elementIdx]);
    
    // while (!heaped){
    //     var tmp = heap[prntIdx];
    //     heap[prntIdx] = heap[elementIdx];
    //     heap[elementIdx] = tmp;

    //     elementIdx = prntIdx;
    //     prntIdx = math.floor((elementIdx - 1) / 2);

    //     heaped = (elementIdx <= 0) || (heap[prntIdx] <= heap[elementIdx]);
    // }

    // STENCIL: implement your min binary heap insert operation
    heap.push(new_element);
    shiftUp(heap);
}

// assign insert function within minheaper object
minheaper.insert = minheap_insert;
/* Note: because the minheap_insert function is an object, we can assign 
      a reference to the function within the minheap object, which can be called
      as minheap.insert
*/

// define extract function for min binary heap
function minheap_extract(heap) {
    // STENCIL: implement your min binary heap extract operation
    var popped = heap[0];
    heap[0] = heap[heap.length - 1];
    heap.pop();
    shiftDown(heap, 1);
    return popped;
}

// assign extract function within minheaper object
minheaper.extract = minheap_extract;
    // STENCIL: ensure extract method is within minheaper object







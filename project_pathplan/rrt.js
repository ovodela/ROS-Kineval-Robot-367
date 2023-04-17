/*|\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\
|\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/|
||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/
/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\

    2D Path Planning in HTML5 Canvas | RRT Methods

    Stencil methods for student implementation of RRT-based search.

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

function iterateRRT() {


    // STENCIL: implement a single iteration of an RRT algorithm.
    //   An asynch timing mechanism is used instead of a for loop to avoid
    //   blocking and non-responsiveness in the browser.
    //
    //   Return "failed" if the search fails on this iteration.
    //   Return "succeeded" if the search succeeds on this iteration.
    //   Return "extended" otherwise.
    //
    //   Provided support functions:
    //
    //   testCollision - returns whether a given configuration is in collision
    //   insertTreeVertex - adds and displays new configuration vertex for a tree
    //   insertTreeEdge - adds and displays new tree edge between configurations
    //   drawHighlightedPath - renders a highlighted path in a tree
}

var main_q;

function iterateRRTConnect() {


    // STENCIL: implement a single iteration of an RRT-Connect algorithm.
    //   An asynch timing mechanism is used instead of a for loop to avoid
    //   blocking and non-responsiveness in the browser.
    //
    //   Return "failed" if the search fails on this iteration.
    //   Return "succeeded" if the search succeeds on this iteration.
    //   Return "extended" otherwise.
    //
    //   Provided support functions:
    //
    //   testCollision - returns whether a given configuration is in collision
    //   insertTreeVertex - adds and displays new configuration vertex for a tree
    //   insertTreeEdge - adds and displays new tree edge between configurations
    //   drawHighlightedPath - renders a highlighted path in a tree

    if(extendRRT(T_a, randomConfig()) != "failed"){
        if(connectRRT(T_b, main_q) == "succeeded"){
            search_iterate = false;
            
            var p_1 = makePath(T_a);
            var p_2 = makePath(T_b);
           
            drawHighlightedPath(p_1);
            drawHighlightedPath(p_2);
            return "succeeded";
        }
    }

    //switch
    var temp;
    temp = T_a;
    T_a = T_b;
    T_b = temp;

    return "extended"
    
}

function iterateRRTStar() {

}

//////////////////////////////////////////////////
/////     RRT IMPLEMENTATION FUNCTIONS
//////////////////////////////////////////////////

    // STENCIL: implement RRT-Connect functions here, such as:
    //   extendRRT
    //   connectRRT
    //   randomConfig
    //   newConfig
    //   findNearestNeighbor
    //   dfsPath

    function extendRRT(T, q){
        var q_near = findNearestNeighbor(T,q)[1];
        var q_near_id = findNearestNeighbor(T,q)[0];
        
        main_q = newConfig(q, q_near_id);

        if(testCollision(main_q)){
            return "failed";
        }

        insertTreeVertex(T, main_q);
        insertTreeEdge(T, q_near, T.newest);
        T.vertices[T.newest].parent = q_near;

        if((Math.abs(main_q[0]- q[0]) < eps/2) && (Math.abs(main_q[1]-q[1]) < eps/2)){
            return "succeeded";
        }
        else{
            return "extended";
        }
    
    }


    function connectRRT(T, q){
        var result = extendRRT(T, q);

        while (result == "extended"){
            result = extendRRT(T, q);
        }

        return result;
    }

    function randomConfig(){
        return [(Math.random() * 9) - 2 ,(Math.random() * 9) - 2];
    }
    

    function newConfig(q1, q2){
        var t_1 = Math.pow((q1[0] - q2[0]) , 2);
        var t_2 = Math.pow((q1[1] - q2[1]) , 2);
        var dist = Math.sqrt(t_1 + t_2);
        
        var x = (q1[0] - q2[0]) / dist;
        var y = (q1[1] - q2[1]) / dist;
    
        return [(q2[0] + eps * x), (q2[1] + eps * y)];
    }    

    function findNearestNeighbor(T,q){
        var min = Math.pow(10,15);
        var q_dist;
        var result = new Array(2);

        for(var i = 0; i < T.vertices.length; i++){
            q_dist = Math.sqrt(Math.pow((T.vertices[i].vertex[0] - q[0]),2) + Math.pow((T.vertices[i].vertex[1] - q[1]),2));
            
            if(q_dist < min){
                min = q_dist;
                result[0] = T.vertices[i].vertex;
                result[1] = i;
            }
        }

        return result;
    }
    
    function makePath(T){
        var result = [];
        var cur_node = T.vertices[T.newest];
        var flag = true;
    
        while(flag){
            result.push(cur_node);
            cur_node = cur_node.edges[0];

            if(cur_node.vertex[0] == q_init[0] || cur_node.vertex[0] == q_goal[0]){
                if(cur_node.vertex[1] == q_init[1] || cur_node.vertex[1] == q_goal[1]){
                    result.push(cur_node);
                    flag = false;
                }
            }
        }

        return result;
    }

    

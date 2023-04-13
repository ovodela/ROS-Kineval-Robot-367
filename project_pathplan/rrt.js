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
        var rrtExtendResult = [];

        if (newConfig(q,q_near)){
            var q_new = newConfig(q,q_near);
            var added_vertex = tree_add_vertex(T, q_new);
            tree_add_edge(T, q_near_id, T.newest);

            if (dfsPath(q_new, q_goal_config) < step_inter){
                rrtExtendResult=["complete", added_vertex];
            }else if(dfsPath(q_new, q) < step_inter){
                rrtExtendResult=["reached", added_vertex];
            }else{
                rrtExtendResult=["ahead", added_vertex];
            }

        }
        else{
            rrtExtendResult=["struck", T.vertices[0]];
        }

        return rrtExtendResult;
    }


    function connectRRT(T, q){
        var rrtConnectResult = [];
        rrtConnectResult[0] = "ahead"

        while(rrtConnectResult[0] === "ahead"){
            rrtConnectResult = extendRRT(T, q);
            //console.log(rrtConnectResult);
        }

        return rrtConnectResult;
    }


    function rrt_star_extend(T, q){
        var rrtStarExtendResult=[];

        if (step_inter/3>Math.random()){
            q = q_goal_config;
        }

        var q_near = findNearestNeighbor(T,q)[1];

        if (newConfig(q,q_near)){
            var q_new = newConfig(q,q_near);
            var added_vertex = tree_add_vertex(T, q_new);
            var neighborList = nearest_star_neighbor(T,q_new);
            var tempValue = 2333;
            var tempIdNum = 1;
            var tempParentIdNum = 1;

            for (var i=0; i<neighborList.length; i++){
                if (neighborList[i][0].value < tempValue ){
                    tempIdNum = neighborList[i][1];
                    tempValue = neighborList[i][0].value;
                }tempParentIdNum = tempIdNum; 
            }

            added_vertex.value = T.vertices[tempParentIdNum].value + dfsPath(q_new, T.vertices[tempParentIdNum].vertex);
            tree_add_edge(T, tempParentIdNum, T.newest);
            find_path(T, neighborList, tempParentIdNum, T.newest);

            if (dfsPath(q_new, q) < step_inter){
                rrtStarExtendResult=["reached", added_vertex];
            }
            else{
                rrtStarExtendResult=["ahead", added_vertex];
            }
        }
        else{
            rrtStarExtendResult=["struck", T.vertices[0]];
        }

        return rrtStarExtendResult;
    }
    

    function random_config(){
        var i;
        var q_rand=[];

        for (i=0;i<18;i++){
            q_rand[i]=0;
        }

        q_rand[0] = robot_boundary[0][0]+Math.random()*(robot_boundary[1][0] - robot_boundary[0][0]);
        q_rand[1] = robot.origin.xyz[1];
        q_rand[2] = robot_boundary[0][2]+Math.random()*(robot_boundary[1][2] - robot_boundary[0][2]);
        q_rand[4] = 2*(Math.random()-0.5)*Math.PI;

        for (var x in robot.joints){
            if (robot.joints[x].limit === undefined){
                q_rand[q_names[x]] = 2*(Math.random()-0.5)*Math.PI;
            }else if (robot.joints[x].limit !== undefined){
                q_rand[q_names[x]] = robot.joints[x].limit.lower+Math.random()*(robot.joints[x].limit.upper-robot.joints[x].limit.lower);
            }        
            if (robot.joints[x].type === "fixed"){
                q_rand[q_names[x]] = 0;
            }
        }

        return q_rand;
    }
    

    function newConfig(q1, q2){
        var qDiff = vec_minus(q1,q2);
        var qResult = [];

        for (var j=0; j<q1.length; j++){
            qResult.push(q2[j] + step_inter/dfsPath(q1, q2)*qDiff[j]);
        }
        
        if (kineval.poseIsCollision(qResult)){
            return false;
        }

        return qResult;
    }    

    function findNearestNeighbor(T,q){
        var q_num;
        var tempDist = 2333;

        for (var i=0; i<T.vertices.length; i++){
            if (dfsPath(q, T.vertices[i].vertex) < tempDist){
                q_num = i;
                tempDist = dfsPath(q, T.vertices[i].vertex);
            }
        }

        return [q_num,T.vertices[q_num].vertex]
    }
    
    function nearest_star_neighbor(T,q){
        var neighborList = []
        
        for (var i=0; i<T.vertices.length - 1; i++){
            if (1.1*step_inter>dfsPath(q, T.vertices[i].vertex)){
                neighborList.push([T.vertices[i], i])
            }
        }

        return neighborList;
    }
    


    function find_path(Tree, neighborList, qIdNum, qNewIdNum){
        for (var i=0;i<neighborList.length;++i){
            if (neighborList[i][1] !== qIdNum){
                var tempValue = Tree.vertices[qNewIdNum].value + dfsPath(Tree.vertices[qNewIdNum].vertex, Tree.vertices[neighborList[i][1]].vertex);
                
                if (Tree.vertices[neighborList[i][1]].value>tempValue){
                    Tree.vertices[neighborList[i][1]].value = tempValue;
                    var tempVertex = Tree.vertices[neighborList[i][1]];
                    var tempEdge = tempVertex.edges[0];
                    
                    for (var j=0; j<tempEdge.edges.length; j++){
                        if ( tempEdge.edges[j].idNum ==  tempVertex.idNum){
                            //console.log(tempEdge.edges[j]);
                        }
                    }
                    
                    tempEdge.edges.splice(j,1);
                    //console.log(tempEdge.edges);
                    tempVertex.edges.shift();
                    //console.log(tempEdge.edges);
                    Tree.vertices[qNewIdNum].edges.push(tempVertex);
                    tempVertex.edges.unshift(Tree.vertices[qNewIdNum]);
                }
            }
        }
    }
    
    
    
    function dfsPath(q1, q2){
        return Math.pow( Math.pow( (q1[0] - q2[0]), 2 ) + Math.pow( (q1[2] - q2[2]), 2 ) + Math.pow( (q1[4] - q2[4]), 2 )/5, 0.5 );
    }
    

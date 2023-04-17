
/*-- |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/|

    KinEval | Kinematic Evaluator | RRT motion planning

    Implementation of robot kinematics, control, decision making, and dynamics 
        in HTML5/JavaScript and threejs
     
    @author ohseejay / https://github.com/ohseejay / https://bitbucket.org/ohseejay

    Chad Jenkins
    Laboratory for Perception RObotics and Grounded REasoning Systems
    University of Michigan

    License: Creative Commons 3.0 BY-SA

|\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| --*/

//////////////////////////////////////////////////
/////     RRT MOTION PLANNER
//////////////////////////////////////////////////

// STUDENT: 
// compute motion plan and output into robot_path array 
// elements of robot_path are vertices based on tree structure in tree_init() 
// motion planner assumes collision checking by kineval.poseIsCollision()

/* KE 2 : Notes:
   - Distance computation needs to consider modulo for joint angles
   - robot_path[] should be used as desireds for controls
   - Add visualization of configuration for current sample
   - Add cubic spline interpolation
   - Add hook for random configuration
   - Display planning iteration number in UI
*/

/*
STUDENT: reference code has functions for:

*/

kineval.planMotionRRTConnect = function motionPlanningRRTConnect() {

    // exit function if RRT is not implemented
    //   start by uncommenting kineval.robotRRTPlannerInit 
    if (typeof kineval.robotRRTPlannerInit === 'undefined') return;

    if ((kineval.params.update_motion_plan) && (!kineval.params.generating_motion_plan)) {
        kineval.robotRRTPlannerInit();
        kineval.params.generating_motion_plan = true;
        kineval.params.update_motion_plan = false;
        kineval.params.planner_state = "initializing";
    }
    if (kineval.params.generating_motion_plan) {
        rrt_result = robot_rrt_planner_iterate();
        if (rrt_result === "reached") {
            kineval.params.update_motion_plan = false; // KE T needed due to slight timing issue
            kineval.params.generating_motion_plan = false;
            textbar.innerHTML = "planner execution complete";
            kineval.params.planner_state = "complete";
        }
        else kineval.params.planner_state = "searching";
    }
    else if (kineval.params.update_motion_plan_traversal||kineval.params.persist_motion_plan_traversal) {

        if (kineval.params.persist_motion_plan_traversal) {
            kineval.motion_plan_traversal_index = (kineval.motion_plan_traversal_index+1)%kineval.motion_plan.length;
            textbar.innerHTML = "traversing planned motion trajectory";
        }
        else
            kineval.params.update_motion_plan_traversal = false;

        // set robot pose from entry in planned robot path
        robot.origin.xyz = [
            kineval.motion_plan[kineval.motion_plan_traversal_index].vertex[0],
            kineval.motion_plan[kineval.motion_plan_traversal_index].vertex[1],
            kineval.motion_plan[kineval.motion_plan_traversal_index].vertex[2]
        ];

        robot.origin.rpy = [
            kineval.motion_plan[kineval.motion_plan_traversal_index].vertex[3],
            kineval.motion_plan[kineval.motion_plan_traversal_index].vertex[4],
            kineval.motion_plan[kineval.motion_plan_traversal_index].vertex[5]
        ];

        // KE 2 : need to move q_names into a global parameter
        for (x in robot.joints) {
            robot.joints[x].angle = kineval.motion_plan[kineval.motion_plan_traversal_index].vertex[q_names[x]];
        }

    }
}


    // STENCIL: uncomment and complete initialization function
kineval.robotRRTPlannerInit = function robot_rrt_planner_init() {

    // form configuration from base location and joint angles
    q_start_config = [
        robot.origin.xyz[0],
        robot.origin.xyz[1],
        robot.origin.xyz[2],
        robot.origin.rpy[0],
        robot.origin.rpy[1],
        robot.origin.rpy[2]
    ];

    q_names = {};  // store mapping between joint names and q DOFs
    q_index = [];  // store mapping between joint names and q DOFs

    for (x in robot.joints) {
        q_names[x] = q_start_config.length;
        q_index[q_start_config.length] = x;
        q_start_config = q_start_config.concat(robot.joints[x].angle);
    }

    // set goal configuration as the zero configuration
    var i; 
    q_goal_config = new Array(q_start_config.length);
    for (i=0;i<q_goal_config.length;i++) q_goal_config[i] = 0;

    // flag to continue rrt iterations
    rrt_iterate = true;
    rrt_iter_count = 0;

    // make sure the rrt iterations are not running faster than animation update
    cur_time = Date.now();
}



function robot_rrt_planner_iterate() {

    var i;
    rrt_alg = 1;  // 0: basic rrt (OPTIONAL), 1: rrt_connect (REQUIRED)

    if (rrt_iterate && (Date.now()-cur_time > 10)) {
        cur_time = Date.now();

    // STENCIL: implement single rrt iteration here. an asynch timing mechanism 
    //   is used instead of a for loop to avoid blocking and non-responsiveness 
    //   in the browser.
    //
    //   once plan is found, highlight vertices of found path by:
    //     tree.vertices[i].vertex[j].geom.material.color = {r:1,g:0,b:0};
    //
    //   provided support functions:
    //
    //   kineval.poseIsCollision - returns if a configuration is in collision
    //   tree_init - creates a tree of configurations
    //   tree_add_vertex - adds and displays new configuration vertex for a tree
    //   tree_add_edge - adds and displays new tree edge between configurations

        if (rrt_alg == 1){
            step_inter = 0.6;
            
            //run rrt_extend
            var rrtExtendResult = rrt_extend(T1, random_config());

            //when trapped move back
            if(rrtExtendResult[0] !== "trapped"){
                rrtConnectResult = rrt_connect(T2, rrtExtendResult[1].vertex);

                if ( rrtConnectResult[0] === "reached"){
                    var tempVertex = rrtConnectResult[1];
                    pathList2 = [tempVertex];
                    var flagOrder = 0;

                    while (path_dfs(tempVertex.vertex, T2.vertices[0].vertex)>step_inter*0.8){
                        tempVertex.geom.material.color = {r:1,g:0,b:0};

                        if( path_dfs(T2.vertices[0].vertex, q_start_config)>=step_inter/5){
                            pathList2.push(tempVertex.edges[0]);
                        }else{
                            flagOrder = 2;
                            pathList2.unshift(tempVertex.edges[0]);
                        }
                        tempVertex = tempVertex.edges[0];
                    }

                    var tempVertex = rrtExtendResult[1];
                    pathList1 = [tempVertex];

                    while (path_dfs(tempVertex.vertex, T1.vertices[0].vertex)>step_inter*0.8){
                        tempVertex.geom.material.color = {r:1,g:0,b:0};

                        if( path_dfs(T1.vertices[0].vertex, q_start_config)>=step_inter/5){
                        pathList1.push(tempVertex.edges[0]); 
                        }else{
                            flagOrder = 1;
                            pathList1.unshift(tempVertex.edges[0]);
                        }
                        tempVertex = tempVertex.edges[0];
                    }

                    if (flagOrder == 1){
                        pathList = pathList1.concat(pathList2);
                    }else if(flagOrder == 2){
                        pathList = pathList2.concat(pathList1);
                    }

                    kineval.motion_plan = pathList;
                    return "reached";
                }
            }

            tempT = T2;
            T2 = T1;
            T1 = tempT;

        }
        else if( rrt_alg == 2 ){
            step_inter = 0.9;
            tempVertex = rrt_star_extend(T1, random_config())[1]; 

            if (path_dfs(q_goal_config, tempVertex.vertex) < step_inter*0.5){
                pathList = [tempVertex];

                while( path_dfs(tempVertex.vertex, q_start_config) >step_inter*0.8){
                    tempVertex.geom.material.color = {r:1,g:0,b:0};
                    pathList.push(tempVertex.edges[0])
                    tempVertex = tempVertex.edges[0]
                }

                kineval.motion_plan = pathList;
                return "reached";
            }

        }
        else if (rrt_alg ==0) {
            step_inter = 0.8;
            tempVertex = rrt_extend(T1, random_config())[1]; 

            if (path_dfs(q_goal_config, tempVertex.vertex) < step_inter*0.8){
                pathList = [tempVertex];

                while( path_dfs(tempVertex.vertex, q_start_config) > step_inter*0.5){
                    tempVertex.geom.material.color = {r:1,g:0,b:0};
                    pathList.push(tempVertex.edges[0]);
                    tempVertex = tempVertex.edges[0];
                }

                kineval.motion_plan = pathList;
                return "reached";
            }   
        }  
    }

}

//////////////////////////////////////////////////
/////     STENCIL SUPPORT FUNCTIONS
//////////////////////////////////////////////////

function tree_init(q) {

    // create tree object
    var tree = {};

    // initialize with vertex for given configuration
    tree.vertices = [];
    tree.vertices[0] = {};
    tree.vertices[0].vertex = q;
    tree.vertices[0].edges = [];

    // create rendering geometry for base location of vertex configuration
    add_config_origin_indicator_geom(tree.vertices[0]);

    // maintain index of newest vertex added to tree
    tree.newest = 0;

    return tree;
}

function tree_add_vertex(tree,q) {


    // create new vertex object for tree with given configuration and no edges
    var new_vertex = {};
    new_vertex.edges = [];
    new_vertex.vertex = q;

    // create rendering geometry for base location of vertex configuration
    add_config_origin_indicator_geom(new_vertex);

    // maintain index of newest vertex added to tree
    tree.vertices.push(new_vertex);
    tree.newest = tree.vertices.length - 1;
}

function add_config_origin_indicator_geom(vertex) {

    // create a threejs rendering geometry for the base location of a configuration
    // assumes base origin location for configuration is first 3 elements 
    // assumes vertex is from tree and includes vertex field with configuration

    temp_geom = new THREE.CubeGeometry(0.1,0.1,0.1);
    temp_material = new THREE.MeshLambertMaterial( { color: 0xffff00, transparent: true, opacity: 0.7 } );
    temp_mesh = new THREE.Mesh(temp_geom, temp_material);
    temp_mesh.position.x = vertex.vertex[0];
    temp_mesh.position.y = vertex.vertex[1];
    temp_mesh.position.z = vertex.vertex[2];
    scene.add(temp_mesh);
    vertex.geom = temp_mesh;
}


function tree_add_edge(tree,q1_idx,q2_idx) {

    // add edge to first vertex as pointer to second vertex
    tree.vertices[q1_idx].edges.push(tree.vertices[q2_idx]);

    // add edge to second vertex as pointer to first vertex
    tree.vertices[q2_idx].edges.push(tree.vertices[q1_idx]);

    // can draw edge here, but not doing so to save rendering computation
}

//////////////////////////////////////////////////
/////     RRT IMPLEMENTATION FUNCTIONS
//////////////////////////////////////////////////


    // STENCIL: implement RRT-Connect functions here, such as:
    //   rrt_extend
    //   rrt_connect
    //   random_config
    //   new_config
    //   nearest_neighbor
    //   normalize_joint_state
    //   find_path
    //   path_dfs

    function rrt_extend(T, q){
        var q_near = nearest_neighbor(T,q)[1];
        var q_near_id = nearest_neighbor(T,q)[0];
        var rrtExtendResult = [];

        if (new_config(q,q_near)){
            var q_new = new_config(q,q_near);
            var added_vertex = tree_add_vertex(T, q_new);
            tree_add_edge(T, q_near_id, T.newest);

            if (path_dfs(q_new, q_goal_config) < step_inter){
                rrtExtendResult=["complete", added_vertex];
            }else if(path_dfs(q_new, q) < step_inter){
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


    function rrt_connect(T, q){
        var rrtConnectResult = [];
        rrtConnectResult[0] = "ahead"

        while(rrtConnectResult[0] === "ahead"){
            rrtConnectResult = rrt_extend(T, q);
            //console.log(rrtConnectResult);
        }

        return rrtConnectResult;
    }


    function rrt_star_extend(T, q){
        var rrtStarExtendResult=[];

        if (step_inter/3>Math.random()){
            q = q_goal_config;
        }

        var q_near = nearest_neighbor(T,q)[1];

        if (new_config(q,q_near)){
            var q_new = new_config(q,q_near);
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

            added_vertex.value = T.vertices[tempParentIdNum].value + path_dfs(q_new, T.vertices[tempParentIdNum].vertex);
            tree_add_edge(T, tempParentIdNum, T.newest);
            find_path(T, neighborList, tempParentIdNum, T.newest);

            if (path_dfs(q_new, q) < step_inter){
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
    

    function new_config(q1, q2){
        var qDiff = vec_minus(q1,q2);
        var qResult = [];

        for (var j=0; j<q1.length; j++){
            qResult.push(q2[j] + step_inter/path_dfs(q1, q2)*qDiff[j]);
        }
        
        if (kineval.poseIsCollision(qResult)){
            return false;
        }

        return qResult;
    }    

    function nearest_neighbor(T,q){
        var q_num;
        var tempDist = 2333;

        for (var i=0; i<T.vertices.length; i++){
            if (path_dfs(q, T.vertices[i].vertex) < tempDist){
                q_num = i;
                tempDist = path_dfs(q, T.vertices[i].vertex);
            }
        }

        return [q_num,T.vertices[q_num].vertex]
    }
    
    function nearest_star_neighbor(T,q){
        var neighborList = []
        
        for (var i=0; i<T.vertices.length - 1; i++){
            if (1.1*step_inter>path_dfs(q, T.vertices[i].vertex)){
                neighborList.push([T.vertices[i], i])
            }
        }

        return neighborList;
    }
    


    function find_path(Tree, neighborList, qIdNum, qNewIdNum){
        for (var i=0;i<neighborList.length;++i){
            if (neighborList[i][1] !== qIdNum){
                var tempValue = Tree.vertices[qNewIdNum].value + path_dfs(Tree.vertices[qNewIdNum].vertex, Tree.vertices[neighborList[i][1]].vertex);
                
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
    
        
        
        function path_dfs(q1, q2){
            return Math.pow( Math.pow( (q1[0] - q2[0]), 2 ) + Math.pow( (q1[2] - q2[2]), 2 ) + Math.pow( (q1[4] - q2[4]), 2 )/5, 0.5 );
        }
        


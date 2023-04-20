
/*-- |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/|

    KinEval | Kinematic Evaluator | inverse kinematics

    Implementation of robot kinematics, control, decision making, and dynamics 
        in HTML5/JavaScript and threejs
     
    @author ohseejay / https://github.com/ohseejay / https://bitbucket.org/ohseejay

    Chad Jenkins
    Laboratory for Perception RObotics and Grounded REasoning Systems
    University of Michigan

    License: Creative Commons 3.0 BY-SA

|\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| --*/

kineval.robotInverseKinematics = function robot_inverse_kinematics(endeffector_target_world, endeffector_joint, endeffector_position_local) {

    // compute joint angle controls to move location on specified link to Cartesian location
    if ((kineval.params.update_ik)||(kineval.params.persist_ik)) { 
        // if update requested, call ik iterator and show endeffector and target
        kineval.iterateIK(endeffector_target_world, endeffector_joint, endeffector_position_local);
        if (kineval.params.trial_ik_random.execute)
            kineval.randomizeIKtrial();
        else // KE: this use of start time assumes IK is invoked before trial
            kineval.params.trial_ik_random.start = new Date();
    }

    kineval.params.update_ik = false; // clear IK request for next iteration
}

kineval.randomizeIKtrial = function randomIKtrial () {

    // update time from start of trial
    cur_time = new Date();
    kineval.params.trial_ik_random.time = cur_time.getTime()-kineval.params.trial_ik_random.start.getTime();

    // STENCIL: see instructor for random time trial code
    // cur_time = new Date();
    // kineval.params.trial_ik_random.time = cur_time.getTime()-kineval.params.trial_ik_random.start.getTime();

        // find the positino of tthe eneffector in the world
        endeffector_world = matrix_multiply(robot.joints[robot.endeffector.frame].xform,robot.endeffector.position);
    
        // calculate distance of target fromt the endeffector
        kineval.params.trial_ik_random.distance_current = Math.sqrt( Math.pow(kineval.params.ik_target.position[0][0] - endeffector_world[0][0], 2.0) + Math.pow(kineval.params.ik_target.position[1][0] - endeffector_world[1][0], 2.0) + Math.pow(kineval.params.ik_target.position[2][0] - endeffector_world[2][0], 2.0) );
    
        // reached the end
        if (kineval.params.trial_ik_random.distance_current < 0.01) {
            textbar.innerHTML = "IK trial Random: target " + kineval.params.trial_ik_random.targets + " reached at time " + kineval.params.trial_ik_random.time;

            kineval.params.trial_ik_random.targets += 1;

            kineval.params.ik_target.position[0][0] = 1.2 * (Math.random() - 0.5);
            kineval.params.ik_target.position[1][0] = 1.2 * (Math.random() - 0.5) + 1.5;
            kineval.params.ik_target.position[2][0] = 0.7 * (Math.random() - 0.5) + 0.5;
        }
}

kineval.iterateIK = function iterate_inverse_kinematics(endeffector_target_world, endeffector_joint, endeffector_position_local) {

    // STENCIL: implement inverse kinematics iteration

    // [NOTICE]: Please assign the following 3 variables to test against CI grader

    // ---------------------------------------------------------------------------
    robot.dx = []              // Error term, matrix size: 6 x 1, e.g., [[1],[1],[1],[0],[0],[0]]
    robot.jacobian = []        // Jacobian matrix of current IK iteration matrix size: 6 x N
    robot.dq = []              // Joint configuration change term (don't include step length)  
    // ---------------------------------------------------------------------------

    // Explanation of above 3 variables:
    // robot.dq = T(robot.jacobian) * robot.dx  // where T(robot.jacobian) means apply some transformations to the Jacobian matrix, it could be Transpose, PseudoInverse, etc.
    // dtheta = alpha * robot.dq   // alpha: step length

    for(let i = 0; i < 6; i++)
        robot.dx[i] = [0]; 
    
    var current_joint = endeffector_joint;
    var array_of_joints = [];
    array_of_joints.unshift(current_joint);
    while(robot.joints[current_joint].parent != robot.base){
        let link = robot.joints[current_joint].parent;
        current_joint = robot.links[link].parent;
        array_of_joints.unshift(current_joint);
    }
    
    var mult_p = matrix_multiply(robot.joints[endeffector_joint].xform, endeffector_position_local);


    var r1 = [];
    var r2 = [];
    var r3 = [];
    var r4 = [];
    var r5 = [];
    var r6 = [];

    for(var i = 0; i < array_of_joints.length; i++){
        let temp_W = [];
        let t_2 = [];
        let name = array_of_joints[i];

        let termS = [[robot.joints[name].axis[0]], [robot.joints[name].axis[1]], [robot.joints[name].axis[2]], [1]];
        let ki = matrix_multiply(robot.joints[name].xform, termS);
        let oi = matrix_multiply(robot.joints[name].xform, [[0],[0],[0],[1]]);

        temp_W.push(ki[0][0] - oi[0][0]);
        temp_W.push(ki[1][0] - oi[1][0]);
        temp_W.push(ki[2][0] - oi[2][0]);

        t_2.push(mult_p[0][0] - oi[0][0]);
        t_2.push(mult_p[1][0] - oi[1][0]);
        t_2.push(mult_p[2][0] - oi[2][0]);

        let temp_V = vector_cross(temp_W, t_2);
        
        r1.push(temp_V[0]);
        r2.push(temp_V[1]);
        r3.push(temp_V[2]);
        r4.push(temp_W[0]);
        r5.push(temp_W[1]);
        r6.push(temp_W[2]);
        
    }

    robot.jacobian = [r1, r2, r3, r4, r5, r6];

    if(kineval.params.ik_pseudoinverse){
        robot.dq = matrix_multiply(matrix_pseudoinverse(robot.jacobian), robot.dx);
    } 
    else {
        robot.dq = matrix_multiply(matrix_transpose(robot.jacobian), robot.dx);
    } 

    for(var i = 0; i < array_of_joints.length ; i++){
        robot.joints[array_of_joints[i]].control = kineval.params.ik_steplength * robot.dq[i];
    }
}



// function xTransTheta(xf){
    
//     let theta_1 = [Math.atan2(xf[2][1], xf[2][2])];
//     let theta_3 = [Math.atan2(xf[1][0], xf[0][0])];

//     let temp = Math.pow(xf[2][1], 2) + Math.pow(xf[2][2], 2);
//     temp = Math.pow(temp, 0.5);
//     let theta_2 = [Math.atan2(-xf[2][0], temp)];
    
//     return [theta_1,theta_2,theta_3];
// }

// function vec_multiply(m1, v1){
//     var v = [];
//     var i;
//     var j;
//     v1 = [v1[0], v1[1], v1[2], 0];
//     for (i = 0; i < m1.length; ++i){
//         v[i] = 0;
//         for (j = 0; j < m1[0].length; ++j){
//             v[i] += m1[i][j] * v1[j];
//         }
//     }
//     v = [v[0], v[1], v[2]];
//     return v;
// }

// function vec_minus(v1, v2) {
//     var v = [];
//     for (i = 0; i < v1.length; ++i) {
//         v[i] = v1[i] - v2[i];
//     }
//     return v;
// }


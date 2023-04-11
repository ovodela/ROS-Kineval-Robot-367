
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


    var endeXYZ = matrix_multiply(robot.joints[endeffector_joint].xform, endeffector_position_local);
    var endeRPY = xTransTheta(robot.joints[endeffector_joint].xform);
    var vec = [];
    for (var i = 0; i < 3; i++){
        vec[i] = [endeXYZ[i][0]];
        vec[i+3] = [endeRPY[i][0]];
    }

    for (var i = 0; i < 6; i++){
        if (i < 3){
            robot.dx[i] = [endeffector_target_world.position[i] - vec[i][0]];
        }
        else{
            if (kineval.params.ik_orientation_included){
                robot.dx[i] = [endeffector_target_world.orientation[i-3] - vec[i][0]];
            }
            else{
                robot.dx[i] = [0];
            }
        }
    }

    var index = 0;
    var curJoint = endeffector_joint;
    
    var flag = true;
    while (flag){
        var tempAxis = vec_multiply(robot.joints[curJoint].xform,robot.joints[curJoint].axis)
        tempAxis = vector_normalize(tempAxis);
        if (robot.joints[curJoint].type === "prismatic"){
            robot.jacobian[index] = [tempAxis[0], tempAxis[1], tempAxis[2], 0, 0, 0];
        }else{
            var jointXYZ = matrix_multiply(robot.joints[curJoint].xform, [[0],[0],[0],[1]]);
            var diffJointXYZ = vec_minus(endeXYZ,jointXYZ);
            let temp_cross = vector_cross(tempAxis, diffJointXYZ);
            robot.jacobian[index] = [temp_cross[0], temp_cross[1], temp_cross[2], tempAxis[0], tempAxis[1], tempAxis[2]];
        }
        if (robot.joints[curJoint].parent === robot.base){
            flag = false;
        }
        index++;
        curJoint = robot.links[robot.joints[curJoint].parent].parent;
    }

    if (!kineval.params.ik_pseudoinverse){
        robot.dq = matrix_multiply(robot.jacobian, robot.dx);
    }
    else{
        var Tjacob = matrix_transpose(robot.jacobian);
        robot.dq = matrix_multiply(matrix_pseudoinverse(Tjacob), robot.dx);
    }

    flag = true;
    index = 0;
    curJoint = endeffector_joint;
    while (flag){
        robot.joints[curJoint].control += kineval.params.ik_steplength * robot.dq[index][0];
        index++;
        if (robot.joints[curJoint].parent === robot.base){
            flag = false;
        }
        curJoint = robot.links[robot.joints[curJoint].parent].parent;
    }

}



function xTransTheta(xf){
    
    let theta_1 = [Math.atan2(xf[2][1], xf[2][2])];
    let theta_3 = [Math.atan2(xf[1][0], xf[0][0])];

    let temp = Math.pow(xf[2][1], 2) + Math.pow(xf[2][2], 2);
    temp = Math.pow(temp, 0.5);
    let theta_2 = [Math.atan2(-xf[2][0], temp)];
    
    return [theta_1,theta_2,theta_3];
}

function vec_multiply(m1, v1){
    var v = [];
    var i;
    var j;
    v1 = [v1[0], v1[1], v1[2], 0];
    for (i = 0; i < m1.length; ++i){
        v[i] = 0;
        for (j = 0; j < m1[0].length; ++j){
            v[i] += m1[i][j] * v1[j];
        }
    }
    v = [v[0], v[1], v[2]];
    return v;
}

function vec_minus(v1, v2) {
    var v = [];
    for (i = 0; i < v1.length; ++i) {
        v[i] = v1[i] - v2[i];
    }
    return v;
}


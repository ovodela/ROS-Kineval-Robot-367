
/*-- |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/|

    KinEval | Kinematic Evaluator | forward kinematics

    Implementation of robot kinematics, control, decision making, and dynamics 
        in HTML5/JavaScript and threejs
     
    @author ohseejay / https://github.com/ohseejay / https://bitbucket.org/ohseejay

    Chad Jenkins
    Laboratory for Perception RObotics and Grounded REasoning Systems
    University of Michigan

    License: Creative Commons 3.0 BY-SA

|\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| --*/

kineval.robotForwardKinematics = function robotForwardKinematics () { 

    if (typeof kineval.buildFKTransforms === 'undefined') {
        textbar.innerHTML = "forward kinematics not implemented";
        return;
    }

    // STENCIL: call kineval.buildFKTransforms();
    kineval.buildFKTransforms();
}

    // STENCIL: implement buildFKTransforms, which kicks off
    //   a recursive traversal over links and 
    //   joints starting from base, using following functions: 
    //     traverseFKBase
    //     traverseFKLink
    //     traverseFKJoint
    //
    // To use the keyboard interface, assign the global variables 
    //   "robot_heading" and "robot_lateral", 
    //   which represent the z-axis (heading) and x-axis (lateral) 
    //   of the robot's base in its own reference frame, 
    //   transformed into the world coordinates.
    // The axes should be represented in unit vector form 
    //   as 4x1 homogenous matrices

    //
    // if geometries are imported and using ROS coordinates (e.g., fetch),
    //   coordinate conversion is needed for kineval/threejs coordinates:
    //

    // 


kineval.buildFKTransforms = function buildFKTransforms() {
    // recursive traversal over links and joints starting from base
    traverseFKBase();

}

function generate_rotation_matrix(r,p,y){
    let result = matrix_multiply(matrix_multiply(generate_rotation_matrix_Z(y), generate_rotation_matrix_Y(p)), generate_rotation_matrix_X(r)) ;
    return result;
}

function traverseFKBase() {

    let trans_mat = generate_translation_matrix(robot.origin.xyz[0], robot.origin.xyz[1], robot.origin.xyz[2]);
    let rot_mat = generate_rotation_matrix(robot.origin.rpy[0],robot.origin.rpy[1],robot.origin.rpy[2]);
    robot.links[robot.base].xform = matrix_multiply(trans_mat,rot_mat);

    // if using keyboard interface, transform robot heading and lateral into world coordinates
    let headVec = [[0],[0],[1],[1]];
    let latVec = [[1],[0],[0],[1]];
    robot_heading = matrix_multiply(robot.links[robot.base].xform,headVec);
    robot_lateral = matrix_multiply(robot.links[robot.base].xform,latVec);

    if (robot.links_geom_imported === false) {
        let temp = 100;
    } else{
        robot.links[robot.base].xform = matrix_multiply(robot.links[robot.base].xform, matrix_multiply(generate_rotation_matrix_Y(-Math.PI/2),generate_rotation_matrix_X(-Math.PI/2)));
    }

    for (var  i = 0; i < robot.links[robot.base].children.length; i++){
        traverseFKJoint(robot.links[robot.base].child_joints[i]);
    }

}


function traverseFKLink(link) {
    robot.links[link].xform = robot.joints[robot.links[link].parent].xform;

    if (typeof robot.links[link].child_joints === 'undefined'){
        return;
    }
        
    for (var i = 0; i < robot.links[link].child_joints.length; i++){
        traverseFKJoint(robot.links[link].child_joints[i]);
    }

}

function vector_dot(v1,v2){
    let v = new Array(v1.length);
    for (i = 0; i < v1.length; ++i){
        v[i] = v1[i] * v2[i];
    }
    return v;
}

function rotation_matrix_from_angle_axis(mat, angle, axis){
    //create quaternion
    let quat = [Math.cos(angle / 2), axis[0] * Math.sin(angle / 2), axis[1] * Math.sin(angle / 2), axis[2] * Math.sin(angle / 2)];
    
    //normalize
    var sum = 0;
    var norm = [];
    for (i = 0; i < quat.length; i++){
        sum = sum + quat[i] * quat[i];
    }
    let mag = Math.sqrt(sum);
    for (i = 0; i < quat.length; i++){
        if (Math.abs(mag) < Number.EPSILON){
            norm[i] = quat[i];
        } else {
            nrom[i] = quat[i] / mag;
        }
    }

    //create rotation matrix
    mat[0][0] = norm[0] * norm[0] + norm[1] * norm[1] - norm[2] * norm[2] - norm[3] * norm[3];
    mat[0][1] = 2 * (norm[1] * norm[2] - norm[0] * norm[3]);
    mat[0][2] = 2 * (norm[0] * norm[2] + norm[1] * norm[3]);
    mat[1][0] = 2 * (norm[1] * norm[2] + norm[0] * norm[3]);
    mat[1][1] = norm[0] * norm[0] - norm[1] * norm[1] + norm[2] * norm[2] - norm[3] * norm[3];
    mat[1][2] = 2 * (norm[3] * norm[2] - norm[0] * norm[1]);
    mat[2][0] = 2 * (norm[1] * norm[3] - norm[0] * norm[2]);
    mat[2][1] = 2 * (norm[1] * norm[0] + norm[2] * norm[3]);
    mat[2][2] = norm[0] * norm[0] - norm[1] * norm[1] - norm[2] * norm[2] + norm[3] * norm[3];

    return mat;

}

function traverseFKJoint(joint) {
    let trans_mat = generate_translation_matrix(robot.joints[joint].origin.xyz[0], robot.joints[joint].origin.xyz[1], robot.joints[joint].origin.xyz[2]);
    let rot_mat = generate_rotation_matrix(robot.joints[joint].origin.rpy[0],robot.joints[joint].origin.rpy[1],robot.joints[joint].origin.rpy[2]);
    let tot_mat = matrix_multiply(trans_mat,rot_mat);
    tot_mat = matrix_multiply(robot.links[robot.joints[joint].parent].xform, tot_mat);


    var new_mat = generate_identity(4);
    if (robot.links_geom_imported){
        if (robot.joints[joint].type === "prismatic"){
            var temp = [robot.joints[joint].angle, robot.joints[joint].angle, robot.joints[joint].angle];
            temp = vector_dot(temp, robot.joints[joint].axis);
            new_mat = generate_translation_matrix(temp[0],temp[1], temp[2]);
        }else if ((robot.joints[joint].type === "revolute")|(robot.joints[joint].type === "continuous")){
            new_mat = rotation_matrix_from_angle_axis(new_mat, robot.joints[joint].angle, robot.joints[joint].axis);
        }else{
        }
    }
    else{
        new_mat = rotation_matrix_from_angle_axis(new_mat, robot.joints[joint].angle, robot.joints[joint].axis);
    }

    robot.joints[joint].xform = matrix_multiply(tot_mat, new_mat);
    traverseFKLink(robot.joints[joint].child);

}
  
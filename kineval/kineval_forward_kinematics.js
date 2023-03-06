
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
    kineval.traverseFKBase();

}

function translation_of_matrix(xyz, rpy){
    let result = generate_translation_matrix(xyz[0], xyz[1], xyz[2]);
    result = matrix_multiply(result, generate_rotation_matrix_Z(rpy[2]));
    result = matrix_multiply(result, generate_rotation_matrix_Y(rpy[1]));
    result = matrix_multiply(result, generate_rotation_matrix_X(rpy[0]));

    return result;
}

kineval.traverseFKBase = function traverseFKBase() {
    //creating the matrix stack with two empty matrix
    var ms = [generate_identity(), generate_identity()];

    //updating the stack for the base value
    ms[1] = matrix_multiply(ms[1], translation_of_matrix(robot.origin.xyz, robot.origin.rpy));
    robot.origin.xform = ms[1];

    //start traversal at link
    kineval.traverseFKLink(ms, robot.base);
}


kineval.traverseFKLink = function traverseFKLink(ms, link) {
    robot.links[link].xform = ms[ms.length - 1];
        
    //no children
    if(!('children' in robot.links[link])){
        ms.pop();
        return;
    }

    //traverse through children joints
    let i = 0;
    while(i < robot.links[link].children.length){
        kineval.traverseFKJoint(ms, robot.links[link].children[i]);
        ++i;
    }
    ms.pop();
}


kineval.traverseFKJoint = function traverseFKJoint(ms, joint) {
    // add same position matrix to the end of the stack and update the matrix
    ms.push(ms[ms.length - 1]);
    ms[ms.length - 1] = matrix_multiply(ms[ms.length - 1], translation_of_matrix(robot.joints[joint].origin.xyz,robot.joints[joint].origin.rpy));
    robot.joints[joint].xform = ms[ms.length - 1];

    // recursive call on link if there is a child
    if('child' in robot.joints[joint]){
        kineval.traverseFKLink(ms, robot.joints[joint].child);
    }

}
  
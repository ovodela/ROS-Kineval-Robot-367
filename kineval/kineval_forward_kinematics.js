
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
    
    function updateRobotHeadingAndLateral() { //Need change to recieve input
        // Set robot_heading to unit vector pointing in z-axis direction
        robot_heading = [
        [0],
        [0],
        [1],
        [0]
        ];
    
        // Set robot_lateral to unit vector pointing in x-axis direction
        robot_lateral = [
        [1],
        [0],
        [0],
        [0]
        ];
    }  
  
  
  
  

kineval.buildFKTransforms = function buildFKTransforms() {
    // generate identity matrix
    var identity = generate_identity();

    // initialize robot base matrix and position
    var robot_base_matrix = generate_identity();
    var robot_base_position = [[0], [0], [0], [1]];

    // if using keyboard interface, transform robot heading and lateral into world coordinates
    if (typeof robot_heading !== 'undefined' && typeof robot_lateral !== 'undefined') {
        robot_heading = matrix_transpose(matrix_pseudoinverse(robot_base_matrix))[0];
        robot_lateral = matrix_transpose(matrix_pseudoinverse(robot_base_matrix))[1];
    }

    // recursive traversal over links and joints starting from base
    traverseFKBase(robot.joints[robot.base], robot_base_matrix, robot_base_position, identity);
    
}

function traverseFKBase(joint, parent_matrix, parent_position, cumulative_rotation) {
    var child_link = robot.links[joint];

    // apply joint rotation matrix
    var joint_rotation_matrix = generate_rotation_matrix_Z(robot.joints[joint].angle);
    var cumulative_rotation = matrix_multiply(cumulative_rotation, joint_rotation_matrix);

    // apply link translation matrix
    var link_translation_matrix = generate_translation_matrix(child_link.origin.xyz[0], child_link.origin.xyz[1], child_link.origin.xyz[2]);
    var link_position = matrix_multiply(parent_matrix, matrix_multiply(cumulative_rotation, link_translation_matrix));
    var link_matrix = matrix_multiply(cumulative_rotation, link_translation_matrix);

    // set joint FK transform
    joint.transform = link_matrix;

    traverseFKLink(child_link, link_matrix, link_position, cumulative_rotation);

}

function traverseFKLink(link, parent_matrix, parent_position, cumulative_rotation) {
    var child_joint = robot.joints[link].children[0];

    // apply link transform matrix
    var link_matrix = generate_translation_matrix(robot.links[link].com.xyz[0], robot.links[link].com.xyz[1], robot.links[link].com.xyz[2]);
    var link_position = matrix_multiply(parent_matrix, matrix_multiply(cumulative_rotation, link_matrix));
    var link_rotation_matrix = generate_rotation_matrix_X(robot.links[link].inertial.R[0][0]);
    link_rotation_matrix = matrix_multiply(generate_rotation_matrix_Y(robot.links[link].inertial.R[1][1]), link_rotation_matrix);
    link_rotation_matrix = matrix_multiply(generate_rotation_matrix_Z(robot.links[link].inertial.R[2][2]), link_rotation_matrix);
    var link_matrix = matrix_multiply(link_position, matrix_multiply(link_rotation_matrix, generate_translation_matrix(-robot.links[link].com.xyz[0], -robot.links[link].com.xyz[1], -robot.links[link].com.xyz[2])));

    // set link FK transform
    robot.links[link].transform = link_matrix;

    traverseFKJoint(child_joint, link_matrix, link_position, cumulative_rotation);

}

function traverseFKJoint(joint, parent_matrix, parent_position, cumulative_rotation) {
    // get rotation matrix from joint angle
    var rotation_matrix = generate_rotation_matrix_Z(robot.joints[joint].angle);
  
    // apply joint rotation
    var joint_matrix = matrix_multiply(parent_matrix, rotation_matrix);
  
    // apply translation to get child link to correct position relative to parent joint
    var translation_matrix = generate_translation_matrix(robot.joints[joint].origin.xyz[0], robot.joints[joint].origin.xyz[1], robot.joints[joint].origin.xyz[2]);
    var link_matrix = matrix_multiply(joint_matrix, translation_matrix);
  
    // update link matrix with any additional transform
    if (joint.transform) {
      var transform_matrix = matrix_multiply(joint_matrix, robot.joints[joint].transform);
      link_matrix = matrix_multiply(transform_matrix, translation_matrix);
    }
  
    // save the link matrix for future use in kineval.updateLinkTransforms()
    kineval.link_transforms[robot.links[joint]] = link_matrix;
  
    // update cumulative rotation matrix for child links
    var next_rotation = matrix_multiply(cumulative_rotation, rotation_matrix);
  
    // traverse the child link
    traverseFKLink(robot.links[robot.links[joint]], link_matrix, parent_position, next_rotation);

}
  
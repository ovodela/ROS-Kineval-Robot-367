
/*-- |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/|

    KinEval | Kinematic Evaluator | arm servo control

    Implementation of robot kinematics, control, decision making, and dynamics 
        in HTML5/JavaScript and threejs
     
    @author ohseejay / https://github.com/ohseejay / https://bitbucket.org/ohseejay

    Chad Jenkins
    Laboratory for Perception RObotics and Grounded REasoning Systems
    University of Michigan

    License: Creative Commons 3.0 BY-SA

|\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| --*/

kineval.setpointDanceSequence = function execute_setpoints() {

    // if update not requested, exit routine
    if (!kineval.params.update_pd_dance) return; 

    // STENCIL: implement FSM to cycle through dance pose setpoints
    if (!kineval.params.current_setpoint_index) {
        kineval.params.current_setpoint_index = 0;
    }
    
    if (kineval.params.current_setpoint_index === kineval.params.setpoints.length) {
        kineval.params.current_setpoint_index = 0;
    }
    
    var current_setpoint = kineval.params.setpoints[kineval.params.current_setpoint_index];
    for (var joint_name in current_setpoint) {
        kineval.robot.joints[joint_name].control = current_setpoint[joint_name];
    }
    
    kineval.params.current_setpoint_index++;
}

kineval.setpointClockMovement = function execute_clock() {

    // if update not requested, exit routine
    if (!kineval.params.update_pd_clock) return; 

    var curdate = new Date();
    for (x in robot.joints) {
        kineval.params.setpoint_target[x] = curdate.getSeconds()/60*2*Math.PI;
    }
}


kineval.robotArmControllerSetpoint = function robot_pd_control () {

    // if update not requested, exit routine
    if ((!kineval.params.update_pd)&&(!kineval.params.persist_pd)) return; 

    kineval.params.update_pd = false; // if update requested, clear request and process setpoint control

    // STENCIL: implement P servo controller over joints
    for (var joint_name in kineval.robot.joints) {
        var joint = kineval.robot.joints[joint_name];
        var error = joint.control - joint.angle;
        var command = kineval.params.Kp * error;
        joint.motor = command;
    }
}



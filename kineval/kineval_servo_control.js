
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
    kineval.params.dance_pose_index = 0;
    var state = "s";
    
    while(kineval.params.dance_pose_index < kineval.params.dance_sequence_index.length){
        switch(state){
            case "s":
                for (x in kineval.robot.joints){
                    kineval.params.setpoint_target[x] = kineval.setpoints[kineval.params.dance_pose_index][x];
                }
                state = "r";
                break;
            case "r":
                kineval.params.dance_pose_index++;
                kineval.robotArmControllerSetpoint();
                state = "s";
                break;
        }
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
        var error = kineval.params.setpoint_target[joint_name] - kineval.robot.joints[joint_name].angle;
        
        robot.joints[joint_name].servo.p_gain = .1;
        var command = robot.joints[joint_name].servo.p_gain * error;
        kineval.robot.joints[joint_name].angle = kineval.robot.joints[joint_name].angle + command;
    }
}




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
    //kineval.params.dance_pose_index = 0;
    

    var counter = 0;
    var s = 0;
    kineval.params.dance_pose_index = kineval.params.dance_pose_index%kineval.params.dance_sequence_index.length;
    for (x in robot.joints) {
        kineval.params.setpoint_target[x] = kineval.setpoints[kineval.params.dance_sequence_index[kineval.params.dance_pose_index]][x];
        var error = kineval.params.setpoint_target[x] - robot.joints[x].angle;
        
        if(error < 0.01){ 
            counter++;
        }
        s++;
    }
    if(counter === s){
        kineval.params.dance_pose_index++;
        kineval.params.dance_pose_index = kineval.params.dance_pose_index % kineval.params.dance_sequence_index.length;
    }        
    
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

    // if update not re`quested, exit routine
    if ((!kineval.params.update_pd)&&(!kineval.params.persist_pd)) return; 

    kineval.params.update_pd = false; // if update requested, clear request and process setpoint control

    // STENCIL: implement P servo controller over joints
    for (joint_name in robot.joints) {
        var error = kineval.params.setpoint_target[joint_name] - robot.joints[joint_name].angle;
        
        robot.joints[joint_name].servo.p_gain = .15;
        robot.joints[joint_name].control = robot.joints[joint_name].servo.p_gain * error;

        // var command = robot.joints[joint_name].servo.p_gain * error;
        // kineval.robot.joints[joint_name].angle = kineval.robot.joints[joint_name].angle + command;
    }
}



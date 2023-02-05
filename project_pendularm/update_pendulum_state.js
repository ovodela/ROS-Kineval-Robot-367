function update_pendulum_state(numerical_integrator, pendulum, dt, gravity) {
    // integrate pendulum state forward in time by dt
    // please use names 'pendulum.angle', 'pendulum.angle_previous', etc. in else codeblock between line 28-30

    if (typeof numerical_integrator === "undefined")
        numerical_integrator = "none";

    if (numerical_integrator === "euler") {

    // STENCIL: a correct Euler integrator is REQUIRED for assignment
        
        /* 
        pendulum.angle_previous = pendulum.angle;
        pendulum.angle_dot_dot = pendulum_acceleration(pendulum, gravity)
        pendulum.angle = pendulum.angle_previous + pendulum.angle_dot * dt;
        pendulum.angle_dot = pendulum.angle_dot + pendulum.angle_dot_dot * dt;
        */

        pendulum.angle_dot = pendulum.angle_dot + pendulum_acceleration(pendulum, gravity) * dt;
        pendulum.angle = pendulum.angle + pendulum.angle_dot * dt;
    }
    else if (numerical_integrator === "verlet") {

    // STENCIL: basic Verlet integration
        pendulum.angle_previous = pendulum.angle;
    

    }
    else if (numerical_integrator === "velocity verlet") {

    // STENCIL: a correct velocity Verlet integrator is REQUIRED for assignment
        /* 
        pendulum.angle_previous = pendulum.angle;
        pendulum.angle_dot_dot = pendulum_acceleration(pendulum, gravity)
        pendulum.angle = pendulum.angle_previous + pendulum.angle_dot * dt + .5 * pendulum.angle_dot_dot * dt * dt;
        pendulum.angle_dot = pendulum.angle_dot + pendulum.angle_dot_dot * dt;
        */
        
        let [updatedPendulum, updatedTime] = init_verlet_integrator(pendulum, t, gravity);
        pendulum.angle = pendulum.angle + updatedPendulum.angle_dot * dt + 0.5 * pendulum_acceleration(updatedPendulum, gravity) * dt * dt;
        let updatedPendulum2 = {...pendulum};
        updatedPendulum2.angle = pendulum.angle;
        pendulum.angle_dot = updatedPendulum.angle_dot + 0.5 * (pendulum_acceleration(updatedPendulum, gravity) + pendulum_acceleration(updatedPendulum2, gravity)) * dt;
    
    }
    else if (numerical_integrator === "runge-kutta") {

    // STENCIL: Runge-Kutta 4 integrator
    } 
    else {
        pendulum.angle_previous = pendulum.angle;
        pendulum.angle = (pendulum.angle+Math.PI/180)%(2*Math.PI);
        pendulum.angle_dot = (pendulum.angle-pendulum.angle_previous)/dt;
        numerical_integrator = "none";
    }

    return pendulum;
}

function pendulum_acceleration(pendulum, gravity) {
    // STENCIL: return acceleration(s) system equation(s) of motion 
    return -gravity * Math.sin(pendulum.angle);
}

function init_verlet_integrator(pendulum, t, gravity) {
    // STENCIL: for verlet integration, a first step in time is needed
    // return: updated pendulum state and time

    let updatedPendulum = {...pendulum};
    updatedPendulum.angle = pendulum.angle + pendulum.angle_dot * t + 0.5 * pendulum_acceleration(pendulum, gravity) * t * t;
    return [updatedPendulum, t + dt];

    // return [pendulum, t];
}

function set_PID_parameters(pendulum) {
    // STENCIL: change pid parameters
    pendulum.servo = {kp:0.5, kd:0.02, ki:0.5};  // no control
    return pendulum;
}

function PID(pendulum, accumulated_error, dt) {
    // STENCIL: implement PID controller
    // return: updated output in pendulum.control and accumulated_error

    // pendulum.servo.error = pendulum."expected" - pendulum.angle

    let error = pendulum.servo.expected - pendulum.angle;
    let derivative = (error - accumulated_error) / dt;
    accumulated_error = accumulated_error + error * dt;
    pendulum.control = pendulum.servo.kp * error + pendulum.servo.ki * accumulated_error + pendulum.servo.kd * derivative;
    
    return [pendulum, accumulated_error];
}
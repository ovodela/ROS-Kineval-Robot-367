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

        pendulum.angle_previous = pendulum.angle;
        let accel_t = pendulum_acceleration(pendulum, gravity);
        pendulum.angle = pendulum.angle_previous + pendulum.angle_dot * dt;
        pendulum.angle_dot = pendulum.angle_dot + accel_t * dt;
    }
    else if (numerical_integrator === "verlet") {

    // STENCIL: basic Verlet integration
        pendulum.angle_previous = pendulum.angle;
    

    }
    else if (numerical_integrator === "velocity verlet") {

    // STENCIL: a correct velocity Verlet integrator is REQUIRED for assignment
        
        pendulum.angle_previous = pendulum.angle;
        let accel_t = pendulum_acceleration(pendulum, gravity);
        pendulum.angle = pendulum.angle_previous + pendulum.angle_dot * dt + .5 * accel_t * dt * dt;
        pendulum.angle_dot = pendulum.angle_dot + (pendulum_acceleration(pendulum, gravity) + accel_t) * dt / 2;
        
        // pendulum.angle_previous = pendulum.angle;
        // let [updatedPendulum, updatedTime] = init_verlet_integrator(pendulum, t, gravity);
        // pendulum.angle = pendulum.angle + updatedPendulum.angle_dot * dt + 0.5 * pendulum_acceleration(updatedPendulum, gravity) * dt * dt;
        // let updatedPendulum2 = {...pendulum};
        // updatedPendulum2.angle = pendulum.angle;
        // pendulum.angle_dot = updatedPendulum.angle_dot + 0.5 * (pendulum_acceleration(updatedPendulum, gravity) + pendulum_acceleration(updatedPendulum2, gravity)) * dt;
    
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

    // return -gravity * Math.sin(pendulum.angle);

    let term1 = gravity * Math.sin(pendulum.angle) / pendulum.length; // g sin / l
    let term2 = -gravity * Math.sin(pendulum.angle) / pendulum.length; // t / ml^2
    return -term1 + term2
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
    pendulum.servo = {kp:0.1, kd:0.01, ki:0.1};  // no control
    return pendulum;
}

function PID(pendulum, accumulated_error, dt) {
    // STENCIL: implement PID controller
    // return: updated output in pendulum.control and accumulated_error

    pendulum.servo.error = pendulum.desired - pendulum.angle;
    accumulated_error = accumulated_error + pendulum.servo.error * dt;
    let derivative = (pendulum.servo.error - accumulated_error) / dt;
    pendulum.control = pendulum.servo.error * pendulum.servo.kp + pendulum.servo.ki * accumulated_error + pendulum.servo.kd * derivative;

    // let error = pendulum.servo.expected - pendulum.angle;
    // let derivative = (error - accumulated_error) / dt;
    // accumulated_error = accumulated_error + error * dt;
    // pendulum.control = pendulum.servo.kp * error + pendulum.servo.ki * accumulated_error + pendulum.servo.kd * derivative;
    
    return [pendulum, accumulated_error];
}
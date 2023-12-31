//////////////////////////////////////////////////
/////     QUATERNION TRANSFORM ROUTINES 
//////////////////////////////////////////////////

// STENCIL: reference quaternion code has the following functions:
//   quaternion_from_axisangle
//   quaternion_normalize
//   quaternion_to_rotation_matrix
//   quaternion_multiply

// **** Function stencils are provided below, please uncomment and implement them ****//

kineval.quaternionFromAxisAngle = function quaternion_from_axisangle(axis,angle) {
    // returns quaternion q as dic, with q.a as real number, q.b as i component, q.c as j component, q.d as k component
    var q = {};
    q.a = Math.cos(angle/2);
    q.b = axis[0] * Math.sin(angle/2);
    q.c = axis[1] * Math.sin(angle/2);
    q.d = axis[2] * Math.sin(angle/2);

    return q;

}

kineval.quaternionNormalize = function quaternion_normalize(q1) {
    // returns quaternion q as dic, with q.a as real number, q.b as i component, q.c as j component, q.d as k component
    var q = {};
    var mag = (q1.a * q1.a) + (q1.b * q1.b) + (q1.c * q1.c) + (q1.d * q1.d);

    mag = Math.sqrt(Math.abs(mag));

    q.a = q1.a / mag;
    q.b = q1.b / mag;
    q.c = q1.c / mag;
    q.d = q1.d / mag;
    
    return q;

}

kineval.quaternionMultiply = function quaternion_multiply(q1,q2) {
    // returns quaternion q as dic, with q.a as real number, q.b as i component, q.c as j component, q.d as k component
    var q = {};
    q.a = (q1.a * q2.a) - (q1.b * q2.b) - (q1.c * q2.c) - (q1.d * q2.d);
    q.b = (q1.a * q2.b) + (q1.b * q2.a) + (q1.c * q2.d) - (q1.d * q2.c);
    q.c = (q1.a * q2.c) - (q1.b * q2.d) + (q1.c * q2.a) + (q1.d * q2.b);
    q.d = (q1.a * q2.d) + (q1.b * q2.c) - (q1.c * q2.b) + (q1.d * q2.a);
    
    return q;

}

kineval.quaternionToRotationMatrix = function quaternion_to_rotation_matrix (q) {
    // returns 4-by-4 2D rotation matrix
    var a2 = q.a * q.a;
    var b2 = q.b * q.b;
    var c2 = q.c * q.c;
    var d2 = q.d * q.d;
    var bc = q.b * q.c;
    var ad = q.a * q.d;
    var ac = q.a * q.c;
    var bd = q.b * q.d;
    var cd = q.c * q.d;
    var ab = q.a * q.b;

    var m = [
        [a2 + b2 - c2 - d2, 2 * (bc - ad), 2 * (ac + bd), 0],
        [2 * (bc + ad), a2 - b2 + c2 - d2, 2 * (cd - ab), 0],
        [2 * (bd - ac), 2 * (ab + cd), a2 - b2 - c2 + d2, 0],
        [0,0,0,1]
    ];

    return m;

}
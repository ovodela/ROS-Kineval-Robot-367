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
    var mag = q1.a * q1.a + q1.b * q1.b + q1.c * q1.c + q1.d * q1.d;

    mag = Math.sqrt(Math.abs(mag));

    if (!(Math.abs(mag) < Number.EPSILON)){
        q.a = q1.a / mag;
        q.b = q1.b / mag;
        q.c = q1.c / mag;
        q.d = q1.d / mag;

    }
    else{
        q.a = q1.a;
        q.b = q1.b;
        q.c = q1.c;
        q.d = q1.d;   
    }
    
    return q;

}

kineval.quaternionMultiply = function quaternion_multiply(q1,q2) {
    // returns quaternion q as dic, with q.a as real number, q.b as i component, q.c as j component, q.d as k component
    var q = {};
    q.a = q1.a * q2.a - q1.b * q2.b - q1.c * q2.c - q1.d * q2.d;
    q.b = q1.a * q2.b + q1.b * q2.a + q1.c * q2.d - q1.d * q2.c;
    q.c = q1.a * q2.c - q1.b * q2.d + q1.c * q2.a + q1.d * q2.b;
    q.d = q1.a * q2.d + q1.b * q2.c - q1.c * q2.b + q1.d * q2.a;
    
    return q;

}

kineval.quaternionToRotationMatrix = function quaternion_to_rotation_matrix (q) {
    // returns 4-by-4 2D rotation matrix
    let m = new Array(4);
    
    for (let i = 0; i < 4; i++) {
      m[i] = new Array(4);
    }

    m[0][0] = q.a * q.a + q.b * q.b - q.c * q.c - q.d * q.d;
    m[0][1] = 2 * (q.b * q.c - q.a * q.d);
    m[0][2] = 2 * (q.a * q.c + q.b * q.d);
    m[1][0] = 2 * (q.b * q.c + q.a * q.d);
    m[1][1] = q.a * q.a - q.b * q.b + q.c * q.c - q.d * q.d;
    m[1][2] = 2 * (q.d * q.c - q.a * q.b);
    m[2][0] = 2 * (q.b * q.d - q.a * q.c);
    m[2][1] = 2 * (q.b * q.a + q.c * q.d);
    m[2][2] = q.a * q.a - q.b * q.b - q.c * q.c + q.d * q.d;
    m[3][3] = 1;

    return m;

}
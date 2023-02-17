//////////////////////////////////////////////////
/////     MATRIX ALGEBRA AND GEOMETRIC TRANSFORMS 
//////////////////////////////////////////////////

function matrix_copy(m1) {
    // returns 2D array that is a copy of m1

    var mat = [];
    var i,j;

    for (i=0;i<m1.length;i++) { // for each row of m1
        mat[i] = [];
        for (j=0;j<m1[0].length;j++) { // for each column of m1
            mat[i][j] = m1[i][j];
        }
    }
    return mat;
}


// STENCIL: reference matrix code has the following functions:
//   matrix_multiply
//   matrix_transpose
//   matrix_pseudoinverse
//   matrix_invert_affine
//   vector_normalize
//   vector_cross
//   generate_identity
//   generate_translation_matrix
//   generate_rotation_matrix_X
//   generate_rotation_matrix_Y
//   generate_rotation_matrix_Z



// **** Function stencils are provided below, please uncomment and implement them ****//



function matrix_multiply(m1, m2) {
    // returns 2D array that is the result of m1*m2

    if (m1[0].length !== m2.length) {
      throw new Error("Invalid matrix dimensions");
    }
    
    let result = new Array(m1.length);
    for (let i = 0; i < m1.length; i++) {
      result[i] = new Array(m2[0].length).fill(0);
      for (let j = 0; j < m2[0].length; j++) {
        for (let k = 0; k < m1[0].length; k++) {
          result[i][j] += m1[i][k] * m2[k][j];
        }
      }
    }
    
    return result;
}
  

function matrix_transpose(m) {
    // returns 2D array that is the result of m1*m2

    let result = new Array(m[0].length);
    for (let i = 0; i < m[0].length; i++) {
      result[i] = new Array(m.length).fill(0);
      for (let j = 0; j < m.length; j++) {
        result[i][j] = m[j][i];
      }
    }
    return result;
}
  

function matrix_pseudoinverse(m) {
    // returns pseudoinverse of matrix m

    let svd = numeric.svd(m);
    let s = svd.S;
    let u = svd.U;
    let v = svd.V;
    
    for (let i = 0; i < s.length; i++) {
      s[i] = Math.abs(s[i]) > 1e-10 ? 1/s[i] : 0;
    }
    
    let s_inv = numeric.diag(s);
    let u_t = matrix_transpose(u);
    let v_t = matrix_transpose(v);
    
    let v_t_s_inv = matrix_multiply(v_t, s_inv);
    let s_inv_u_t = matrix_multiply(s_inv, u_t);
    
    return matrix_multiply(v_t_s_inv, s_inv_u_t);
}
  
  

function matrix_invert_affine(m) {
    // returns 2D array that is the invert affine of 4-by-4 matrix m

    let m_inv = new Array(4);
    for (let i = 0; i < 4; i++) {
      m_inv[i] = new Array(4).fill(0);
    }
    
    // Invert the linear transformation matrix
    let R = m.slice(0,3).map(row => row.slice(0,3));
    let R_inv = matrix_transpose(R);
    
    // Invert the translation vector
    let t = m.slice(0,3).map(row => [row[3]]);
    let t_inv = matrix_multiply(R_inv, [[-t[0][0]], [-t[1][0]], [-t[2][0]]]);
    
    // Construct the inverse affine matrix
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        m_inv[i][j] = R_inv[i][j];
      }
      m_inv[i][3] = t_inv[i][0];
      m_inv[3][i] = 0;
    }
    m_inv[3][3] = 1;
    
    return m_inv;
}
  
  

function vector_normalize(v) {
    // returns normalized vector for v

    let mag = Math.sqrt(matrix_multiply(matrix_transpose(v), v)[0][0]);
    let v_norm = new Array(v.length);
    
    for (let i = 0; i < v.length; i++) {
      v_norm[i] = v[i][0] / mag;
    }
    
    return v_norm;
}
  
  

function vector_cross(a, b) {
    // return cross product of vector a and b with both has 3 dimensions

    let ax = a[0][0], ay = a[1][0], az = a[2][0];
    let bx = b[0][0], by = b[1][0], bz = b[2][0];
    
    let cx = ay*bz - az*by;
    let cy = az*bx - ax*bz;
    let cz = ax*by - ay*bx;
    
    let c = [[cx], [cy], [cz], [1]];
    
    return c;
}
  

function generate_identity() {
    // returns 4-by-4 2D array of identity matrix

    let identity = new Array(4);
    
    for (let i = 0; i < 4; i++) {
      identity[i] = new Array(4);
      
      for (let j = 0; j < 4; j++) {
        if (i === j) {
          identity[i][j] = 1;
        } else {
          identity[i][j] = 0;
        }
      }
    }
    
    return identity;
}
  

function generate_translation_matrix(tx, ty, tz) {
    // returns 4-by-4 matrix as a 2D array

    let translation_matrix = generate_identity();
    
    translation_matrix[0][3] = tx;
    translation_matrix[1][3] = ty;
    translation_matrix[2][3] = tz;
    
    return translation_matrix;
}
  

function generate_rotation_matrix_X(angle) {
    // returns 4-by-4 matrix as a 2D array, angle is in radians

    let rotation_matrix = generate_identity();
        
    let cos = Math.cos(angle);
    let sin = Math.sin(angle);
        
    rotation_matrix[1][1] = cos;
    rotation_matrix[1][2] = -sin;
    rotation_matrix[2][1] = sin;
    rotation_matrix[2][2] = cos;
        
    return rotation_matrix;
}

function generate_rotation_matrix_Y(angle) {
    // returns 4-by-4 matrix as a 2D array, angle is in radians
        
    let rotation_matrix = generate_identity();
        
    let cos = Math.cos(angle);
    let sin = Math.sin(angle);
        
    rotation_matrix[0][0] = cos;
    rotation_matrix[0][2] = sin;
    rotation_matrix[2][0] = -sin;
    rotation_matrix[2][2] = cos;
        
    return rotation_matrix;
}


function generate_rotation_matrix_Z(angle) {
    // returns 4-by-4 matrix as a 2D array, angle is in radians

    let rotation_matrix = generate_identity();
    
    let cos = Math.cos(angle);
    let sin = Math.sin(angle);
    
    rotation_matrix[0][0] = cos;
    rotation_matrix[0][1] = -sin;
    rotation_matrix[1][0] = sin;
    rotation_matrix[1][1] = cos;
    
    return rotation_matrix;
}
  
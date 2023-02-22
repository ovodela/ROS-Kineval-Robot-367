//CI grader generates report at 22-02-2023-03-38-07
//Commit hash: 730e4d6
grade = 
{
  "omkarv": {
    "name": "Vodela, Omkar",
    "unique_name": "omkarv",
    "email": "omkarv@umich.edu",
    "course": "ROB 320/EECS 367 W23",
    "repository": "AutoRob-WN23/kineval-stencil-ovodela",
    "assignments": {
      "Honor": {
        "status": "CHECK",
        "comments": [
          "comment: honor code certified"
        ]
      },
      "ROS Pub/Sub": {
        "status": "PENDING",
        "comments": [
          "Passing 0 of 3 tests"
        ]
      },
      "PathPlan_Heap": {
        "status": "PASS",
        "comments": [
          "10 out of 10 test cases passed"
        ],
        "test results": {
          "Test 0": {
            "Status": "Succeed",
            "Stderr": "b''"
          },
          "Test 1": {
            "Status": "Succeed",
            "Stderr": "b''"
          },
          "Test 2": {
            "Status": "Succeed",
            "Stderr": "b''"
          },
          "Test 3": {
            "Status": "Succeed",
            "Stderr": "b''"
          },
          "Test 4": {
            "Status": "Succeed",
            "Stderr": "b''"
          },
          "Test 5": {
            "Status": "Succeed",
            "Stderr": "b''"
          },
          "Test 6": {
            "Status": "Succeed",
            "Stderr": "b''"
          },
          "Test 7": {
            "Status": "Succeed",
            "Stderr": "b''"
          },
          "Test 8": {
            "Status": "Succeed",
            "Stderr": "b''"
          },
          "Test 9": {
            "Status": "Succeed",
            "Stderr": "b''"
          }
        }
      },
      "PathPlan_AStar": {
        "status": "PASS",
        "comments": [
          "5 out of 5 test cases passed"
        ],
        "test results": {
          "Test 0": {
            "Status": "Succeed",
            "Stderr": "b''"
          },
          "Test 1": {
            "Status": "Succeed",
            "Stderr": "b''"
          },
          "Test 2": {
            "Status": "Succeed",
            "Stderr": "b''"
          },
          "Test 3": {
            "Status": "Succeed",
            "Stderr": "b''"
          },
          "Test 4": {
            "Status": "Succeed",
            "Stderr": "b''"
          }
        }
      },
      "Pendularm_Euler": {
        "status": "PASS",
        "comments": [
          "2 out of 2 test cases passed"
        ],
        "test results": {
          "Test 0": {
            "Status": "Succeed",
            "Stderr": "b''"
          },
          "Test 1": {
            "Status": "Succeed",
            "Stderr": "b''"
          }
        }
      },
      "Pendularm_VelocityVerlet": {
        "status": "PASS",
        "comments": [
          "2 out of 2 test cases passed"
        ],
        "test results": {
          "Test 0": {
            "Status": "Succeed",
            "Stderr": "b''"
          },
          "Test 1": {
            "Status": "Succeed",
            "Stderr": "b''"
          }
        }
      },
      "Pendularm_PID": {
        "status": "PASS",
        "comments": [
          "1 out of 1 test cases passed"
        ],
        "test results": {
          "Test 0": {
            "Status": "Succeed",
            "Stderr": "b''"
          }
        }
      },
      "FK_MatrixRoutines": {
        "status": "PENDING",
        "comments": [
          "0 out of 1 test cases passed"
        ],
        "test results": {
          "Test 0": {
            "Status": "Failed",
            "Stderr": "b'matrix_multiply test pass\\nmatrix_transpose test pass\\nvector_normalize test pass\\nvector_cross test fail\\ngenerate_identity test pass\\ngenerate_translation_matrix test pass\\ngenerate_rotation_matrix_X test pass\\ngenerate_rotation_matrix_Y test pass\\ngenerate_rotation_matrix_Z test pass\\n[ERROR]: Test fail\\n'"
          }
        }
      },
      "FK_Transforms": {
        "status": "PENDING",
        "comments": [
          "3 out of 8 test cases passed"
        ],
        "test results": {
          "Test 0": {
            "Status": "Failed",
            "Stderr": "Error message too long, print partially: b'/omkarv/FK_Transforms/test_0.js:498\\n    let svd = numeric.svd(m);\\n              ^\\n\\nReferenceError: numeric is not defined\\n    at matrix_pseudoinverse (/omkarv/FK_Transforms/test_0.js:498:15)\\n    at Object.buildFKTransforms (/omkarv/FK_Transforms/test_0.js:1272:42)\\n    at Object.robotForwardKinem"
          },
          "Test 1": {
            "Status": "Failed",
            "Stderr": "Error message too long, print partially: b'/omkarv/FK_Transforms/test_1.js:381\\n    let svd = numeric.svd(m);\\n              ^\\n\\nReferenceError: numeric is not defined\\n    at matrix_pseudoinverse (/omkarv/FK_Transforms/test_1.js:381:15)\\n    at Object.buildFKTransforms (/omkarv/FK_Transforms/test_1.js:1155:42)\\n    at Object.robotForwardKinem"
          },
          "Test 2": {
            "Status": "Failed",
            "Stderr": "Error message too long, print partially: b'/omkarv/FK_Transforms/test_2.js:633\\n    let svd = numeric.svd(m);\\n              ^\\n\\nReferenceError: numeric is not defined\\n    at matrix_pseudoinverse (/omkarv/FK_Transforms/test_2.js:633:15)\\n    at Object.buildFKTransforms (/omkarv/FK_Transforms/test_2.js:1407:42)\\n    at Object.robotForwardKinem"
          },
          "Test 3": {
            "Status": "Failed",
            "Stderr": "Error message too long, print partially: b'/omkarv/FK_Transforms/test_3.js:412\\n    let svd = numeric.svd(m);\\n              ^\\n\\nReferenceError: numeric is not defined\\n    at matrix_pseudoinverse (/omkarv/FK_Transforms/test_3.js:412:15)\\n    at Object.buildFKTransforms (/omkarv/FK_Transforms/test_3.js:1186:42)\\n    at Object.robotForwardKinem"
          },
          "Test 4": {
            "Status": "Failed",
            "Stderr": "Error message too long, print partially: b'/omkarv/FK_Transforms/test_4.js:406\\n    let svd = numeric.svd(m);\\n              ^\\n\\nReferenceError: numeric is not defined\\n    at matrix_pseudoinverse (/omkarv/FK_Transforms/test_4.js:406:15)\\n    at Object.buildFKTransforms (/omkarv/FK_Transforms/test_4.js:1180:42)\\n    at Object.robotForwardKinem"
          },
          "Test 5": {
            "Status": "Succeed",
            "Stderr": "Only for graduate session, skip testing"
          },
          "Test 6": {
            "Status": "Succeed",
            "Stderr": "Only for graduate session, skip testing"
          },
          "Test 7": {
            "Status": "Succeed",
            "Stderr": "Only for graduate session, skip testing"
          }
        }
      },
      "FK_JointRendering": {
        "status": "PENDING",
        "comments": [
          ""
        ]
      },
      "FSMDance_Quaternion": {
        "status": "PENDING",
        "comments": [
          ""
        ]
      },
      "FSMDance_RexArm": {
        "status": "PENDING",
        "comments": [
          ""
        ]
      },
      "FSMDance_BaseControl": "FSMDance_BaseControl",
      "FSMDance_SetpointControl": {
        "status": "PENDING",
        "comments": [
          ""
        ]
      },
      "FSMDance_FSM": {
        "status": "PENDING",
        "comments": [
          ""
        ]
      },
      "IK_Jacobian": {
        "status": "PENDING",
        "comments": [
          ""
        ]
      },
      "IK_JTranspose": {
        "status": "PENDING",
        "comments": [
          ""
        ]
      },
      "IK_JPseudoInverse": {
        "status": "PENDING",
        "comments": [
          ""
        ]
      },
      "MotionPlan_Collision": {
        "status": "PENDING",
        "comments": [
          ""
        ]
      },
      "MotionPlan_2DRRTConnect": {
        "status": "PENDING",
        "comments": [
          ""
        ]
      },
      "MotionPlan_CSpaceRRTConnect": {
        "status": "PENDING",
        "comments": [
          ""
        ]
      },
      "Pitch": {
        "status": "PENDING",
        "comments": [
          ""
        ]
      },
      "FK_BaseOffset": {
        "status": "PENDING",
        "comments": [
          ""
        ]
      }
    },
    "quizzes": [
      {
        "status": "PENDING"
      },
      {
        "status": "PENDING"
      },
      {
        "status": "PENDING"
      },
      {
        "status": "PENDING"
      },
      {
        "status": "PENDING"
      },
      {
        "status": "PENDING"
      },
      {
        "status": "PENDING"
      },
      {
        "status": "PENDING"
      },
      {
        "status": "PENDING"
      },
      {
        "status": "PENDING"
      },
      {
        "status": "PENDING"
      }
    ]
  }
}
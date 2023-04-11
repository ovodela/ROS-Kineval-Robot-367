//CI grader generates report at 11-04-2023-14-47-27
//Commit hash: 21bfdb9
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
        "status": "CHECK",
        "comments": "Passing 3 out of 3 tests"
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
      "FK_Transforms": {
        "status": "PASS",
        "comments": [
          "8 out of 8 test cases passed"
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
      "FSMDance_RexArm": "FSMDance_RexArm",
      "FSMDance_BaseControl": {
        "status": "PENDING",
        "comments": [
          ""
        ]
      },
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
          "0 out of 2 test cases passed"
        ],
        "test results": {
          "Test 0": {
            "Status": "Failed",
            "Stderr": "Error message too long, print partially: b\"/omkarv/IK_Jacobian/test_0.js:1839\\n        robot.joints[curJoint].control += kineval.params.ik_steplength * robot.control[index][0];\\n                                                                                             ^\\n\\nTypeError: Cannot read property '0' of undefined\\n    at Object.iterate_inverse_kinematics [as iterateIK] (/omkarv/IK_Jacobian/test_0.j"
          },
          "Test 1": {
            "Status": "Failed",
            "Stderr": "Error message too long, print partially: b\"/omkarv/IK_Jacobian/test_1.js:1839\\n        robot.joints[curJoint].control += kineval.params.ik_steplength * robot.control[index][0];\\n                                                                                             ^\\n\\nTypeError: Cannot read property '0' of undefined\\n    at Object.iterate_inverse_kinematics [as iterateIK] (/omkarv/IK_Jacobian/test_1.j"
          }
        }
      },
      "IK_JTranspose": {
        "status": "PENDING",
        "comments": [
          "0 out of 3 test cases passed"
        ],
        "test results": {
          "Test 0": {
            "Status": "Failed",
            "Stderr": "Error message too long, print partially: b\"/omkarv/IK_JTranspose/test_0.js:1845\\n        robot.joints[curJoint].control += kineval.params.ik_steplength * robot.control[index][0];\\n                                                                                             ^\\n\\nTypeError: Cannot read property '0' of undefined\\n    at Object.iterate_inverse_kinematics [as iterateIK] (/omkarv/IK_JTranspose/test"
          },
          "Test 1": {
            "Status": "Failed",
            "Stderr": "Error message too long, print partially: b\"/omkarv/IK_JTranspose/test_1.js:1845\\n        robot.joints[curJoint].control += kineval.params.ik_steplength * robot.control[index][0];\\n                                                                                             ^\\n\\nTypeError: Cannot read property '0' of undefined\\n    at Object.iterate_inverse_kinematics [as iterateIK] (/omkarv/IK_JTranspose/test"
          },
          "Test 2": {
            "Status": "Failed",
            "Stderr": "Error message too long, print partially: b\"/omkarv/IK_JTranspose/test_2.js:1845\\n        robot.joints[curJoint].control += kineval.params.ik_steplength * robot.control[index][0];\\n                                                                                             ^\\n\\nTypeError: Cannot read property '0' of undefined\\n    at Object.iterate_inverse_kinematics [as iterateIK] (/omkarv/IK_JTranspose/test"
          }
        }
      },
      "IK_JPseudoInverse": {
        "status": "PENDING",
        "comments": [
          "0 out of 3 test cases passed"
        ],
        "test results": {
          "Test 0": {
            "Status": "Failed",
            "Stderr": "Error message too long, print partially: b\"/omkarv/IK_JPseudoInverse/test_0.js:1844\\n        robot.joints[curJoint].control += kineval.params.ik_steplength * robot.control[index][0];\\n                                                                                             ^\\n\\nTypeError: Cannot read property '0' of undefined\\n    at Object.iterate_inverse_kinematics [as iterateIK] (/omkarv/IK_JPseudoInve"
          },
          "Test 1": {
            "Status": "Failed",
            "Stderr": "Error message too long, print partially: b\"/omkarv/IK_JPseudoInverse/test_1.js:1844\\n        robot.joints[curJoint].control += kineval.params.ik_steplength * robot.control[index][0];\\n                                                                                             ^\\n\\nTypeError: Cannot read property '0' of undefined\\n    at Object.iterate_inverse_kinematics [as iterateIK] (/omkarv/IK_JPseudoInve"
          },
          "Test 2": {
            "Status": "Failed",
            "Stderr": "Error message too long, print partially: b\"/omkarv/IK_JPseudoInverse/test_2.js:1844\\n        robot.joints[curJoint].control += kineval.params.ik_steplength * robot.control[index][0];\\n                                                                                             ^\\n\\nTypeError: Cannot read property '0' of undefined\\n    at Object.iterate_inverse_kinematics [as iterateIK] (/omkarv/IK_JPseudoInve"
          }
        }
      },
      "MotionPlan_Collision": {
        "status": "PENDING",
        "comments": [
          "1 out of 3 test cases passed"
        ],
        "test results": {
          "Test 0": {
            "Status": "Failed",
            "Stderr": "Error message too long, print partially: b'/omkarv/MotionPlan_Collision/test_0.js:1012\\n        var mJ = quaternion_to_rotation_matrix(quaternion_normalize(quaternion_from_axisangle(angle,joint.axis))); \\n                 ^\\n\\nReferenceError: quaternion_to_rotation_matrix is not defined\\n    at traverse_collision_forward_kinematics_joint (/omkarv/MotionPlan_Collision/test_0.js:1012:18)\\n    at traverse_colli"
          },
          "Test 1": {
            "Status": "Failed",
            "Stderr": "Error message too long, print partially: b'/omkarv/MotionPlan_Collision/test_1.js:1012\\n        var mJ = quaternion_to_rotation_matrix(quaternion_normalize(quaternion_from_axisangle(angle,joint.axis))); \\n                 ^\\n\\nReferenceError: quaternion_to_rotation_matrix is not defined\\n    at traverse_collision_forward_kinematics_joint (/omkarv/MotionPlan_Collision/test_1.js:1012:18)\\n    at traverse_colli"
          },
          "Test 2": {
            "Status": "Succeed",
            "Stderr": "b''"
          }
        }
      },
      "MotionPlan_2DRRTConnect": {
        "status": "PENDING",
        "comments": [
          "0 out of 4 test cases passed"
        ],
        "test results": {
          "Test 0": {
            "Status": "Failed",
            "Stderr": "b'[ERROR]: Search time out\\n'"
          },
          "Test 1": {
            "Status": "Failed",
            "Stderr": "b'[ERROR]: Search time out\\n'"
          },
          "Test 2": {
            "Status": "Failed",
            "Stderr": "b'[ERROR]: Search time out\\n'"
          },
          "Test 3": {
            "Status": "Failed",
            "Stderr": "b'[ERROR]: Search time out\\n'"
          }
        }
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
        "status": "Takehome: 1.0 Interactive: 1.0"
      },
      {
        "status": "Takehome: 0.75 Interactive: 1.0"
      },
      {
        "status": "Takehome: 0.9 Interactive: 1.0"
      },
      {
        "status": "Takehome (Doubled): 1.3  (No Interactive)"
      },
      {
        "status": "Takehome: 0.75 Interactive: 0.0"
      },
      {
        "status": "Voted in the URDF showcase: 2.0  (No Takehome)"
      },
      {
        "status": "Takehome: 0.5 Interactive: 0.2"
      },
      {
        "status": "Voted in the FSM Dance showcase: 2.0  (No Takehome)"
      },
      {
        "status": "No Quiz 9, 2 points given"
      },
      {
        "status": "No Quiz 10, 2 points given"
      },
      {
        "status": "No Quiz 11, 2 points given"
      }
    ]
  }
}
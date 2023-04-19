//CI grader generates report at 19-04-2023-01-06-52
//Commit hash: 56dc360
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
        "status": "PASS - on time (full credit)",
        "comments": "Passing 3 out of 3 tests"
      },
      "PathPlan_Heap": {
        "status": "PASS - on time (full credit)",
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
        "status": "PASS - on time (full credit)",
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
        "status": "PASS - on time (full credit)",
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
        "status": "PASS - on time (full credit)",
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
        "status": "PASS - on time (full credit)",
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
        "status": "PASS - past two weeks (60% partial credit)",
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
        "status": "PASS - on time (full credit)",
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
        "status": "MISSING",
        "comments": [
          ""
        ]
      },
      "FSMDance_Quaternion": {
        "status": "PASS - on time (full credit)",
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
      "FSMDance_BaseControl": {
        "status": "MISSING",
        "comments": [
          ""
        ]
      },
      "FSMDance_SetpointControl": {
        "status": "PASS - past two weeks (60% partial credit)",
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
      "FSMDance_FSM": {
        "status": "MISSING FSM Dance and presentation",
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
            "Stderr": "Error message too long, print partially: b'/omkarv/IK_Jacobian/test_0.js:1828\\n        let termS = [[robot.joints[name].axis[0]], [robot.joints[name].axis[1]], [robot.joints[jointName].axis[2]], [1]];\\n                                                                                               ^\\n\\nReferenceError: jointName is not defined\\n    at Object.iterate_inverse_kinematics [as iterateIK] (/omkarv/IK"
          },
          "Test 1": {
            "Status": "Failed",
            "Stderr": "Error message too long, print partially: b'/omkarv/IK_Jacobian/test_1.js:1828\\n        let termS = [[robot.joints[name].axis[0]], [robot.joints[name].axis[1]], [robot.joints[jointName].axis[2]], [1]];\\n                                                                                               ^\\n\\nReferenceError: jointName is not defined\\n    at Object.iterate_inverse_kinematics [as iterateIK] (/omkarv/IK"
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
            "Stderr": "Error message too long, print partially: b'/omkarv/IK_JTranspose/test_0.js:1834\\n        let termS = [[robot.joints[name].axis[0]], [robot.joints[name].axis[1]], [robot.joints[jointName].axis[2]], [1]];\\n                                                                                               ^\\n\\nReferenceError: jointName is not defined\\n    at Object.iterate_inverse_kinematics [as iterateIK] (/omkarv/"
          },
          "Test 1": {
            "Status": "Failed",
            "Stderr": "Error message too long, print partially: b'/omkarv/IK_JTranspose/test_1.js:1834\\n        let termS = [[robot.joints[name].axis[0]], [robot.joints[name].axis[1]], [robot.joints[jointName].axis[2]], [1]];\\n                                                                                               ^\\n\\nReferenceError: jointName is not defined\\n    at Object.iterate_inverse_kinematics [as iterateIK] (/omkarv/"
          },
          "Test 2": {
            "Status": "Failed",
            "Stderr": "Error message too long, print partially: b'/omkarv/IK_JTranspose/test_2.js:1834\\n        let termS = [[robot.joints[name].axis[0]], [robot.joints[name].axis[1]], [robot.joints[jointName].axis[2]], [1]];\\n                                                                                               ^\\n\\nReferenceError: jointName is not defined\\n    at Object.iterate_inverse_kinematics [as iterateIK] (/omkarv/"
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
            "Stderr": "Error message too long, print partially: b'/omkarv/IK_JPseudoInverse/test_0.js:1833\\n        let termS = [[robot.joints[name].axis[0]], [robot.joints[name].axis[1]], [robot.joints[jointName].axis[2]], [1]];\\n                                                                                               ^\\n\\nReferenceError: jointName is not defined\\n    at Object.iterate_inverse_kinematics [as iterateIK] (/omk"
          },
          "Test 1": {
            "Status": "Failed",
            "Stderr": "Error message too long, print partially: b'/omkarv/IK_JPseudoInverse/test_1.js:1833\\n        let termS = [[robot.joints[name].axis[0]], [robot.joints[name].axis[1]], [robot.joints[jointName].axis[2]], [1]];\\n                                                                                               ^\\n\\nReferenceError: jointName is not defined\\n    at Object.iterate_inverse_kinematics [as iterateIK] (/omk"
          },
          "Test 2": {
            "Status": "Failed",
            "Stderr": "Error message too long, print partially: b'/omkarv/IK_JPseudoInverse/test_2.js:1833\\n        let termS = [[robot.joints[name].axis[0]], [robot.joints[name].axis[1]], [robot.joints[jointName].axis[2]], [1]];\\n                                                                                               ^\\n\\nReferenceError: jointName is not defined\\n    at Object.iterate_inverse_kinematics [as iterateIK] (/omk"
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
            "Stderr": "b'[ERROR]: Collision test 0 failed\\n'"
          },
          "Test 1": {
            "Status": "Failed",
            "Stderr": "b'[ERROR]: Collision test 1 failed\\n'"
          },
          "Test 2": {
            "Status": "Succeed",
            "Stderr": "b''"
          }
        }
      },
      "MotionPlan_2DRRTConnect": {
        "status": "PASS - within two weeks (80% partial credit)",
        "comments": [
          "4 out of 4 test cases passed"
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
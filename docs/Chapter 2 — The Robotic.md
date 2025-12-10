📘 Chapter 2 — The Robotic Nervous System (ROS 2)
2.1 ROS 2 Overview

ROS 2 = Robot Operating System
Robot ke components ko connect karne ke liye middleware.

2.2 Core Concepts

Nodes: robot ke brain pieces (e.g., camera node, motor node)

Topics: continuous data (camera video, IMU, LiDAR)

Services: request–response (e.g., open_gripper)

Actions: long tasks (navigate to goal)

2.3 rclpy Integration

Python AI agents ko robot se connect karte hain.
Example uses:

Sensor processing

Decision-making

Motor control

2.4 URDF (Unified Robot Description Format)

Humanoid ki “digital skeleton”:

Links (body parts)

Joints (elbow, knee, hip)

Sensors placement

Collision models
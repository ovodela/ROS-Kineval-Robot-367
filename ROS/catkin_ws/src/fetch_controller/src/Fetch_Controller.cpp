#include "Fetch_Controller.hpp"

Fetch_Controller::Fetch_Controller(ros::NodeHandle &nh)
{
    nh_ = nh;

    //TODO: initialize a subscriber that is set to the channel "/base_scan". Set its callback function to be Laser_Scan_Callback
    ros::Subscriber sub = nh_.subscribe("/base_scan", 1000, &Fetch_Controller::Laser_Scan_Callback, this);

    //TODO: initialize a publisher that is set to the channel "/cmd_vel"
    ros::Publisher pub = nh_.advertise<geometry_msgs::Twist>("/cmd_vel", 1000);


    //ros::Rate loop_rate(msg_laser_scan.scan_time);

}

void Fetch_Controller::Laser_Scan_Callback(const sensor_msgs::LaserScan::ConstPtr &msg_laser_scan)
{
    /*TODO: 
    Given the incoming laser scan message, find the minimium distance of the front facing scans
    Hint: The laser scan measuring directly in front of the robot will be the scan at the middle of the array laser scans. 
    So for finding the minimum, we will ONLY consider the 120 laser scans in the middle of the array of laser scans. 
    If the minimum scan in this direction is greater than 1m, drive forward. 
    Otherwise, turn left. 
    */
    ros::Publisher pub;
    geometry_msgs::Twist twist; 

    float mid = msg_laser_scan->angle_max - msg_laser_scan->angle_min;
    float lower_bound = mid - 1.0472;
    float upper_bound = mid + 1.0472; 

    float min_range = 100;
    for (; lower_bound < upper_bound; lower_bound += msg_laser_scan->angle_increment){
        if (msg_laser_scan->ranges[lower_bound] < min_range)
            min_range = msg_laser_scan->ranges[lower_bound];
    }

    if (min_range > 1){
        //linear velocity .5m/s forward
        twist.linear.x = .5;
        twist.linear.y = 0;
        twist.linear.z = 0;
        twist.angular.x = twist.angular.y = twist.angular.z = 0;
    }
    else{
        //turn left 1radian/s
        twist.linear.x = twist.linear.y = twist.linear.z = 0;
        twist.angular.x = 0;
        twist.angular.y = -1;
        twist.angular.z = 0;

    }

    pub.publish(twist);
}

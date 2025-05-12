
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, Calendar, MessageSquare, TrendingUp, User, AlertTriangle, 
  Activity, Map, Bell, PieChart, BarChart3, Check, X, Search
} from "lucide-react";
import { useState } from "react";

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("week");
  
  const stats = [
    {
      title: "Total Active Doctors",
      value: "42",
      change: "+5%",
      trend: "up",
      icon: <Users className="h-6 w-6 text-blue-600" />
    },
    {
      title: "Consultations Today",
      value: "18",
      change: "+12%",
      trend: "up",
      icon: <Calendar className="h-6 w-6 text-green-600" />
    },
    {
      title: "New Feedback",
      value: "24",
      change: "+8%",
      trend: "up",
      icon: <MessageSquare className="h-6 w-6 text-purple-600" />
    },
    {
      title: "Pending Approvals",
      value: "7",
      change: "-2%",
      trend: "down",
      icon: <AlertTriangle className="h-6 w-6 text-amber-600" />
    }
  ];
  
  const recentActivity = [
    {
      id: 1,
      type: "new_doctor",
      name: "Dr. Ananya Sharma",
      specialty: "Dairy Specialist",
      timestamp: "10 minutes ago",
      status: "pending"
    },
    {
      id: 2,
      type: "feedback",
      name: "Farmer Ramesh",
      message: "Great experience with Dr. Patel. Very knowledgeable!",
      timestamp: "2 hours ago",
      rating: 5,
      status: "unread"
    },
    {
      id: 3,
      type: "new_doctor",
      name: "Dr. Vikram Singh",
      specialty: "General Veterinarian",
      timestamp: "Yesterday",
      status: "approved"
    },
    {
      id: 4,
      type: "feedback",
      name: "Farmer Suresh",
      message: "Dr. Kumar was very helpful with my buffalo's treatment.",
      timestamp: "Yesterday",
      rating: 4,
      status: "read"
    }
  ];
  
  const topPerformingDoctors = [
    {
      id: 1,
      name: "Dr. Rahul Sharma",
      specialty: "General Veterinary",
      consultations: 32,
      rating: 4.8
    },
    {
      id: 2,
      name: "Dr. Priya Patel",
      specialty: "Livestock Specialist",
      consultations: 28,
      rating: 4.9
    },
    {
      id: 3,
      name: "Dr. Amit Kumar",
      specialty: "Dairy Health Expert",
      consultations: 26,
      rating: 4.7
    }
  ];
  
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Manage veterinary services and monitor platform performance
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className={timeRange === "week" ? "bg-gray-100" : ""} onClick={() => setTimeRange("week")}>
              Week
            </Button>
            <Button variant="outline" size="sm" className={timeRange === "month" ? "bg-gray-100" : ""} onClick={() => setTimeRange("month")}>
              Month
            </Button>
            <Button variant="outline" size="sm" className={timeRange === "year" ? "bg-gray-100" : ""} onClick={() => setTimeRange("year")}>
              Year
            </Button>
          </div>
        </div>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                <div className="flex items-center mt-1">
                  <span className={`text-xs font-medium ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                    {stat.change}
                  </span>
                  <span className="text-xs text-gray-500 ml-1">vs previous {timeRange}</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                {stat.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Consultations by Region */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Consultations by Region</h2>
            <Button variant="ghost" size="sm">
              View Full Report
            </Button>
          </div>
          <div className="flex h-60 items-center justify-center">
            {/* This would be a chart in production */}
            <div className="text-center">
              <Map className="h-12 w-12 mx-auto mb-3 text-gray-400" />
              <p className="text-gray-500">
                Regional distribution chart would be displayed here
              </p>
            </div>
          </div>
        </Card>
        
        {/* Consultations by Type */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Consultations by Type</h2>
            <Button variant="ghost" size="sm">
              View Full Report
            </Button>
          </div>
          <div className="flex h-60 items-center justify-center">
            {/* This would be a chart in production */}
            <div className="text-center">
              <PieChart className="h-12 w-12 mx-auto mb-3 text-gray-400" />
              <p className="text-gray-500">
                Consultation type distribution chart would be displayed here
              </p>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Recent Activity & Top Doctors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>
          
          <Card className="divide-y divide-gray-100">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="p-4 flex items-start">
                <div className="flex-shrink-0">
                  {activity.type === "new_doctor" ? (
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-purple-600" />
                    </div>
                  )}
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">{activity.name}</p>
                      {activity.type === "new_doctor" ? (
                        <p className="text-sm text-gray-500">{activity.specialty}</p>
                      ) : (
                        <div>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-3 w-3 ${i < activity.rating ? 'text-yellow-500' : 'text-gray-300'}`} 
                                fill={i < activity.rating ? 'currentColor' : 'none'} 
                              />
                            ))}
                          </div>
                          <p className="text-sm text-gray-500 mt-1 line-clamp-1">{activity.message}</p>
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">{activity.timestamp}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    {activity.type === "new_doctor" ? (
                      <div>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            activity.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : activity.status === "pending"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {activity.status === "approved" ? "Approved" : activity.status === "pending" ? "Pending" : "Rejected"}
                        </span>
                      </div>
                    ) : (
                      <div>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            activity.status === "read"
                              ? "bg-gray-100 text-gray-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {activity.status === "read" ? "Read" : "Unread"}
                        </span>
                      </div>
                    )}
                    {activity.type === "new_doctor" && activity.status === "pending" && (
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="h-7 px-2">
                          <Check className="h-4 w-4 text-green-600" />
                        </Button>
                        <Button variant="outline" size="sm" className="h-7 px-2">
                          <X className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    )}
                    {activity.type === "feedback" && (
                      <Button variant="ghost" size="sm" className="h-7 px-2">
                        View
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </Card>
        </section>
        
        {/* Top Performing Doctors */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Top Performing Doctors</h2>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>
          
          <Card className="p-6">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search doctors"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-forest-500 text-sm"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              {topPerformingDoctors.map((doctor, index) => (
                <div key={doctor.id} className={`flex items-start ${index < topPerformingDoctors.length - 1 ? "pb-4 border-b border-gray-100" : ""}`}>
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-lg font-semibold">
                      {doctor.name.charAt(0)}
                    </div>
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">{doctor.name}</p>
                        <p className="text-sm text-gray-500">{doctor.specialty}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{doctor.consultations}</p>
                        <p className="text-xs text-gray-500">consultations</p>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500" fill="currentColor" />
                        <span className="ml-1 text-sm font-medium">{doctor.rating.toFixed(1)}</span>
                      </div>
                      <div className="h-4 w-0.5 bg-gray-200 mx-3"></div>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500 rounded-full" 
                          style={{ width: `${(doctor.consultations / 40) * 100}%` }} 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <Button className="w-full bg-forest-600 hover:bg-forest-700">
                Generate Detailed Report
              </Button>
            </div>
          </Card>
        </section>
      </div>
      
      {/* Alerts and Notifications */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Alerts & Notifications</h2>
          <Button variant="ghost" size="sm">
            Mark All as Read
          </Button>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start">
            <div className="flex-shrink-0">
              <Bell className="h-5 w-5 text-amber-600" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-amber-800">Doctor Verification Required</h3>
              <p className="mt-1 text-sm text-amber-700">
                7 new doctor registrations are pending verification. Please review their credentials.
              </p>
              <div className="mt-2">
                <Button size="sm" variant="outline" className="bg-white text-amber-700 border-amber-300 hover:bg-amber-50">
                  View Pending Verifications
                </Button>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start">
            <div className="flex-shrink-0">
              <Activity className="h-5 w-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">System Update</h3>
              <p className="mt-1 text-sm text-blue-700">
                A new system update will be deployed tonight at 2:00 AM. The platform may be unavailable for 15 minutes.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

// Star component for ratings
const Star = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
};

export default Dashboard;

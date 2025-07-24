import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navigation from "@/components/ui/navigation";
import { useToast } from "@/hooks/use-toast";
import { useAppContext } from "@/contexts/AppContext";
import { 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Eye, 
  MessageCircle, 
  CheckCircle, 
  Clock, 
  X,
  Filter
} from "lucide-react";

interface ArtistSubmission {
  id: number;
  name: string;
  category: string;
  city: string;
  feeRange: string;
  status: "pending" | "approved" | "rejected";
  submittedDate: string;
  rating?: number;
  languages: string[];
  experience: string;
}

interface BookingRequest {
  id: number;
  eventPlanner: string;
  artistName: string;
  eventType: string;
  eventDate: string;
  location: string;
  budget: string;
  status: "pending" | "accepted" | "declined";
  requestDate: string;
  message: string;
}

const Dashboard = () => {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { toast } = useToast();
  const { artists, updateUserStatus, currentUser } = useAppContext();

  // Convert app context artists to dashboard format, including mock data
  const mockArtists: ArtistSubmission[] = [
    {
      id: 1,
      name: "Emma Thompson",
      category: "Singer",
      city: "Austin, TX",
      feeRange: "$600-1200",
      status: "pending",
      submittedDate: "2024-01-20",
      languages: ["English"],
      experience: "8 years"
    },
    {
      id: 2,
      name: "Carlos Rodriguez",
      category: "DJ",
      city: "Miami, FL",
      feeRange: "$400-800",
      status: "approved",
      submittedDate: "2024-01-18",
      rating: 4.8,
      languages: ["English", "Spanish"],
      experience: "6 years"
    }
  ];

  const artistSubmissions: ArtistSubmission[] = [
    ...mockArtists,
    ...artists.map(artist => ({
      id: parseInt(artist.id),
      name: artist.name,
      category: artist.categories[0] || "Artist",
      city: artist.location,
      feeRange: artist.feeRange,
      status: artist.status,
      submittedDate: artist.joinedDate.split('T')[0],
      languages: artist.languages,
      experience: artist.experience || "Not specified"
    }))
  ];

  // Mock data for booking requests
  const bookingRequests: BookingRequest[] = [
    {
      id: 1,
      eventPlanner: "Jessica Miller",
      artistName: "Sophia Martinez",
      eventType: "Wedding Reception",
      eventDate: "2024-02-14",
      location: "New York, NY",
      budget: "$800-1200",
      status: "pending",
      requestDate: "2024-01-22",
      message: "Looking for a romantic singer for our wedding reception. Prefer English and Spanish songs."
    },
    {
      id: 2,
      eventPlanner: "Robert Johnson",
      artistName: "Marcus Johnson",
      eventType: "Corporate Event",
      eventDate: "2024-02-28",
      location: "Los Angeles, CA",
      budget: "$600-900",
      status: "accepted",
      requestDate: "2024-01-21",
      message: "Need a DJ for our annual company party. Electronic/house music preferred."
    },
    {
      id: 3,
      eventPlanner: "Lisa Chen",
      artistName: "Isabella Chen",
      eventType: "Birthday Party",
      eventDate: "2024-02-10",
      location: "San Francisco, CA",
      budget: "$500-700",
      status: "pending",
      requestDate: "2024-01-23",
      message: "Hip-hop dance performance for sweet 16 party. 2-hour performance needed."
    }
  ];

  const stats = [
    { label: "Total Artists", value: "247", icon: Users, change: "+12%" },
    { label: "Active Bookings", value: "34", icon: Calendar, change: "+8%" },
    { label: "Monthly Revenue", value: "$12,450", icon: DollarSign, change: "+23%" },
    { label: "Avg. Rating", value: "4.8", icon: TrendingUp, change: "+0.2" }
  ];

  const handleArtistAction = (artistId: number, action: "approve" | "reject") => {
    const artist = artistSubmissions.find(a => a.id === artistId);
    
    // Update in context if it's a real user (not mock data)
    const contextArtist = artists.find(a => parseInt(a.id) === artistId);
    if (contextArtist) {
      updateUserStatus(contextArtist.id, action === "approve" ? "approved" : "rejected");
    }
    
    toast({
      title: `Artist ${action === "approve" ? "Approved" : "Rejected"}`,
      description: `${artist?.name} has been ${action === "approve" ? "approved" : "rejected"} successfully.`,
    });
  };

  const handleBookingAction = (bookingId: number, action: "accept" | "decline") => {
    const booking = bookingRequests.find(b => b.id === bookingId);
    toast({
      title: `Booking ${action === "accept" ? "Accepted" : "Declined"}`,
      description: `Booking request from ${booking?.eventPlanner} has been ${action}ed.`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case "approved":
      case "accepted":
        return <Badge variant="secondary" className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>;
      case "rejected":
      case "declined":
        return <Badge variant="secondary" className="bg-red-100 text-red-800"><X className="h-3 w-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredSubmissions = statusFilter === "all" 
    ? artistSubmissions 
    : artistSubmissions.filter(submission => submission.status === statusFilter);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Manager Dashboard</h1>
            <p className="text-muted-foreground">Manage artist applications and booking requests</p>
          </div>
          <Button>
            <MessageCircle className="h-4 w-4 mr-2" />
            New Message
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-green-600">{stat.change}</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-gradient-primary flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="artists" className="space-y-6">
          <TabsList className="grid w-full lg:w-[400px] grid-cols-2">
            <TabsTrigger value="artists">Artist Submissions</TabsTrigger>
            <TabsTrigger value="bookings">Booking Requests</TabsTrigger>
          </TabsList>

          {/* Artist Submissions Tab */}
          <TabsContent value="artists">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Artist Submissions ({filteredSubmissions.length})</CardTitle>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Artist</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Fee Range</TableHead>
                      <TableHead>Experience</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSubmissions.map((artist) => (
                      <TableRow key={artist.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{artist.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {artist.languages.join(", ")}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{artist.category}</Badge>
                        </TableCell>
                        <TableCell>{artist.city}</TableCell>
                        <TableCell className="font-medium">{artist.feeRange}</TableCell>
                        <TableCell>{artist.experience}</TableCell>
                        <TableCell>{getStatusBadge(artist.status)}</TableCell>
                        <TableCell>{new Date(artist.submittedDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          {artist.status === "pending" ? (
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                onClick={() => handleArtistAction(artist.id, "approve")}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleArtistAction(artist.id, "reject")}
                              >
                                <X className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </div>
                          ) : (
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Booking Requests Tab */}
          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Recent Booking Requests ({bookingRequests.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event Planner</TableHead>
                      <TableHead>Artist</TableHead>
                      <TableHead>Event Details</TableHead>
                      <TableHead>Budget</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookingRequests.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{booking.eventPlanner}</div>
                            <div className="text-sm text-muted-foreground">
                              {new Date(booking.requestDate).toLocaleDateString()}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{booking.artistName}</div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{booking.eventType}</div>
                            <div className="text-sm text-muted-foreground">
                              {new Date(booking.eventDate).toLocaleDateString()} • {booking.location}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{booking.budget}</TableCell>
                        <TableCell>{getStatusBadge(booking.status)}</TableCell>
                        <TableCell>
                          {booking.status === "pending" ? (
                            <div className="flex gap-2">
                              <Button 
                                size="sm"
                                onClick={() => handleBookingAction(booking.id, "accept")}
                              >
                                Accept
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleBookingAction(booking.id, "decline")}
                              >
                                Decline
                              </Button>
                            </div>
                          ) : (
                            <Button size="sm" variant="outline">
                              <MessageCircle className="h-4 w-4 mr-1" />
                              Message
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
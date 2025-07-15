
import { useState } from 'react';
import { Calendar, Clock, MapPin, User, Phone, Mail, CheckCircle, Undo2, UserCheck, UserX } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

const shortlistedCandidates = [
  {
    id: 1,
    name: 'Sarah Johnson',
    appliedFor: 'Crew Member',
    appliedAt: '2024-01-08',
    shortlistedAt: '2024-01-10',
    status: 'offer-sent'
  },
  {
    id: 2,
    name: 'Marcus Williams',
    appliedFor: 'Cashier',
    appliedAt: '2024-01-07',
    shortlistedAt: '2024-01-09',
    status: 'offer-sent'
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    appliedFor: 'Kitchen Staff',
    appliedAt: '2024-01-06',
    shortlistedAt: '2024-01-08',
    status: 'offer-accepted',
    onboardingDetails: {
      date: '2024-01-15',
      time: '09:00',
      location: 'Main Street Location'
    },
    attendanceStatus: null
  }
];

export const StatusPage = () => {
  const [selectedJob, setSelectedJob] = useState('all');
  const [candidates, setCandidates] = useState(shortlistedCandidates);

  const handleUndoOffer = (candidateId: number) => {
    setCandidates(prev => prev.filter(candidate => candidate.id !== candidateId));
    
    toast({
      title: 'Job offer revoked',
      description: 'The candidate has been removed from your shortlisted candidates.',
    });
  };

  const handleAttendanceUpdate = (candidateId: number, attended: boolean) => {
    setCandidates(prev =>
      prev.map(candidate =>
        candidate.id === candidateId
          ? { ...candidate, attendanceStatus: attended ? 'attended' : 'no-show' }
          : candidate
      )
    );
    
    toast({
      title: attended ? 'Candidate attended' : 'Candidate marked as no-show',
      description: attended 
        ? 'The candidate has been marked as attended for their onboarding.'
        : 'The candidate has been marked as a no-show.',
    });
  };

  const getStatusBadge = (candidate: typeof shortlistedCandidates[0]) => {
    switch (candidate.status) {
      case 'offer-sent':
        return <Badge className="bg-blue-100 text-blue-800">Offer Sent</Badge>;
      case 'offer-accepted':
        return <Badge className="bg-green-100 text-green-800">Offer Accepted</Badge>;
      default:
        return <Badge variant="outline">{candidate.status}</Badge>;
    }
  };

  const getAttendanceBadge = (attendanceStatus: string | null) => {
    if (!attendanceStatus) return null;
    
    switch (attendanceStatus) {
      case 'attended':
        return <Badge className="bg-green-100 text-green-800 ml-2">Attended</Badge>;
      case 'no-show':
        return <Badge className="bg-red-100 text-red-800 ml-2">No Show</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white min-h-screen">
      {/* Job Position Selection */}
      <div className="p-4 bg-gray-50 border-b">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Position
        </label>
        <Select value={selectedJob} onValueChange={setSelectedJob}>
          <SelectTrigger className="w-full bg-white border border-gray-300 max-w-sm">
            <SelectValue placeholder="All positions" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-300 z-50">
            <SelectItem value="all">All positions</SelectItem>
            <SelectItem value="cashier">Cashier</SelectItem>
            <SelectItem value="crew-member">Crew Member</SelectItem>
            <SelectItem value="shift-leader">Shift Leader</SelectItem>
            <SelectItem value="kitchen-staff">Kitchen Staff</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="p-4 space-y-6">
        {/* Shortlisted Candidates */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <CheckCircle className="mr-2 text-green-600" size={20} />
              Shortlisted Candidates ({candidates.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {candidates.map((candidate) => (
                <div key={candidate.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-lg">{candidate.name}</h3>
                        {getStatusBadge(candidate)}
                        {getAttendanceBadge(candidate.attendanceStatus)}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-1" />
                          Applied: {candidate.appliedAt}
                        </div>
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-1" />
                          Shortlisted: {candidate.shortlistedAt}
                        </div>
                      </div>
                      <p className="text-sm font-medium text-blue-600 mb-3">
                        Applied for: {candidate.appliedFor}
                      </p>

                      {/* Onboarding Details */}
                      {candidate.status === 'offer-accepted' && candidate.onboardingDetails && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-3">
                          <h4 className="font-semibold text-green-800 mb-2">Onboarding Details</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                            <div className="flex items-center text-green-700">
                              <Calendar size={16} className="mr-2" />
                              <div>
                                <p className="font-medium">Date</p>
                                <p>{candidate.onboardingDetails.date}</p>
                              </div>
                            </div>
                            <div className="flex items-center text-green-700">
                              <Clock size={16} className="mr-2" />
                              <div>
                                <p className="font-medium">Time</p>
                                <p>{candidate.onboardingDetails.time}</p>
                              </div>
                            </div>
                            <div className="flex items-center text-green-700">
                              <MapPin size={16} className="mr-2" />
                              <div>
                                <p className="font-medium">Location</p>
                                <p>{candidate.onboardingDetails.location}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col space-y-2 ml-4">
                      {/* Attendance tracking buttons for accepted candidates */}
                      {candidate.status === 'offer-accepted' && !candidate.attendanceStatus && (
                        <div className="flex flex-col space-y-2">
                          <Button
                            onClick={() => handleAttendanceUpdate(candidate.id, true)}
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <UserCheck size={14} className="mr-1" />
                            Mark Attended
                          </Button>
                          <Button
                            onClick={() => handleAttendanceUpdate(candidate.id, false)}
                            size="sm"
                            variant="outline"
                            className="border-red-300 text-red-700 hover:bg-red-50"
                          >
                            <UserX size={14} className="mr-1" />
                            Mark No Show
                          </Button>
                        </div>
                      )}
                      
                      <Button
                        onClick={() => handleUndoOffer(candidate.id)}
                        size="sm"
                        variant="outline"
                        className="bg-yellow-50 border-yellow-300 text-yellow-800 hover:bg-yellow-100"
                      >
                        <Undo2 size={14} className="mr-1" />
                        Undo Offer
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              
              {candidates.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <CheckCircle size={48} className="mx-auto mb-4 text-gray-300" />
                  <p>No shortlisted candidates yet</p>
                  <p className="text-sm">Candidates you like in the swipe section will appear here</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

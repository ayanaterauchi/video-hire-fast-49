import { useState } from 'react';
import { Copy, Share2, Edit3, Plus, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

interface ScreeningQuestion {
  id: number;
  question: string;
}

export const JobInfoPage = () => {
  const [selectedJob, setSelectedJob] = useState('crew-member');
  
  const [jobData, setJobData] = useState({
    roleName: 'Crew Member',
    hourlyPay: '$15.00',
    jobType: 'Part-time',
    schedule: 'Weekends, 4-10 PM',
    firstDay: '2024-01-15',
    firstTime: '9:00 AM',
    location: 'Main Street Location',
    extraNotes: 'Flexible scheduling available for students'
  });

  const [screeningQuestions, setScreeningQuestions] = useState<ScreeningQuestion[]>([
    { id: 1, question: 'Are you available to work weekends?' },
    { id: 2, question: 'Do you have reliable transportation?' },
    { id: 3, question: 'Are you 18 years or older?' }
  ]);

  const [interviewQuestions, setInterviewQuestions] = useState([
    'Tell me about yourself and your experience',
    'Why do you want to work in fast food?',
    'How do you handle stressful situations?',
    'Describe your availability and schedule preferences'
  ]);

  const applicationLink = 'https://jobie.app/apply/abc123';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(applicationLink);
    toast({
      title: 'Link copied!',
      description: 'Application link has been copied to clipboard',
    });
  };

  const handleShareLink = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Job Application - ' + jobData.roleName,
        url: applicationLink,
      });
    } else {
      handleCopyLink();
    }
  };

  const addScreeningQuestion = () => {
    const newId = Math.max(...screeningQuestions.map(q => q.id), 0) + 1;
    setScreeningQuestions(prev => [...prev, {
      id: newId,
      question: ''
    }]);
  };

  const updateScreeningQuestion = (id: number, field: keyof ScreeningQuestion, value: string) => {
    setScreeningQuestions(prev =>
      prev.map(q => q.id === id ? { ...q, [field]: value } : q)
    );
  };

  const deleteScreeningQuestion = (id: number) => {
    setScreeningQuestions(prev => prev.filter(q => q.id !== id));
  };

  const addInterviewQuestion = () => {
    setInterviewQuestions(prev => [...prev, '']);
  };

  const updateInterviewQuestion = (index: number, value: string) => {
    setInterviewQuestions(prev =>
      prev.map((q, i) => i === index ? value : q)
    );
  };

  const removeInterviewQuestion = (index: number) => {
    setInterviewQuestions(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-2xl mx-auto bg-white min-h-screen">
      {/* Job Selection */}
      <div className="p-4 bg-gray-50 border-b">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Job Position
        </label>
        <Select value={selectedJob} onValueChange={setSelectedJob}>
          <SelectTrigger className="w-full bg-white border border-gray-300">
            <SelectValue placeholder="Choose a position" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-300 z-50">
            <SelectItem value="cashier">Cashier</SelectItem>
            <SelectItem value="crew-member">Crew Member</SelectItem>
            <SelectItem value="shift-leader">Shift Leader</SelectItem>
            <SelectItem value="kitchen-staff">Kitchen Staff</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="p-4 space-y-6">
        {/* Application Link */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Application Link</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <Input value={applicationLink} readOnly className="flex-1" />
              <Button onClick={handleCopyLink} size="sm" variant="outline">
                <Copy size={16} />
              </Button>
              <Button onClick={handleShareLink} size="sm" variant="outline">
                <Share2 size={16} />
              </Button>
            </div>
            <p className="text-sm text-gray-600">
              Share this link with candidates to apply for the position
            </p>
          </CardContent>
        </Card>

        {/* Job Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              Job Offer Information
              <Edit3 size={16} className="ml-2 text-gray-500" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="roleName">Role Name</Label>
                <Input
                  id="roleName"
                  value={jobData.roleName}
                  onChange={(e) => setJobData(prev => ({ ...prev, roleName: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="hourlyPay">Hourly Pay</Label>
                <Input
                  id="hourlyPay"
                  value={jobData.hourlyPay}
                  onChange={(e) => setJobData(prev => ({ ...prev, hourlyPay: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="jobType">Job Type</Label>
                <Select value={jobData.jobType} onValueChange={(value) => setJobData(prev => ({ ...prev, jobType: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Seasonal">Seasonal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="schedule">Schedule</Label>
                <Input
                  id="schedule"
                  value={jobData.schedule}
                  onChange={(e) => setJobData(prev => ({ ...prev, schedule: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="firstDay">First Day</Label>
                <Input
                  id="firstDay"
                  type="date"
                  value={jobData.firstDay}
                  onChange={(e) => setJobData(prev => ({ ...prev, firstDay: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="firstTime">Start Time</Label>
                <Input
                  id="firstTime"
                  type="time"
                  value={jobData.firstTime}
                  onChange={(e) => setJobData(prev => ({ ...prev, firstTime: e.target.value }))}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="location">Reporting Location</Label>
              <Input
                id="location"
                value={jobData.location}
                onChange={(e) => setJobData(prev => ({ ...prev, location: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="extraNotes">Extra Notes</Label>
              <Textarea
                id="extraNotes"
                value={jobData.extraNotes}
                onChange={(e) => setJobData(prev => ({ ...prev, extraNotes: e.target.value }))}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Screening Questions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              Screening Questions
              <Button onClick={addScreeningQuestion} size="sm" variant="outline">
                <Plus size={16} className="mr-1" />
                Add
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {screeningQuestions.map((sq) => (
                <div key={sq.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <Input
                        value={sq.question}
                        onChange={(e) => updateScreeningQuestion(sq.id, 'question', e.target.value)}
                        placeholder="Enter screening question"
                        className="font-medium"
                      />
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <Button
                        onClick={() => deleteScreeningQuestion(sq.id)}
                        size="sm"
                        variant="ghost"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Interview Questions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              Interview Questions
              <Button onClick={addInterviewQuestion} size="sm" variant="outline">
                <Plus size={16} className="mr-1" />
                Add
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {interviewQuestions.map((question, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500 w-6">{index + 1}.</span>
                  <Input
                    value={question}
                    onChange={(e) => updateInterviewQuestion(index, e.target.value)}
                    placeholder="Enter interview question"
                    className="flex-1"
                  />
                  <Button
                    onClick={() => removeInterviewQuestion(index)}
                    size="sm"
                    variant="ghost"
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

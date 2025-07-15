
import { useState } from 'react';
import { Plus, Save, MapPin, DollarSign, Clock, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

export const AddJobPage = () => {
  const [jobForm, setJobForm] = useState({
    title: '',
    jobType: '',
    hourlyPay: '',
    schedule: '',
    startDate: '',
    location: '',
    description: '',
    requirements: '',
    benefits: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setJobForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: 'Job posted successfully!',
      description: 'Your new job posting is now live and accepting applications.',
    });

    // Reset form
    setJobForm({
      title: '',
      jobType: '',
      hourlyPay: '',
      schedule: '',
      startDate: '',
      location: '',
      description: '',
      requirements: '',
      benefits: ''
    });

    setIsSubmitting(false);
  };

  const isFormValid = jobForm.title && jobForm.jobType && jobForm.hourlyPay;

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Add New Job</h1>
        <p className="text-gray-600">Create a new job posting to attract candidates</p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Basic Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Plus className="mr-2 text-blue-600" size={20} />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title" className="required">Job Title</Label>
              <Input
                id="title"
                value={jobForm.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="e.g., Crew Member, Cashier, Shift Leader"
                required
              />
            </div>

            <div>
              <Label htmlFor="jobType" className="required">Job Type</Label>
              <Select value={jobForm.jobType} onValueChange={(value) => handleInputChange('jobType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="seasonal">Seasonal</SelectItem>
                  <SelectItem value="temporary">Temporary</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Compensation & Schedule */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <DollarSign className="mr-2 text-green-600" size={20} />
              Compensation & Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="hourlyPay" className="required">Hourly Pay</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    id="hourlyPay"
                    value={jobForm.hourlyPay}
                    onChange={(e) => handleInputChange('hourlyPay', e.target.value)}
                    placeholder="15.00"
                    className="pl-8"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="schedule">Schedule</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <Input
                    id="schedule"
                    value={jobForm.schedule}
                    onChange={(e) => handleInputChange('schedule', e.target.value)}
                    placeholder="e.g., Weekends, 4-10 PM"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <Input
                    id="startDate"
                    type="date"
                    value={jobForm.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="location">Work Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <Input
                    id="location"
                    value={jobForm.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="Store address or location name"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Job Details */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Job Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="description">Job Description</Label>
              <Textarea
                id="description"
                value={jobForm.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe the role, responsibilities, and what makes this position great..."
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="requirements">Requirements</Label>
              <Textarea
                id="requirements"
                value={jobForm.requirements}
                onChange={(e) => handleInputChange('requirements', e.target.value)}
                placeholder="List the required skills, experience, or qualifications..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="benefits">Benefits & Perks</Label>
              <Textarea
                id="benefits"
                value={jobForm.benefits}
                onChange={(e) => handleInputChange('benefits', e.target.value)}
                placeholder="Flexible scheduling, employee discounts, growth opportunities..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex space-x-4">
          <Button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            {isSubmitting ? (
              <>
                <span className="animate-spin mr-2">⏳</span>
                Posting Job...
              </>
            ) : (
              <>
                <Save className="mr-2" size={16} />
                Post Job
              </>
            )}
          </Button>
          
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={() => setJobForm({
              title: '',
              jobType: '',
              hourlyPay: '',
              schedule: '',
              startDate: '',
              location: '',
              description: '',
              requirements: '',
              benefits: ''
            })}
          >
            Clear Form
          </Button>
        </div>
      </form>
    </div>
  );
};

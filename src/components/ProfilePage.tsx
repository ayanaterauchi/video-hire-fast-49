import { useState } from 'react';
import { MapPin, Edit3, Plus, Trash2, Building, Users, Phone, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

interface StoreLocation {
  id: number;
  name: string;
  address: string;
  phone: string;
  manager: string;
  activeJobs: number;
  totalHires: number;
}

export const ProfilePage = () => {
  const [managerInfo, setManagerInfo] = useState({
    name: 'Alex Thompson',
    email: 'alex.thompson@franchise.com',
    phone: '(555) 123-4567',
    title: 'Regional Hiring Manager'
  });

  const [locations, setLocations] = useState<StoreLocation[]>([
    {
      id: 1,
      name: 'Main Street Location',
      address: '123 Main St, Anytown, ST 12345',
      phone: '(555) 111-2222',
      manager: 'Sarah Davis',
      activeJobs: 3,
      totalHires: 28
    },
    {
      id: 2,
      name: 'Downtown Plaza',
      address: '456 Plaza Blvd, Anytown, ST 12345',
      phone: '(555) 333-4444',
      manager: 'Mike Rodriguez',
      activeJobs: 2,
      totalHires: 15
    },
    {
      id: 3,
      name: 'Westside Mall',
      address: '789 Mall Dr, Anytown, ST 12345',
      phone: '(555) 555-6666',
      manager: 'Jennifer Kim',
      activeJobs: 1,
      totalHires: 42
    }
  ]);

  const [editingLocation, setEditingLocation] = useState<number | null>(null);
  const [isAddingLocation, setIsAddingLocation] = useState(false);
  const [newLocation, setNewLocation] = useState({
    name: '',
    address: '',
    phone: '',
    manager: ''
  });

  const handleEditLocation = (locationId: number) => {
    setEditingLocation(locationId);
  };

  const handleSaveLocation = (locationId: number) => {
    setEditingLocation(null);
    toast({
      title: 'Location updated',
      description: 'Store location details have been saved successfully.',
    });
  };

  const handleAddLocation = () => {
    if (newLocation.name && newLocation.address) {
      const location: StoreLocation = {
        id: Date.now(),
        ...newLocation,
        activeJobs: 0,
        totalHires: 0
      };
      setLocations(prev => [...prev, location]);
      setNewLocation({ name: '', address: '', phone: '', manager: '' });
      setIsAddingLocation(false);
      toast({
        title: 'Location added',
        description: 'New store location has been added successfully.',
      });
    }
  };

  const handleDeleteLocation = (locationId: number) => {
    setLocations(prev => prev.filter(loc => loc.id !== locationId));
    toast({
      title: 'Location removed',
      description: 'Store location has been removed from your profile.',
    });
  };

  const updateLocationField = (locationId: number, field: string, value: string) => {
    setLocations(prev =>
      prev.map(loc =>
        loc.id === locationId ? { ...loc, [field]: value } : loc
      )
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Profile</h1>
        <p className="text-gray-600">Manage your account and store locations</p>
      </div>

      {/* Manager Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Users className="mr-2 text-blue-600" size={20} />
            Manager Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={managerInfo.name}
                onChange={(e) => setManagerInfo(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="title">Job Title</Label>
              <Input
                id="title"
                value={managerInfo.title}
                onChange={(e) => setManagerInfo(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={managerInfo.email}
                onChange={(e) => setManagerInfo(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={managerInfo.phone}
                onChange={(e) => setManagerInfo(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Store Locations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center justify-between">
            <div className="flex items-center">
              <MapPin className="mr-2 text-green-600" size={20} />
              Store Locations ({locations.length})
            </div>
            <Button
              onClick={() => setIsAddingLocation(true)}
              size="sm"
              className="bg-green-600 hover:bg-green-700"
            >
              <Plus size={16} className="mr-1" />
              Add Location
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Add New Location Form */}
            {isAddingLocation && (
              <div className="border-2 border-dashed border-green-300 rounded-lg p-4 bg-green-50">
                <h3 className="font-semibold mb-3">Add New Store Location</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                  <Input
                    placeholder="Store name"
                    value={newLocation.name}
                    onChange={(e) => setNewLocation(prev => ({ ...prev, name: e.target.value }))}
                  />
                  <Input
                    placeholder="Store manager"
                    value={newLocation.manager}
                    onChange={(e) => setNewLocation(prev => ({ ...prev, manager: e.target.value }))}
                  />
                  <Input
                    placeholder="Address"
                    value={newLocation.address}
                    onChange={(e) => setNewLocation(prev => ({ ...prev, address: e.target.value }))}
                    className="md:col-span-2"
                  />
                  <Input
                    placeholder="Phone number"
                    value={newLocation.phone}
                    onChange={(e) => setNewLocation(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleAddLocation} size="sm">Save Location</Button>
                  <Button
                    onClick={() => {
                      setIsAddingLocation(false);
                      setNewLocation({ name: '', address: '', phone: '', manager: '' });
                    }}
                    variant="outline"
                    size="sm"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* Existing Locations */}
            {locations.map((location) => (
              <div key={location.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                {editingLocation === location.id ? (
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Input
                        value={location.name}
                        onChange={(e) => updateLocationField(location.id, 'name', e.target.value)}
                        placeholder="Store name"
                      />
                      <Input
                        value={location.manager}
                        onChange={(e) => updateLocationField(location.id, 'manager', e.target.value)}
                        placeholder="Store manager"
                      />
                      <Input
                        value={location.address}
                        onChange={(e) => updateLocationField(location.id, 'address', e.target.value)}
                        placeholder="Address"
                        className="md:col-span-2"
                      />
                      <Input
                        value={location.phone}
                        onChange={(e) => updateLocationField(location.id, 'phone', e.target.value)}
                        placeholder="Phone"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button onClick={() => handleSaveLocation(location.id)} size="sm">
                        Save Changes
                      </Button>
                      <Button
                        onClick={() => setEditingLocation(null)}
                        variant="outline"
                        size="sm"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-lg">{location.name}</h3>
                        <div className="flex space-x-2">
                          <Badge variant="outline" className="text-blue-600">
                            {location.activeJobs} active jobs
                          </Badge>
                          <Badge variant="outline" className="text-green-600">
                            {location.totalHires} total hires
                          </Badge>
                        </div>
                      </div>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center">
                          <MapPin size={14} className="mr-2" />
                          {location.address}
                        </div>
                        <div className="flex items-center">
                          <Phone size={14} className="mr-2" />
                          {location.phone}
                        </div>
                        <div className="flex items-center">
                          <Building size={14} className="mr-2" />
                          Manager: {location.manager}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <Button
                        onClick={() => handleEditLocation(location.id)}
                        size="sm"
                        variant="outline"
                      >
                        <Edit3 size={14} />
                      </Button>
                      <Button
                        onClick={() => handleDeleteLocation(location.id)}
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {locations.length === 0 && !isAddingLocation && (
              <div className="text-center py-8 text-gray-500">
                <Building size={48} className="mx-auto mb-4 text-gray-300" />
                <p>No store locations added yet</p>
                <p className="text-sm">Add your first location to get started</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

import { useEffect, useState } from 'react';
import { Package, Search, Filter, Clock, Shield, FileText, ArrowRight, CheckCircle } from 'lucide-react';
import { workspaceDataService } from '@/services/workspaceData';
import type { ServiceCatalogItem } from '@/types/workspace';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

export default function ServiceCatalog() {
  const [services, setServices] = useState<ServiceCatalogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [governanceFilter, setGovernanceFilter] = useState('all');
  const [selectedService, setSelectedService] = useState<ServiceCatalogItem | null>(null);
  const [requestDialogOpen, setRequestDialogOpen] = useState(false);
  const [requestDetails, setRequestDetails] = useState('');

  useEffect(() => {
    loadServiceCatalog();
  }, []);

  const loadServiceCatalog = async () => {
    try {
      setLoading(true);
      const catalog = await workspaceDataService.getServiceCatalog();
      setServices(catalog);
    } catch (error) {
      console.error('Failed to load service catalog:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      searchQuery === '' ||
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = categoryFilter === 'all' || service.category === categoryFilter;
    const matchesGovernance = governanceFilter === 'all' || service.governanceLevel === governanceFilter;

    return matchesSearch && matchesCategory && matchesGovernance;
  });

  const categories = Array.from(new Set(services.map((s) => s.category)));

  const handleRequestService = (service: ServiceCatalogItem) => {
    setSelectedService(service);
    setRequestDetails('');
    setRequestDialogOpen(true);
  };

  const handleSubmitRequest = () => {
    if (selectedService && requestDetails.trim()) {
      // In a real app, this would submit the request
      console.log('Submitting request for:', selectedService.name, requestDetails);
      setRequestDialogOpen(false);
      setSelectedService(null);
      setRequestDetails('');
      // Show success message
      alert('Service request submitted successfully!');
    }
  };

  const getGovernanceBadge = (level: string) => {
    const variants: Record<string, { className: string; label: string }> = {
      Low: { className: 'bg-green-100 text-green-800 border-green-200', label: 'Low Governance' },
      Medium: { className: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: 'Medium Governance' },
      High: { className: 'bg-red-100 text-red-800 border-red-200', label: 'High Governance' },
    };

    const config = variants[level] || variants.Medium;

    return (
      <Badge variant="outline" className={cn('gap-1', config.className)}>
        <Shield className="w-3 h-3" />
        {config.label}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading service catalog...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-teal-100 rounded-lg">
            <Package className="w-6 h-6 text-teal-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Service Catalog</h1>
            <p className="text-gray-600">Browse available AI services and submit requests</p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search services by name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 text-base"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={governanceFilter} onValueChange={setGovernanceFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="All Governance Levels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Governance Levels</SelectItem>
              <SelectItem value="Low">Low Governance</SelectItem>
              <SelectItem value="Medium">Medium Governance</SelectItem>
              <SelectItem value="High">High Governance</SelectItem>
            </SelectContent>
          </Select>
          <div className="ml-auto text-sm text-gray-600">
            Showing {filteredServices.length} of {services.length} services
          </div>
        </div>
      </div>

      {/* Service Cards Grid */}
      {filteredServices.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No services found matching your criteria</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchQuery('');
                setCategoryFilter('all');
                setGovernanceFilter('all');
              }}
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <Card key={service.id} className="flex flex-col hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Package className="w-5 h-5 text-blue-600" />
                  </div>
                  <Badge variant="secondary">{service.category}</Badge>
                </div>
                <CardTitle className="text-lg">{service.name}</CardTitle>
                <CardDescription className="line-clamp-2">{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Est. Duration:</span>
                    <span className="font-medium text-gray-900">{service.estimatedDuration}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <Shield className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      {getGovernanceBadge(service.governanceLevel)}
                    </div>
                  </div>
                  {service.requiresApproval && (
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-orange-500" />
                      <span className="text-orange-700 font-medium">Requires Approval</span>
                    </div>
                  )}
                  {service.template && (
                    <div className="flex items-center gap-2 text-sm">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Template Available</span>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 gap-2"
                  onClick={() => {
                    // View details
                    alert(`Viewing details for: ${service.name}\n\n${service.description}`);
                  }}
                >
                  <FileText className="w-4 h-4" />
                  View Details
                </Button>
                <Button
                  className="flex-1 gap-2"
                  onClick={() => handleRequestService(service)}
                >
                  Request Service
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Service Request Dialog */}
      <Dialog open={requestDialogOpen} onOpenChange={setRequestDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Request Service</DialogTitle>
            <DialogDescription>
              Submit a request for {selectedService?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* Service Info */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Service Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Service:</span>
                  <span className="font-medium text-gray-900">{selectedService?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium text-gray-900">{selectedService?.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Est. Duration:</span>
                  <span className="font-medium text-gray-900">{selectedService?.estimatedDuration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Governance Level:</span>
                  <span className="font-medium text-gray-900">{selectedService?.governanceLevel}</span>
                </div>
                {selectedService?.requiresApproval && (
                  <div className="pt-2 border-t">
                    <p className="text-orange-700 text-xs flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      This service requires manager approval before fulfillment
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Request Form */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="request-details" className="text-sm font-medium mb-2">
                  Request Details *
                </Label>
                <Textarea
                  id="request-details"
                  value={requestDetails}
                  onChange={(e) => setRequestDetails(e.target.value)}
                  placeholder="Describe your requirements, use case, and any specific needs..."
                  rows={6}
                  className="resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Provide as much detail as possible to help us understand your needs
                </p>
              </div>

              {selectedService?.template && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <FileText className="w-4 h-4 text-blue-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-blue-900">Template Available</p>
                      <p className="text-xs text-blue-700 mt-1">
                        A request template is available to help you structure your requirements
                      </p>
                      <Button
                        variant="link"
                        size="sm"
                        className="h-auto p-0 mt-1 text-blue-600"
                        onClick={() => {
                          setRequestDetails(selectedService.template || '');
                        }}
                      >
                        Load Template
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRequestDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitRequest} disabled={!requestDetails.trim()}>
              Submit Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

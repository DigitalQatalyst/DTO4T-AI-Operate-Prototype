import { useState, useEffect } from 'react';
import { Search, Code, Layers, BookOpen, ExternalLink, Filter } from 'lucide-react';
import { SolutionPathway } from '../../types/workspace';
import { workspaceDataService } from '../../services/workspaceData';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';

export default function SolutionPathways() {
  const [pathways, setPathways] = useState<SolutionPathway[]>([]);
  const [filteredPathways, setFilteredPathways] = useState<SolutionPathway[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedComplexity, setSelectedComplexity] = useState<string>('all');
  const [selectedPathway, setSelectedPathway] = useState<SolutionPathway | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);

  useEffect(() => {
    loadPathways();
  }, []);

  useEffect(() => {
    filterPathways();
  }, [searchQuery, selectedCategory, selectedComplexity, pathways]);

  const loadPathways = async () => {
    setLoading(true);
    try {
      const data = await workspaceDataService.getSolutionPathways();
      setPathways(data);
      setFilteredPathways(data);
    } catch (error) {
      console.error('Failed to load solution pathways:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterPathways = () => {
    let filtered = [...pathways];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.technologies.some(t => t.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Complexity filter
    if (selectedComplexity !== 'all') {
      filtered = filtered.filter(p => p.estimatedComplexity === selectedComplexity);
    }

    setFilteredPathways(filtered);
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Low':
        return 'bg-green-100 text-green-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'High':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const categories = Array.from(new Set(pathways.map(p => p.category)));

  const handleViewDetails = (pathway: SolutionPathway) => {
    setSelectedPathway(pathway);
    setDetailDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Solution Pathways</h1>
        <p className="text-gray-600 mt-2">
          Technical approaches, architecture patterns, and implementation templates
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg border space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search pathways, technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedComplexity} onValueChange={setSelectedComplexity}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Complexity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Complexity</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Filter className="h-4 w-4" />
          <span>
            Showing {filteredPathways.length} of {pathways.length} pathways
          </span>
        </div>
      </div>

      {/* Pathways Grid */}
      {filteredPathways.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Code className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No pathways found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filters
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPathways.map((pathway) => (
            <Card key={pathway.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="outline">{pathway.category}</Badge>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getComplexityColor(pathway.estimatedComplexity)}`}>
                    {pathway.estimatedComplexity}
                  </span>
                </div>
                <CardTitle className="text-lg">{pathway.name}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {pathway.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">
                      Architecture
                    </div>
                    <div className="text-sm text-gray-600 line-clamp-2">
                      {pathway.architecture}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">
                      Technologies
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {pathway.technologies.slice(0, 3).map((tech, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {pathway.technologies.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{pathway.technologies.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-4"
                    onClick={() => handleViewDetails(pathway)}
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Detail Dialog */}
      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">{selectedPathway?.category}</Badge>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getComplexityColor(selectedPathway?.estimatedComplexity || '')}`}>
                {selectedPathway?.estimatedComplexity} Complexity
              </span>
            </div>
            <DialogTitle className="text-2xl">{selectedPathway?.name}</DialogTitle>
            <DialogDescription className="text-base">
              {selectedPathway?.description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Architecture */}
            <div>
              <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                <Layers className="h-5 w-5" />
                Architecture Pattern
              </h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">{selectedPathway?.architecture}</p>
              </div>
            </div>

            {/* Technologies */}
            <div>
              <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                <Code className="h-5 w-5" />
                Technologies & Tools
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedPathway?.technologies.map((tech, idx) => (
                  <Badge key={idx} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Documentation */}
            {selectedPathway?.documentationUrl && (
              <div>
                <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Documentation
                </h4>
                <Button variant="outline" asChild>
                  <a 
                    href={selectedPathway.documentationUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    View Full Documentation
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            )}

            {/* Implementation Guide */}
            <div>
              <h4 className="font-semibold text-lg mb-2">Implementation Guide</h4>
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg space-y-2">
                <p className="text-sm text-blue-900">
                  <strong>Estimated Complexity:</strong> {selectedPathway?.estimatedComplexity}
                </p>
                <p className="text-sm text-blue-900">
                  This pathway provides a proven approach for implementing similar solutions.
                  Review the architecture pattern and technologies before starting implementation.
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

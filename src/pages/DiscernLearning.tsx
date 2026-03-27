import { useState, useMemo } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { LCBreadcrumb } from '@/components/learning/LCBreadcrumb';
import { LCTabNavigation } from '@/components/learning/LCTabNavigation';
import { LCSearchBar } from '@/components/learning/LCSearchBar';
import { LCFilterSidebar } from '@/components/learning/LCFilterSidebar';
import { CourseCard } from '@/components/learning/CourseCard';
import { courses } from '@/data/learningData';
import { LearningTab, FilterState } from '@/types/learning';
import { SlidersHorizontal, X } from 'lucide-react';

const emptyFilters: FilterState = {
  department: [],
  category: [],
  provider: [],
  courseType: [],
  rating: [],
  location: [],
  audience: [],
};

const LearningTracksPlaceholder = () => (
  <div className="flex flex-col items-center justify-center py-24 text-center">
    <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mb-4">
      <SlidersHorizontal className="h-7 w-7 text-indigo-400" />
    </div>
    <h3 className="text-base font-semibold text-gray-900 mb-1">Learning Tracks coming soon</h3>
    <p className="text-sm text-gray-500 max-w-xs">Curated learning paths for each role are being built. Check back soon.</p>
  </div>
);

const ReviewsPlaceholder = () => (
  <div className="flex flex-col items-center justify-center py-24 text-center">
    <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center mb-4">
      <span className="text-2xl">⭐</span>
    </div>
    <h3 className="text-base font-semibold text-gray-900 mb-1">Reviews coming soon</h3>
    <p className="text-sm text-gray-500 max-w-xs">Learner reviews and ratings will appear here once courses are completed.</p>
  </div>
);

const DiscernLearning = () => {
  const [activeTab, setActiveTab] = useState<LearningTab>('courses');
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<FilterState>(emptyFilters);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => {
      const current = prev[key];
      return {
        ...prev,
        [key]: current.includes(value)
          ? current.filter(v => v !== value)
          : [...current, value],
      };
    });
  };

  const resetFilters = () => setFilters(emptyFilters);

  const filteredCourses = useMemo(() => {
    let result = [...courses];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
      );
    }

    if (filters.department.length) result = result.filter(c => c.department && filters.department.includes(c.department));
    if (filters.category.length)   result = result.filter(c => c.category && filters.category.includes(c.category));
    if (filters.provider.length)   result = result.filter(c => c.provider && filters.provider.includes(c.provider));
    if (filters.courseType.length) result = result.filter(c => c.courseType && filters.courseType.includes(c.courseType));
    if (filters.location.length)   result = result.filter(c => c.location && filters.location.includes(c.location));
    if (filters.audience.length)   result = result.filter(c => c.audience && filters.audience.includes(c.audience));

    return result;
  }, [search, filters]);

  return (
    <>
      <NavBar />
      <div className="min-h-screen pt-16" style={{ background: '#fafafa' }}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">

          {/* Breadcrumb */}
          <div className="py-4">
            <LCBreadcrumb />
          </div>

          {/* Page header */}
          <div className="mb-5">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">DQ Learning Center</h1>
            <p className="text-base text-gray-500 max-w-3xl">
              Designed for your continuous growth. Access the upskilling and certification tools you need to deliver excellence.
            </p>
          </div>

          {/* Tab navigation */}
          <div className="mb-5">
            <LCTabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          {activeTab === 'courses' && (
            <>
              {/* Info banner */}
              <div className="bg-white border border-gray-200 rounded-xl px-5 py-4 mb-5 shadow-sm">
                <p className="text-sm text-gray-500">
                  Find exactly what you need. Pick and choose individual courses to build your expertise one topic at a time.
                </p>
              </div>

              {/* Search */}
              <div className="mb-6">
                <LCSearchBar
                  value={search}
                  onChange={setSearch}
                  placeholder="Search onboarding flows by title, skill, or tool..."
                />
              </div>

              {/* Two-column layout */}
              <div className="flex gap-6 items-start pb-12">

                {/* Sidebar — desktop */}
                <aside className="hidden lg:block w-64 flex-shrink-0">
                  <LCFilterSidebar
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onReset={resetFilters}
                  />
                </aside>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Results header */}
                  <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                    <span className="text-sm font-bold text-gray-900">
                      Available Courses ({filteredCourses.length})
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-500 hidden sm:inline">
                        Showing {filteredCourses.length} of {courses.length} course{courses.length !== 1 ? 's' : ''}
                      </span>
                      <button
                        onClick={() => setMobileFilterOpen(true)}
                        className="lg:hidden flex items-center gap-1.5 text-sm border border-gray-300 rounded-lg px-3 py-2 bg-white hover:bg-gray-50 transition-colors"
                      >
                        <SlidersHorizontal className="h-4 w-4" />
                        Filters
                      </button>
                    </div>
                  </div>

                  {/* Grid */}
                  {filteredCourses.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                      {filteredCourses.map(course => (
                        <CourseCard key={course.id} course={course} />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                      <p className="text-gray-500 mb-3">
                        No courses found matching <strong>"{search}"</strong>
                      </p>
                      <button
                        onClick={() => setSearch('')}
                        className="flex items-center gap-1.5 text-sm text-indigo-600 hover:underline"
                      >
                        <X className="h-3.5 w-3.5" />
                        Clear search
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {activeTab === 'learning-tracks' && (
            <div className="pb-12"><LearningTracksPlaceholder /></div>
          )}

          {activeTab === 'reviews' && (
            <div className="pb-12"><ReviewsPlaceholder /></div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileFilterOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-xl overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <span className="text-sm font-semibold text-gray-900">Filters</span>
              <button onClick={() => setMobileFilterOpen(false)} aria-label="Close filters">
                <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </button>
            </div>
            <div className="p-4">
              <LCFilterSidebar
                filters={filters}
                onFilterChange={(k, v) => { handleFilterChange(k, v); }}
                onReset={() => { resetFilters(); setMobileFilterOpen(false); }}
              />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default DiscernLearning;

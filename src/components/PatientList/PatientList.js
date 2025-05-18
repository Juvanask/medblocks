import React, { useState, useRef, useEffect } from 'react';
import { Search, Filter, User, Calendar, MapPin, UserCheck } from 'lucide-react';

// Calculate and set hover card position based on event
const calculateHoverPosition = (event, setHoverPosition) => {
  if (!event) return;

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // Default position at cursor
  let top = event.clientY;
  let left = event.clientX + 10;

  // Card dimensions (approximate)
  const cardWidth = 288; // 72 * 4 = 288px (w-72)
  const cardHeight = 400; // approximate height

  // Adjust position if card would go off-screen
  if (left + cardWidth > viewportWidth) {
    left = event.clientX - cardWidth - 10;
  }

  if (top + cardHeight > viewportHeight) {
    top = Math.max(viewportHeight - cardHeight - 10, 10);
  }

  // Make sure card is not positioned too high
  top = Math.max(top, 10);

  setHoverPosition({ top, left });
};

// Patient Card Component
const PatientCard = ({ patient, index, onMouseEnter, onMouseLeave }) => {
  const handleMouseEnter = (e) => {
    if (onMouseEnter) onMouseEnter(e);
  };

  return (
    <div
      key={patient.id}
      className="group relative overflow-hidden bg-gradient-to-r from-white to-[#F7F2EB]/50 p-4 rounded-xl border border-[#BAD6EB]/30 hover:shadow-md hover:shadow-[#BAD6EB]/40 transition-all duration-300 transform hover:-translate-y-1 hover:border-[#7096D1]"
      style={{
        animationDelay: `${index * 50}ms`,
        animation: 'fadeInUp 0.5s ease-out forwards'
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Patient Card Content */}
      <div className="flex items-center justify-between">
        {/* Left Side - Main Info */}
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-10 h-10 bg-gradient-to-br from-[#334EAC] to-[#7096D1] rounded-full flex items-center justify-center shadow-md">
            <span className="text-white font-semibold text-sm">
              {patient.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </span>
          </div>

          {/* Name and Details */}
          <div className="flex-1">
            <h3 className="font-medium text-[#081F5C] text-base group-hover:text-[#334EAC] transition-colors">
              {patient.name}
            </h3>
            <div className="flex items-center gap-3 mt-0.5">
              <div className="flex items-center gap-1 text-[#7096D1]">
                <Calendar size={12} className="text-[#334EAC]" />
                <span className="text-xs">{patient.age} years</span>
              </div>
              {patient.gender && (
                <div className="flex items-center gap-1 text-[#7096D1]">
                  <User size={12} className="text-[#334EAC]" />
                  <span className="text-xs">{patient.gender}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side - Address */}
        {patient.address && (
          <div className="text-right hidden sm:block">
            <div className="flex items-center gap-1 text-[#7096D1] justify-end">
              <MapPin size={12} className="text-[#334EAC]" />
              <span className="text-xs max-w-32 truncate">{patient.address}</span>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Address (visible on small screens) */}
      {patient.address && (
        <div className="sm:hidden mt-2 pt-2 border-t border-[#BAD6EB]/30">
          <div className="flex items-center gap-1 text-[#7096D1]">
            <MapPin size={12} className="text-[#334EAC]" />
            <span className="text-xs">{patient.address}</span>
          </div>
        </div>
      )}

      {/* Hover Effect Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#D0E3FF]/0 to-[#BAD6EB]/0 group-hover:from-[#D0E3FF]/10 group-hover:to-[#BAD6EB]/10 transition-all duration-300 pointer-events-none rounded-xl"></div>
    </div>
  );
};

// Patient Detail Card Component
const PatientDetailCard = ({ patient, onMouseEnter, onMouseLeave, position }) => {
  // Calculate position to ensure popup is visible within viewport
  const style = {
    position: 'fixed',
    animation: 'fadeIn 0.2s ease-out forwards',
    ...position
  };

  return (
    <div
      className="w-72 bg-white shadow-xl rounded-xl overflow-hidden border border-[#BAD6EB] transform transition-all duration-300 opacity-100 z-10"
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-[#334EAC] to-[#7096D1] px-4 py-5 relative">
        {/* Avatar - Larger version */}
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg mx-auto mb-3">
          <span className="text-[#334EAC] font-bold text-xl">
            {patient.name.split(' ').map(n => n[0]).join('').toUpperCase()}
          </span>
        </div>

        {/* Patient Name and Basic Info */}
        <h3 className="text-white font-semibold text-xl text-center">{patient.name}</h3>
        <div className="flex justify-center gap-3 mt-2">
          <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
            {patient.age} years
          </span>
          {patient.gender && (
            <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
              {patient.gender}
            </span>
          )}
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJzdGFycyIgeD0iMCIgeT0iMCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48Y2lyY2xlIGN4PSIxIiBjeT0iMSIgcj0iMSIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjMpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3N0YXJzKSIvPjwvc3ZnPg==')] opacity-30 pointer-events-none"></div>
      </div>

      {/* Details Section */}
      <div className="p-4 bg-[#FFF9F0]/50">
        {/* Patient Details */}
        <div className="space-y-3">
          {/* Address Information */}
          {patient.address && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#D0E3FF] flex items-center justify-center flex-shrink-0">
                <MapPin size={14} className="text-[#334EAC]" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-[#7096D1]">Address</p>
                <p className="text-sm text-[#081F5C]">{patient.address}</p>
              </div>
            </div>
          )}

          {/* Gender Information */}
          {patient.gender && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#D0E3FF] flex items-center justify-center flex-shrink-0">
                <User size={14} className="text-[#334EAC]" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-[#7096D1]">Gender</p>
                <p className="text-sm text-[#081F5C]">{patient.gender}</p>
              </div>
            </div>
          )}

          {/* Age Information */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#D0E3FF] flex items-center justify-center flex-shrink-0">
              <Calendar size={14} className="text-[#334EAC]" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-[#7096D1]">Age</p>
              <p className="text-sm text-[#081F5C]">{patient.age} years old</p>
            </div>
          </div>
        </div>
      </div>

      {/* View Profile Button */}
      <div className="px-4 py-3 bg-[#F7F2EB]/50 border-t border-[#BAD6EB]/30">
        <button className="w-full py-2 bg-[#334EAC] hover:bg-[#081F5C] transition-colors duration-300 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2">
          <User size={14} />
          View Full Profile
        </button>
      </div>
    </div>
  );
};

// Main Patient List Component
const PatientList = ({ patients }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [hoveredPatient, setHoveredPatient] = useState(null);
  const [isHoveringDetail, setIsHoveringDetail] = useState(false);
  const [hoverPosition, setHoverPosition] = useState({ top: 0, left: 0 });
  const hideTimeoutRef = useRef(null);
  const listContainerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  const filteredPatients = patients
    .filter((patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'age') {
        return a.age - b.age;
      }
      return 0;
    });

  return (
    <div className="h-full flex flex-col space-y-4">
      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between flex-shrink-0">
        {/* Search Input */}
        <div className="relative flex-1 min-w-0">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-[#334EAC]" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search patients by name..."
            className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-[#BAD6EB] focus:border-[#334EAC] focus:ring-2 focus:ring-[#D0E3FF] transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm placeholder-[#7096D1] text-sm"
          />
        </div>

        {/* Sort Dropdown */}
        <div className="relative flex-shrink-0">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter size={14} className="text-[#334EAC]" />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="pl-9 pr-8 py-2.5 rounded-lg border border-[#BAD6EB] focus:border-[#334EAC] focus:ring-2 focus:ring-[#D0E3FF] transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm appearance-none cursor-pointer min-w-40 text-sm text-[#081F5C]"
          >
            <option value="name">Sort by Name</option>
            <option value="age">Sort by Age</option>
          </select>
          <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
            <svg className="w-4 h-4 text-[#334EAC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Patients Grid/List - FIXED HEIGHT CONTAINER */}
      <div className="flex-1 overflow-hidden relative">
        <div
          ref={listContainerRef}
          className="overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#BAD6EB] scrollbar-track-transparent"
          style={{
            height: '600px' // Fixed height regardless of content
          }}
        >
          {filteredPatients.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center py-12 bg-white/30 backdrop-blur-sm rounded-xl border border-[#BAD6EB]/30">
              <UserCheck size={40} className="mx-auto text-[#7096D1]/60 mb-3" />
              <p className="text-[#081F5C] text-base font-medium">No patients found</p>
              <p className="text-[#7096D1] text-sm mt-1">Try adjusting your search terms</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredPatients.map((patient, index) => (
                <PatientCard
                  key={patient.id}
                  patient={patient}
                  index={index}
                  onMouseEnter={(e) => {
                    if (hideTimeoutRef.current) {
                      clearTimeout(hideTimeoutRef.current);
                      hideTimeoutRef.current = null;
                    }
                    calculateHoverPosition(e, setHoverPosition);
                    setHoveredPatient(patient);
                  }}
                  onMouseLeave={() => {
                    hideTimeoutRef.current = setTimeout(() => {
                      if (!isHoveringDetail) {
                        setHoveredPatient(null);
                      }
                    }, 300);
                  }}
                />
              ))}
              {/* Empty Placeholder Cards to maintain height when few patients */}
              {filteredPatients.length < 3 && (
                <div style={{ height: `${(3 - filteredPatients.length) * 85}px` }}></div>
              )}
            </div>
          )}
        </div>

        {/* Hover Detail Card - Appears when hovering over a patient */}
        {hoveredPatient && (
          <PatientDetailCard
            patient={hoveredPatient}
            position={hoverPosition}
            onMouseEnter={() => {
              setIsHoveringDetail(true);
              if (hideTimeoutRef.current) {
                clearTimeout(hideTimeoutRef.current);
                hideTimeoutRef.current = null;
              }
            }}
            onMouseLeave={() => {
              setIsHoveringDetail(false);
              hideTimeoutRef.current = setTimeout(() => {
                setHoveredPatient(null);
              }, 300);
            }}
          />
        )}
      </div>

      {/* Results Summary with cosmic theme */}
      {filteredPatients.length > 0 && (
        <div className="flex items-center justify-between pt-3 border-t border-[#BAD6EB]/30 flex-shrink-0">
          <p className="text-xs text-[#7096D1]">
            Showing <span className="font-medium text-[#334EAC]">{filteredPatients.length}</span>
            {searchTerm && (
              <span> of <span className="font-medium">{patients.length}</span></span>
            )} patients
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-xs text-[#334EAC] hover:text-[#081F5C] font-medium hover:underline transition-colors"
            >
              Clear search
            </button>
          )}
        </div>
      )}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default PatientList;

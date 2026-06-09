import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { supabase } from '../../../lib/supabase';
import { Building, Heart, Search, SlidersHorizontal, MapPin, Bed, Bath, Maximize, X } from 'lucide-react';

interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  region: string;
  property_type: string;
  bedrooms: number;
  bathrooms: number;
  area_sqm: number;
  features: string[];
  images: string[];
  status: string;
}

export const ClientProperties: React.FC = () => {
  const { user } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [savedPropertyIds, setSavedPropertyIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    region: [] as string[],
    propertyType: [] as string[],
    minPrice: 0,
    maxPrice: 1000000,
    bedrooms: 0,
  });

  useEffect(() => {
    loadProperties();
    loadSavedProperties();
  }, []);

  const loadProperties = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('status', 'available')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProperties(data || []);
    } catch (error) {
      console.error('Error loading properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadSavedProperties = async () => {
    try {
      const { data, error } = await supabase
        .from('saved_properties')
        .select('property_id')
        .eq('user_id', user?.id);

      if (error) throw error;
      setSavedPropertyIds(new Set(data?.map(item => item.property_id) || []));
    } catch (error) {
      console.error('Error loading saved properties:', error);
    }
  };

  const toggleSaveProperty = async (propertyId: string) => {
    try {
      if (savedPropertyIds.has(propertyId)) {
        await supabase
          .from('saved_properties')
          .delete()
          .eq('user_id', user?.id)
          .eq('property_id', propertyId);

        setSavedPropertyIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(propertyId);
          return newSet;
        });
      } else {
        await supabase
          .from('saved_properties')
          .insert({ user_id: user?.id, property_id: propertyId });

        setSavedPropertyIds(prev => new Set([...prev, propertyId]));
      }
    } catch (error) {
      console.error('Error toggling saved property:', error);
    }
  };

  const filteredProperties = properties.filter(property => {
    if (searchTerm && !property.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !property.location.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    if (filters.region.length > 0 && !filters.region.includes(property.region)) {
      return false;
    }
    if (filters.propertyType.length > 0 && !filters.propertyType.includes(property.property_type)) {
      return false;
    }
    if (property.price < filters.minPrice || property.price > filters.maxPrice) {
      return false;
    }
    if (filters.bedrooms > 0 && property.bedrooms < filters.bedrooms) {
      return false;
    }
    return true;
  });

  const PropertyCard = ({ property }: { property: Property }) => {
    const isSaved = savedPropertyIds.has(property.id);

    return (
      <div className="bg-white rounded-lg overflow-hidden border border-gold/20 hover:shadow-lg transition-shadow">
        <div className="relative h-48 bg-gradient-to-br from-gold/20 to-brown/20">
          {property.images[0] && (
            <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover" />
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleSaveProperty(property.id);
            }}
            className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg hover:bg-cream transition-colors"
          >
            <Heart className={`w-5 h-5 ${isSaved ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
          </button>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-brown mb-2 line-clamp-1">{property.title}</h3>
          <div className="flex items-center text-sm text-brown/60 mb-3">
            <MapPin className="w-4 h-4 mr-1" />
            {property.location}
          </div>
          <p className="text-2xl font-bold text-gold mb-3">€{property.price.toLocaleString()}</p>
          <div className="flex items-center space-x-4 text-sm text-brown/70 mb-4">
            <div className="flex items-center">
              <Bed className="w-4 h-4 mr-1" />
              {property.bedrooms}
            </div>
            <div className="flex items-center">
              <Bath className="w-4 h-4 mr-1" />
              {property.bathrooms}
            </div>
            <div className="flex items-center">
              <Maximize className="w-4 h-4 mr-1" />
              {property.area_sqm}m²
            </div>
          </div>
          <button
            onClick={() => setSelectedProperty(property)}
            className="w-full px-4 py-2 bg-gold text-white rounded-lg hover:bg-gold/90 transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-brown">Loading properties...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-brown">Properties</h1>
          <p className="text-brown/60 mt-1">Browse and save properties that match your investment goals</p>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 border border-gold/20">
        <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brown/40 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by location or title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 border border-gold text-gold rounded-lg hover:bg-gold/10 transition-colors inline-flex items-center space-x-2"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gold/20 grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-brown mb-2">Region</label>
              <select
                className="w-full px-3 py-2 border border-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                onChange={(e) => setFilters({ ...filters, region: e.target.value ? [e.target.value] : [] })}
              >
                <option value="">All Regions</option>
                <option value="Lisbon">Lisbon</option>
                <option value="Porto">Porto</option>
                <option value="Algarve">Algarve</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-brown mb-2">Property Type</label>
              <select
                className="w-full px-3 py-2 border border-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                onChange={(e) => setFilters({ ...filters, propertyType: e.target.value ? [e.target.value] : [] })}
              >
                <option value="">All Types</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="villa">Villa</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-brown mb-2">Max Price</label>
              <select
                className="w-full px-3 py-2 border border-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                onChange={(e) => setFilters({ ...filters, maxPrice: parseInt(e.target.value) })}
              >
                <option value="1000000">Any</option>
                <option value="300000">€300,000</option>
                <option value="500000">€500,000</option>
                <option value="750000">€750,000</option>
                <option value="1000000">€1,000,000</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-brown mb-2">Min Bedrooms</label>
              <select
                className="w-full px-3 py-2 border border-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                onChange={(e) => setFilters({ ...filters, bedrooms: parseInt(e.target.value) })}
              >
                <option value="0">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-sm text-brown/70">
        <span>{filteredProperties.length} properties found</span>
        <button
          onClick={() => {
            const saved = properties.filter(p => savedPropertyIds.has(p.id));
            setProperties(saved.length > 0 ? saved : properties);
          }}
          className="text-gold hover:underline"
        >
          View Saved Only
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      {filteredProperties.length === 0 && (
        <div className="text-center py-12">
          <Building className="w-16 h-16 text-brown/30 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-brown mb-2">No properties found</h3>
          <p className="text-brown/60">Try adjusting your filters to see more results</p>
        </div>
      )}

      {selectedProperty && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-4xl w-full my-8">
            <div className="p-6 border-b border-gold/20 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-brown">{selectedProperty.title}</h2>
              <button
                onClick={() => setSelectedProperty(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-brown" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="aspect-video bg-gradient-to-br from-gold/20 to-brown/20 rounded-lg overflow-hidden">
                {selectedProperty.images[0] && (
                  <img src={selectedProperty.images[0]} alt={selectedProperty.title} className="w-full h-full object-cover" />
                )}
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-brown mb-2">Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-brown/70">Price</span>
                      <span className="font-semibold text-gold">€{selectedProperty.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brown/70">Location</span>
                      <span className="font-medium">{selectedProperty.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brown/70">Type</span>
                      <span className="font-medium capitalize">{selectedProperty.property_type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brown/70">Bedrooms</span>
                      <span className="font-medium">{selectedProperty.bedrooms}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brown/70">Bathrooms</span>
                      <span className="font-medium">{selectedProperty.bathrooms}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brown/70">Area</span>
                      <span className="font-medium">{selectedProperty.area_sqm}m²</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-brown mb-2">Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProperty.features.map((feature, index) => (
                      <span key={index} className="px-3 py-1 bg-gold/10 text-gold rounded-full text-sm">
                        {feature.replace('_', ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-brown mb-2">Description</h3>
                <p className="text-brown/70">{selectedProperty.description}</p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => toggleSaveProperty(selectedProperty.id)}
                  className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                    savedPropertyIds.has(selectedProperty.id)
                      ? 'bg-red-100 text-red-600 hover:bg-red-200'
                      : 'bg-gold/10 text-gold hover:bg-gold/20'
                  }`}
                >
                  {savedPropertyIds.has(selectedProperty.id) ? 'Remove from Saved' : 'Save Property'}
                </button>
                <button className="flex-1 px-4 py-2 bg-gold text-white rounded-lg hover:bg-gold/90 transition-colors">
                  Contact Agent
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

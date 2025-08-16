import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactInfoFetcher = () => {
  const [contactInfo, setContactInfo] = useState({
    address: '',
    phone: '',
    email: '',
    map: '',
    workingHours: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      setLoading(true);
      
      // Fetch all settings from the public endpoint
      const response = await axios.get('/api/frontend/admin/settings/public');
      
      if (response.data.success) {
        const settings = response.data.data;
        
        // Extract contact information
        const contactData = {
          address: settings.find(s => s.key === 'contact_address')?.value || '',
          phone: settings.find(s => s.key === 'contact_phone')?.value || '',
          email: settings.find(s => s.key === 'contact_email')?.value || '',
          map: settings.find(s => s.key === 'contact_map')?.value || '',
          workingHours: settings.find(s => s.key === 'contact_working_hours')?.value || ''
        };
        
        setContactInfo(contactData);
      }
    } catch (err) {
      setError('Failed to load contact information');
      console.error('Error fetching contact info:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-4">Loading contact information...</div>;
  if (error) return <div className="text-red-500 text-center py-4">{error}</div>;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Contact Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Address</h3>
            <p className="text-gray-600">{contactInfo.address || 'Not provided'}</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Phone</h3>
            <p className="text-gray-600">{contactInfo.phone || 'Not provided'}</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Email</h3>
            <p className="text-gray-600">{contactInfo.email || 'Not provided'}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Working Hours</h3>
            <p className="text-gray-600">{contactInfo.workingHours || 'Not provided'}</p>
          </div>
          
          {contactInfo.map && (
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Location Map</h3>
              <div dangerouslySetInnerHTML={{ __html: contactInfo.map }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactInfoFetcher;

import React, { useState, useEffect } from 'react';
import CropService from '../services/CropService';
import CropList from '../components/CropList';

const Marketplace = () => {
    const [crops, setCrops] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        loadCrops();
    }, []);

    const loadCrops = async () => {
        try {
            setLoading(true);
            const response = await CropService.getAllCrops();
            const sortedCrops = (response.data || []).sort((a, b) => b.id - a.id);
            setCrops(sortedCrops);
        } catch (err) {
            setError('Failed to load marketplace crops');
            console.error('Error loading crops:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Marketplace</h1>
                            <p className="mt-1 text-sm text-gray-600">
                                Explore certified crops from verifiable farmers.
                            </p>
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                            {error}
                        </div>
                    )}

                    {loading ? (
                        <div className="text-center py-12">
                            <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-green-500 mx-auto"></div>
                            <p className="mt-4 text-gray-600 font-medium">Loading marketplace...</p>
                        </div>
                    ) : (
                        <CropList crops={crops} showVerification={true} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Marketplace;

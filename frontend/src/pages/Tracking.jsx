import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LogisticsService from '../services/LogisticsService';

const Tracking = () => {
    const { orderId } = useParams();
    const user = JSON.parse(localStorage.getItem('user'));
    const isFarmer = user?.role === 'FARMER';
    const [shipment, setShipment] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [updateForm, setUpdateForm] = useState({
        location: '',
        temperature: 20,
        humidity: 60,
        status: 'IN_TRANSIT'
    });
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        loadShipment();
    }, [orderId]);

    const loadShipment = async () => {
        try {
            setLoading(true);
            const response = await LogisticsService.getShipmentByOrder(orderId);
            setShipment(response.data);
            if (response.data) {
                setUpdateForm({
                    location: response.data.currentLocation || '',
                    temperature: response.data.temperature || 20,
                    humidity: response.data.humidity || 60,
                    status: response.data.status
                });
            }
        } catch (err) {
            setError('Shipment tracking information not found.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            setUpdating(true);
            await LogisticsService.updateShipment(shipment.id, updateForm);
            await loadShipment();
        } catch (err) {
            setError('Failed to update shipment');
        } finally {
            setUpdating(false);
        }
    };

    const getStepStatus = (step) => {
        const statuses = ['IN_TRANSIT', 'DELAYED', 'DELIVERED'];
        const currentIdx = statuses.indexOf(shipment.status);
        const stepIdx = statuses.indexOf(step);
        if (shipment.status === 'DELIVERED') return 'completed';
        if (stepIdx < currentIdx) return 'completed';
        if (stepIdx === currentIdx) return 'active';
        return 'pending';
    };

    if (loading) return (
        <div className="flex flex-col justify-center items-center py-24 bg-neutral-900 min-h-screen">
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-green-500 border-opacity-50"></div>
            <p className="mt-6 text-green-500 font-mono tracking-widest animate-pulse">ESTABLISHING UPLINK...</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-neutral-950 py-12 px-4 sm:px-6 lg:px-8 font-sans transition-all duration-700">
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <h1 className="text-5xl font-black text-white tracking-tighter mb-2">
                            Tracking <span className="text-green-500">Live</span>
                        </h1>
                        <p className="text-neutral-500 font-mono text-sm tracking-widest bg-white/5 inline-block px-3 py-1 rounded-lg">ID: {orderId.padStart(8, '0')}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-neutral-500 text-[10px] font-black uppercase tracking-[0.3em] mb-1">Current Status</p>
                        <div className="px-6 py-2 bg-green-500/10 border border-green-500/20 rounded-full">
                            <p className="text-xl font-black text-green-400 tracking-tight">{shipment?.status}</p>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-6 py-4 rounded-3xl mb-8 flex items-center shadow-2xl backdrop-blur-md">
                        <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span className="font-bold">{error}</span>
                    </div>
                )}

                {shipment && (
                    <div className="space-y-8">
                        {/* Visual Timeline */}
                        <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 p-10 overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-4">
                                <div className="flex items-center gap-2">
                                    <span className="h-2 w-2 bg-green-500 rounded-full animate-ping"></span>
                                    <span className="text-[10px] text-green-500 font-black tracking-widest">LIVE SENSOR FEED</span>
                                </div>
                            </div>

                            <div className="relative flex justify-between items-center max-w-2xl mx-auto mb-16 mt-6">
                                {/* Connector Line */}
                                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-white/10 rounded-full">
                                    <div
                                        className="h-full bg-green-500 transition-all duration-1000 shadow-[0_0_15px_rgba(34,197,94,0.5)]"
                                        style={{ width: shipment.status === 'DELIVERED' ? '100%' : shipment.status === 'IN_TRANSIT' ? '50%' : '50%' }}
                                    ></div>
                                </div>

                                {[
                                    { id: 'FARM', label: 'Farmer', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', status: 'completed' },
                                    { id: 'TRANSIT', label: 'Transit', icon: 'M13 10V3L4 14h7v7l9-11h-7z', status: getStepStatus('IN_TRANSIT') === 'completed' || getStepStatus('IN_TRANSIT') === 'active' ? 'active' : 'pending' },
                                    { id: 'DEST', label: 'Delivered', icon: 'M5 13l4 4L19 7', status: getStepStatus('DELIVERED') }
                                ].map((step, idx) => (
                                    <div key={idx} className="relative z-10 flex flex-col items-center">
                                        <div className={`h-16 w-16 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-2xl ${step.status === 'completed' ? 'bg-green-500 text-white' :
                                                step.status === 'active' ? 'bg-white text-neutral-900 scale-125' :
                                                    'bg-neutral-800 text-neutral-500 shadow-inner'
                                            }`}>
                                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={step.icon} />
                                            </svg>
                                        </div>
                                        <p className={`mt-4 text-xs font-black uppercase tracking-widest ${step.status === 'active' ? 'text-white' : 'text-neutral-500'}`}>{step.label}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/5">
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-[10px] text-neutral-500 font-black uppercase tracking-widest mb-1">Current Coordinates</p>
                                        <p className="text-xl font-bold text-white flex items-center gap-2 group cursor-pointer hover:text-green-400 transition-colors">
                                            <svg className="h-5 w-5 text-red-500 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                            </svg>
                                            {shipment.currentLocation}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-neutral-500 font-black uppercase tracking-widest mb-1">Last Transmission</p>
                                        <p className="text-lg font-medium text-neutral-300">{new Date(shipment.lastUpdated).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-end">
                                    {shipment.blockchainTxHash && (
                                        <div className="bg-green-500/5 border border-green-500/20 p-5 rounded-3xl w-full">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="h-2 w-2 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,1)]"></div>
                                                <p className="text-[10px] text-green-500 font-black uppercase tracking-widest">Decentralized Log Ledger</p>
                                            </div>
                                            <p className="text-[10px] text-neutral-500 font-mono break-all line-clamp-2">{shipment.blockchainTxHash}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* IoT Sensor Metrics */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="group relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800 rounded-[2rem] p-8 shadow-2xl transition-transform hover:scale-[1.02]">
                                <div className="absolute -top-10 -right-10 h-40 w-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all"></div>
                                <div className="relative flex justify-between items-start">
                                    <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl text-white">
                                        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-blue-100/60 text-xs font-black uppercase tracking-widest mb-1">Temperature</p>
                                        <p className="text-5xl font-black text-white">{shipment.temperature}<span className="text-2xl text-blue-200">°C</span></p>
                                    </div>
                                </div>
                                <div className="mt-8 h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-white transition-all duration-1000" style={{ width: `${(shipment.temperature / 40) * 100}%` }}></div>
                                </div>
                            </div>

                            <div className="group relative overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-800 rounded-[2rem] p-8 shadow-2xl transition-transform hover:scale-[1.02]">
                                <div className="absolute -bottom-10 -left-10 h-40 w-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all"></div>
                                <div className="relative flex justify-between items-start">
                                    <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl text-white">
                                        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                        </svg>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-indigo-100/60 text-xs font-black uppercase tracking-widest mb-1">Humidity</p>
                                        <p className="text-5xl font-black text-white">{shipment.humidity}<span className="text-2xl text-indigo-200">%</span></p>
                                    </div>
                                </div>
                                <div className="mt-8 h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-white transition-all duration-1000" style={{ width: `${shipment.humidity}%` }}></div>
                                </div>
                            </div>
                        </div>

                        {/* Control Interface */}
                        {isFarmer && shipment.status !== 'DELIVERED' && (
                            <div className="bg-white rounded-[2.5rem] shadow-2xl border border-neutral-100 p-10 mt-12">
                                <h3 className="text-2xl font-black text-neutral-900 mb-8 flex items-center gap-3">
                                    <div className="h-10 w-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                        </svg>
                                    </div>
                                    IoT Control Panel
                                </h3>
                                <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="text-xs font-black text-neutral-400 uppercase tracking-widest block mb-3">Transmission Point (Location)</label>
                                        <input
                                            type="text"
                                            value={updateForm.location}
                                            onChange={(e) => setUpdateForm({ ...updateForm, location: e.target.value })}
                                            className="w-full px-6 py-4 bg-neutral-50 border-2 border-transparent focus:border-green-500 focus:bg-white rounded-2xl transition-all font-semibold outline-none"
                                            placeholder="Enter current city or facility..."
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-black text-neutral-400 uppercase tracking-widest block mb-3">Sensor: Temp (°C)</label>
                                        <input
                                            type="number"
                                            value={updateForm.temperature}
                                            onChange={(e) => setUpdateForm({ ...updateForm, temperature: parseFloat(e.target.value) })}
                                            className="w-full px-6 py-4 bg-neutral-50 border-2 border-transparent focus:border-green-500 focus:bg-white rounded-2xl transition-all font-semibold outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-black text-neutral-400 uppercase tracking-widest block mb-3">Sensor: Humidity (%)</label>
                                        <input
                                            type="number"
                                            value={updateForm.humidity}
                                            onChange={(e) => setUpdateForm({ ...updateForm, humidity: parseFloat(e.target.value) })}
                                            className="w-full px-6 py-4 bg-neutral-50 border-2 border-transparent focus:border-green-500 focus:bg-white rounded-2xl transition-all font-semibold outline-none"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="text-xs font-black text-neutral-400 uppercase tracking-widest block mb-3">Master Status Override</label>
                                        <div className="grid grid-cols-3 gap-3">
                                            {['IN_TRANSIT', 'DELAYED', 'DELIVERED'].map((stat) => (
                                                <button
                                                    key={stat}
                                                    type="button"
                                                    onClick={() => setUpdateForm({ ...updateForm, status: stat })}
                                                    className={`px-4 py-3 rounded-xl font-bold text-[10px] tracking-widest uppercase transition-all ${updateForm.status === stat ? 'bg-neutral-900 text-white shadow-xl' : 'bg-neutral-50 text-neutral-400 hover:bg-neutral-100'
                                                        }`}
                                                >
                                                    {stat.replace('_', ' ')}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={updating}
                                        className="md:col-span-2 mt-4 px-10 py-5 bg-green-600 text-white font-black text-sm tracking-[0.2em] rounded-[1.5rem] shadow-2xl shadow-green-100 hover:bg-green-700 hover:-translate-y-1 active:scale-95 transition-all disabled:opacity-50"
                                    >
                                        {updating ? 'TRANSMITTING...' : 'UPDATE SHIPMENT LOG'}
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Tracking;

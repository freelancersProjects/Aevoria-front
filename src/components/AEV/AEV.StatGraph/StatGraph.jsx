import React, { useState } from 'react';
import {
    LineChart, Line,
    BarChart, Bar,
    PieChart, Pie, Cell,
    XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';
import AEVDropdown from '../AEV.Dropdown/Dropdown';
import './StatGraph.scss';

const chartOptions = ['Line', 'Bar', 'Pie'];

const StatGraph = ({ data, labelKey = 'label', dataKey = 'value' }) => {
    const [selectedChart, setSelectedChart] = useState('Line');
    const colors = ['#007bff', '#00eaff', '#ff47c4', '#ffc800', '#3dfaff'];

    return (
        <div className="stat-graph">
            <div className="stat-graph-header">
                <h3 className="font-montserrat">Stat Overview</h3>
                <AEVDropdown
                    label="Chart Type"
                    value={selectedChart}
                    options={chartOptions}
                    onSelect={setSelectedChart}
                    size="sm"
                />
            </div>

            <div className="graph-wrapper">
                <ResponsiveContainer width="100%" height={300}>
                    {selectedChart === 'Line' && (
                        <LineChart data={data}>
                            <XAxis dataKey={labelKey} stroke="#ccc" />
                            <YAxis stroke="#ccc" />
                            <Tooltip />
                            <Line type="monotone" dataKey={dataKey} stroke="#00bfff" strokeWidth={2} />
                        </LineChart>
                    )}

                    {selectedChart === 'Bar' && (
                        <BarChart data={data}>
                            <XAxis dataKey={labelKey} stroke="#ccc" />
                            <YAxis stroke="#ccc" />
                            <Tooltip />
                            <Bar dataKey={dataKey} fill="#007bff" />
                        </BarChart>
                    )}

                    {selectedChart === 'Pie' && (
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey={dataKey}
                                nameKey={labelKey}
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#00eaff"
                                label
                            >
                                {data.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    )}
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default StatGraph;

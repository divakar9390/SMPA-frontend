import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../Context_api";

import {
  Shield, AlertTriangle, Lock
} from 'lucide-react';
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const AnalyzePage = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const [link, setLink] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);

  // Helper functions as before...

  const analyzeProfile = async (profileLink) => {
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    const mockData = {
      platform: detectPlatform(profileLink),
      privacyScore: Math.floor(Math.random() * 5) + 1,
      user: {
        username: `user${Math.floor(Math.random() * 10000)}`,
        followers: Math.floor(Math.random() * 2000) + 200,
        following: Math.floor(Math.random() * 1000) + 100,
      },
      privacySettings: {
        twoFactorAuth: Math.random() > 0.5,
        privateAccount: Math.random() > 0.5,
        limitedDataSharing: Math.random() > 0.5,
        hiddenFriendsList: Math.random() > 0.5,
        locationTrackingOff: Math.random() > 0.5,
        limitedTagging: Math.random() > 0.5
      },
      threats: generateThreats(),
      recommendations: generateRecommendations()
    };

    setAnalysisData(mockData);
    setIsAnalyzing(false);
    setShowResults(true);
  };

  const detectPlatform = (link) => {
    if (link.includes('facebook.com') || link.includes('fb.com')) return 'Facebook';
    if (link.includes('instagram.com')) return 'Instagram';
    if (link.includes('twitter.com') || link.includes('x.com')) return 'Twitter/X';
    if (link.includes('linkedin.com')) return 'LinkedIn';
    if (link.includes('tiktok.com')) return 'TikTok';
    if (link.includes('youtube.com')) return 'YouTube';
    return 'Unknown Platform';
  };

  const generateThreats = () => {
    const threats = [
      { level: 'High', threat: 'Identity Theft', description: 'Personal info exposed can be used for fraud' },
      { level: 'Medium', threat: 'Social Engineering', description: 'Details can be used for manipulation' },
      { level: 'High', threat: 'Location Tracking', description: 'Posts may reveal your home location' },
      { level: 'Medium', threat: 'Data Harvesting', description: 'Apps collecting data without consent' },
      { level: 'Low', threat: 'Unwanted Contact', description: 'Public profiles allow stranger messages' },
      { level: 'High', threat: 'Reputation Damage', description: 'Posts may harm reputation' },
    ];
    return threats.slice(0, Math.floor(Math.random() * 4) + 3);
  };

  const generateRecommendations = () => [
    {
      priority: 'High',
      category: 'Account Security',
      action: 'Enable Two-Factor Authentication',
      description: 'Adds an extra layer of protection',
      impact: 'Reduces account takeover risk by 99%'
    },
    {
      priority: 'High',
      category: 'Privacy Settings',
      action: 'Make Account Private',
      description: 'Restricts visibility to approved followers',
      impact: 'Prevents strangers accessing info'
    },
    {
      priority: 'Medium',
      category: 'Data Sharing',
      action: 'Revoke Third-Party App Access',
      description: 'Limit app permissions for privacy',
      impact: 'Reduces data collection risk'
    },
    {
      priority: 'Low',
      category: 'Profile Info',
      action: 'Remove Contact Info',
      description: 'Avoid displaying email or phone publicly',
      impact: 'Limits spam and abuse'
    }
  ];

  const getScoreColor = (score) => {
    if (score >= 4) return 'text-success';
    if (score >= 3) return 'text-warning';
    return 'text-danger';
  };

  const getScoreLabel = (score) => {
    if (score >= 4) return 'Good Privacy';
    if (score >= 3) return 'Moderate Privacy';
    return 'Poor Privacy';
  };

  const getThreatColor = (level) => {
    switch (level) {
      case 'High': return 'border border-danger bg-danger bg-opacity-10 text-danger';
      case 'Medium': return 'border border-warning bg-warning bg-opacity-10 text-warning';
      case 'Low': return 'border border-success bg-success bg-opacity-10 text-success';
      default: return 'border border-secondary';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-danger';
      case 'Medium': return 'bg-warning';
      case 'Low': return 'bg-success';
      default: return 'bg-secondary';
    }
  };

  const privacyScoreData = analysisData ? [
    { name: 'Secure', value: analysisData.privacyScore, fill: '#198754' },
    { name: 'At Risk', value: 5 - analysisData.privacyScore, fill: '#dc3545' }
  ] : [];

  const privacySettingsData = analysisData ? Object.entries(analysisData.privacySettings).map(([key, value]) => ({
    setting: key.replace(/([A-Z])/g, ' $1'),
    status: value ? 1 : 0
  })) : [];

  const threatChartData = analysisData ? Object.entries(
    analysisData.threats.reduce((acc, threat) => {
      acc[threat.level] = (acc[threat.level] || 0) + 1;
      return acc;
    }, {})
  ).map(([level, count]) => ({
    level,
    count
  })) : [];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#7f7f92ff', color: '#fff' }}>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#000', color: '#fff' }}>
        <div className="container-fluid text-white">
          
        </div>
      </nav>

      <div className="container py-5">
        <div className="bg-white bg-opacity-10 p-4 rounded-4 mb-4">
          <h2 className="text-white text-center mb-3">Analyze Your Social Media Privacy</h2>
          <label className="form-label text-white">Profile Link</label>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="https://facebook.com/yourprofile"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            style={{ height: '35px', fontSize: '0.875rem' }}  // smaller input size
          />
          <button
            onClick={() => analyzeProfile(link)}
            disabled={isAnalyzing}
            className="btn btn-primary w-100 d-flex justify-content-center align-items-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <div className="spinner-border spinner-border-sm text-light"></div>
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Shield size={18} />
                <span>Analyze Privacy</span>
              </>
            )}
          </button>
        </div>

        {showResults && analysisData && (
          <>
            {/* User Info */}
            <div className="bg-white bg-opacity-10 p-4 rounded-4 mb-4">
              <h3 className="text-white text-center">User Overview</h3>
              <div className="d-flex justify-content-around text-white mt-3">
                <div className="text-center">
                  <p className="fw-bold mb-1">Username</p>
                  <span className="text-info">{analysisData.user.username}</span>
                </div>
                <div className="text-center">
                  <p className="fw-bold mb-1">Followers</p>
                  <span className="text-info">{analysisData.user.followers}</span>
                </div>
                <div className="text-center">
                  <p className="fw-bold mb-1">Following</p>
                  <span className="text-info">{analysisData.user.following}</span>
                </div>
              </div>
            </div>

            {/* Privacy Score */}
            <div className="bg-white bg-opacity-10 p-4 rounded-4 mb-4">
              <h3 className="text-white text-center">Privacy Score</h3>
              <div className="text-center mb-3">
                <div
                  className="rounded-circle d-inline-flex justify-content-center align-items-center text-white"
                  style={{
                    width: '120px',
                    height: '120px',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    background: 'linear-gradient(to right, #3b82f6, #9333ea)'
                  }}
                >
                  {analysisData.privacyScore}/5
                </div>
                <p className={`fw-bold mt-3 ${getScoreColor(analysisData.privacyScore)}`}>
                  {getScoreLabel(analysisData.privacyScore)}
                </p>
                <p className="text-white-50">Platform: {analysisData.platform}</p>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie data={privacyScoreData} dataKey="value" cx="50%" cy="50%" innerRadius={60} outerRadius={90}>
                        {privacyScoreData.map((entry, index) => (
                          <Cell key={index} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="col-md-6">
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={privacySettingsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="setting" tick={{ fill: 'white' }} />
                      <YAxis tick={{ fill: 'white' }} />
                      <Tooltip />
                      <Bar dataKey="status" fill="#0d6efd" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Threats */}
            <div className="bg-white bg-opacity-10 p-4 rounded-4 mb-4">
              <h3 className="text-white d-flex align-items-center gap-2">
                <AlertTriangle className="text-warning" size={20} /> Potential Threats
              </h3>
              <div className="row">
                <div className="col-md-6">
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={threatChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="level" tick={{ fill: 'white' }} />
                      <YAxis tick={{ fill: 'white' }} />
                      <Tooltip />
                      <Bar dataKey="count" fill="#dc3545" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="col-md-6">
                  {analysisData.threats.map((t, i) => (
                    <div key={i} className={`p-3 mb-2 rounded ${getThreatColor(t.level)}`}>
                      <div className="d-flex justify-content-between mb-1">
                        <strong>{t.threat}</strong>
                        <span className="badge bg-light text-dark">{t.level}</span>
                      </div>
                      <p className="small mb-0">{t.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white bg-opacity-10 p-4 rounded-4 mb-4">
              <h3 className="text-white d-flex align-items-center gap-2">
                <Lock className="text-success" size={20} /> Privacy Recommendations
              </h3>
              {analysisData.recommendations.map((r, i) => (
                <div key={i} className="p-3 mb-3 rounded border border-light text-white bg-white bg-opacity-25">
                  <div className="d-flex justify-content-between">
                    <h5>{r.action}</h5>
                    <span className={`badge ${getPriorityColor(r.priority)} text-white`}>{r.priority}</span>
                  </div>
                  <p>{r.description}</p>
                  <p className="text-success small">Impact: {r.impact}</p>
                  <span className="badge bg-secondary">{r.category}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AnalyzePage;

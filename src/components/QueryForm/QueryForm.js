import React, { useState } from 'react';
import { queryPatients } from '../../services/dbService';
import { Database, Play, Code, Table, ChevronRight, SearchCode } from 'lucide-react';

// Query Example Component
const QueryExample = ({ query, description, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="flex items-center text-xs text-[#334EAC] hover:text-[#081F5C] bg-[#D0E3FF]/40 hover:bg-[#D0E3FF]/60 px-2 py-1 rounded-md transition-colors duration-200"
  >
    <ChevronRight size={14} className="mr-1" /> {description}
  </button>
);

// Query Results Component
const QueryResults = ({ results }) => {
  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center text-[#7096D1]">
        <Database size={32} className="mb-2 opacity-50" />
        <p className="text-sm">No results to display</p>
        <p className="text-xs mt-1 max-w-xs">
          Execute a query to see patient data
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto max-h-64 overflow-y-auto">
      <pre className="p-4 font-mono text-sm text-[#081F5C]">
        {JSON.stringify(results, null, 2)}
      </pre>
    </div>
  );
};

// Main Query Form Component
const QueryForm = ({ onQueryExecuted }) => {
  const [sql, setSql] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await queryPatients(sql);
      setResults(data);

      // Call the callback function to refresh the patient data
      if (onQueryExecuted) {
        onQueryExecuted();
      }
    } catch (err) {
      setError(err.message || 'Error executing query');
    } finally {
      setLoading(false);
    }
  };

  const queryExamples = [
    { query: "SELECT * FROM patients WHERE age > 60", description: "Senior patients" },
    { query: "SELECT * FROM patients ORDER BY name ASC", description: "Sort by name" },
    { query: "SELECT gender, COUNT(*) as count FROM patients GROUP BY gender", description: "Count by gender" },
  ];

  return (
    <div className="bg-gradient-to-br from-[#D0E3FF]/30 to-[#BAD6EB]/30 p-6 rounded-xl border border-[#BAD6EB]/30">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <SearchCode size={18} className="text-[#334EAC]" />
            <h2 className="text-lg font-medium text-[#081F5C]">SQL Query</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <div className="absolute top-0 right-0 bg-[#334EAC]/10 text-[#334EAC] px-2 py-1 text-xs font-medium rounded-tr-md rounded-bl-md">
                <Code size={14} className="inline-block mr-1" /> SQL
              </div>

              <textarea
                value={sql}
                onChange={(e) => setSql(e.target.value)}
                placeholder="SELECT * FROM patients WHERE age > 60"
                required
                rows={5}
                className="mt-1 block w-full px-3 py-2 bg-white/90 border border-[#BAD6EB]/40 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#334EAC]/30 focus:border-[#334EAC] font-mono text-sm transition-all duration-200"
              />
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {queryExamples.map((example, index) => (
                <QueryExample
                  key={index}
                  query={example.query}
                  description={example.description}
                  onClick={() => setSql(example.query)}
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={loading || !sql.trim()}
              className={`w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white
                ${loading || !sql.trim()
                  ? 'bg-[#7096D1]/50 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#334EAC] to-[#7096D1] hover:from-[#2A3F8D] hover:to-[#5C7AB0]'}
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#334EAC] transition-all duration-200`}
            >
              {loading ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  Executing...
                </>
              ) : (
                <>
                  <Play size={16} fill="white" />
                  Execute Query
                </>
              )}
            </button>
          </form>

          {error && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md">
              {error}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Table size={18} className="text-[#334EAC]" />
              <h2 className="text-lg font-medium text-[#081F5C]">Query Results</h2>
            </div>
            {results.length > 0 && (
              <div className="text-xs text-[#7096D1] bg-[#D0E3FF]/40 px-2 py-1 rounded-md">
                {results.length} record(s)
              </div>
            )}
          </div>

          <div className="bg-white/80 border border-[#BAD6EB]/40 rounded-md overflow-hidden shadow-sm">
            <QueryResults results={results} />
          </div>

          <div className="mt-3 text-xs text-[#7096D1] italic">
            Tip: Use SQL queries to filter and analyze patient data
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueryForm;

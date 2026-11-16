import React from 'react';

export default function MessageCard({ msg, onAnalyze, isAnalyzing }) {
  const priorityColors = {
    High: 'bg-red-100 text-red-700 border-red-200',
    Medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    Low: 'bg-green-100 text-green-700 border-green-200',
  };

  return (
    <div className={`p-4 border rounded-lg transition-all ${msg.is_analyzed ? 'bg-white shadow-sm' : 'border-blue-300 bg-blue-50'}`}>
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-semibold text-gray-800 text-lg">{msg.subject || "(No Subject)"}</h3>
          <p className="text-sm text-gray-500">From: {msg.sender_name} &lt;{msg.sender_email}&gt;</p>
        </div>
        
        {msg.is_analyzed ? (
          <span className={`px-3 py-1 text-xs font-bold rounded-full border ${priorityColors[msg.ai_priority] || 'bg-gray-100'}`}>
            {msg.ai_priority} Priority
          </span>
        ) : (
          <button 
            onClick={() => onAnalyze(msg.id)}
            disabled={isAnalyzing}
            className="flex items-center justify-center bg-indigo-600 text-white text-sm px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed transition-colors min-w-[140px]"
          >
            {isAnalyzing ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing...
              </>
            ) : (
              "✨ Analyze with AI"
            )}
          </button>
        )}
      </div>
      
      <p className="text-sm text-gray-700 mb-4 line-clamp-2">{msg.content}</p>
      
      {msg.is_analyzed && (
        <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-md text-sm">
          <div className="grid grid-cols-2 gap-2 mb-3">
            <p><span className="font-semibold text-gray-700">Category:</span> {msg.ai_category}</p>
            <p><span className="font-semibold text-gray-700">Intent:</span> {msg.ai_intent}</p>
            <p><span className="font-semibold text-gray-700">Reply Needed:</span> {msg.requires_response ? "Yes" : "No"}</p>
          </div>
          <p className="mb-2"><span className="font-semibold text-gray-700">Summary:</span> {msg.ai_summary}</p>
          
          {msg.suggested_reply && (
            <div className="mt-3 p-3 bg-white border border-gray-200 rounded text-gray-600 italic">
              <span className="font-semibold text-gray-800 not-italic block mb-1">Suggested Reply:</span>
              "{msg.suggested_reply}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
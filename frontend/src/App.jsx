import { useState, useEffect, useRef } from 'react';
import MessageCard from './components/MessageCard';
import TaskCard from './components/TaskCard';

function App() {
  const [messages, setMessages] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analyzingId, setAnalyzingId] = useState(null);
  
  // SEARCH AND FILTER
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPriority, setFilterPriority] = useState("All");

  const fileInputRef = useRef(null);
  const API_URL = "http://127.0.0.1:8000/api";

  const fetchData = async () => {
    try {
      const [msgRes, taskRes] = await Promise.all([
        fetch(`${API_URL}/messages?t=${Date.now()}`, { cache: "no-store" }),
        fetch(`${API_URL}/tasks?t=${Date.now()}`, { cache: "no-store" })
      ]);
      if (msgRes.ok && taskRes.ok) {
        setMessages(await msgRes.json());
        setTasks(await taskRes.json());
      }
    } catch (error) { console.error(error); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a JSON file first.");
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${API_URL}/import-json`, { method: "POST", body: formData });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        await fetchData();
        setFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else { alert("Import Error: " + data.detail); }
    } catch (error) { alert("Upload failed."); }
    setLoading(false);
  };

  const handleAnalyze = async (messageId) => {
    setAnalyzingId(messageId);
    try {
      const response = await fetch(`${API_URL}/analyze/${messageId}`, { method: "POST" });
      if (response.ok) { window.location.reload(); } 
      else { alert("AI Analysis failed."); setAnalyzingId(null); }
    } catch (error) { alert("Network error."); setAnalyzingId(null); }
  };

  const handleTaskUpdate = async (taskId, updates) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${taskId}`, { 
        method: "PATCH", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates)
      });
      if (response.ok) { window.location.reload(); } 
    } catch (error) { console.error(error); }
  };

  // BONUS: CSV Export
  const exportToCSV = () => {
    const headers = ["Task ID", "Title", "Description", "Priority", "Status", "Due Date"];
    const csvRows = tasks.map(t => 
      [t.id, `"${t.title}"`, `"${t.description}"`, t.priority, t.status, t.due_date || "N/A"].join(",")
    );
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...csvRows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "tasks_export.csv");
    document.body.appendChild(link);
    link.click();
  };

  // FILTERING LOGIC
  const filteredMessages = messages.filter(m => 
    (m.subject || "").toLowerCase().includes(searchQuery.toLowerCase()) || 
    (m.sender_name || "").toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredTasks = tasks.filter(t => 
    (t.title || "").toLowerCase().includes(searchQuery.toLowerCase()) &&
    (filterPriority === "All" || t.priority === filterPriority)
  );
  
  // DISPLAY ANALYZED COUNT
  const analyzedCount = messages.filter(m => m.is_analyzed).length;

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-indigo-600">ActionFlow AI</h1>
            <p className="text-sm text-gray-500">Intelligent Inbox & Task Management</p>
          </div>
          
          <form onSubmit={handleFileUpload} className="flex gap-3 items-center">
            <input type="file" accept=".json" ref={fileInputRef} onChange={(e) => setFile(e.target.files[0])} className="text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer" />
            <button type="submit" disabled={loading || !file} className="bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50 text-sm shadow-sm">
              {loading ? "Importing..." : "Import JSON"}
            </button>
          </form>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* SEARCH AND FILTER BAR */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <input type="text" placeholder="Search messages or tasks..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:ring-indigo-500" />
          <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)} className="border border-gray-300 rounded-md px-4 py-2 bg-gray-50 focus:ring-indigo-500">
            <option value="All">All Priorities</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
          <button onClick={exportToCSV} className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">Export CSV</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <section className="flex flex-col h-[calc(100vh-14rem)]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Inbox</h2>
              <div className="flex gap-2">
                {/* ANALYZED MESSAGES COUNT */}
                <span className="bg-blue-100 text-blue-700 py-1 px-3 rounded-full text-xs font-bold">{analyzedCount} Analyzed</span>
                <span className="bg-gray-200 text-gray-700 py-1 px-3 rounded-full text-xs font-bold">{messages.length} Total</span>
              </div>
            </div>
            <div className="space-y-4 overflow-y-auto pr-2 flex-1">
              {filteredMessages.map((msg) => (
                <MessageCard key={msg.id} msg={msg} onAnalyze={handleAnalyze} isAnalyzing={analyzingId === msg.id} />
              ))}
            </div>
          </section>

          <section className="flex flex-col h-[calc(100vh-14rem)]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Actionable Tasks</h2>
              <span className="bg-gray-200 text-gray-700 py-1 px-3 rounded-full text-xs font-bold">{filteredTasks.length} Tasks</span>
            </div>
            <div className="space-y-4 overflow-y-auto pr-2 flex-1">
              {filteredTasks.map((task) => (
                <TaskCard key={task.id} task={task} onUpdate={handleTaskUpdate} />
              ))}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}

export default App;
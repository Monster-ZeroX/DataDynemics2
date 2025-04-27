import { useRef, useState } from "react";
import SearchBar from "@/components/SearchBar";
import Dashboard from "@/components/Dashboard";
import StudentDetail from "@/components/StudentDetail";
import { Student } from "@/lib/types";

const Home = () => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const handleSelectStudent = (student: Student) => {
    setSelectedStudent(student);
  };

  const handleCloseDetail = () => {
    setSelectedStudent(null);
  };

  const handleFocusSearch = () => {
    // Find the search input using its ID
    const searchInput = document.getElementById("student-search") as HTMLInputElement;
    if (searchInput) {
      searchInput.focus();
    }
  };

  return (
    <div>
      <SearchBar onSelectStudent={handleSelectStudent} />
      
      {/* Show the dashboard or student detail */}
      {selectedStudent ? (
        <StudentDetail student={selectedStudent} onClose={handleCloseDetail} />
      ) : (
        <Dashboard onFocusSearch={handleFocusSearch} />
      )}
    </div>
  );
};

export default Home;

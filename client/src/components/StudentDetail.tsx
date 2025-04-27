import { X } from "lucide-react";
import { Student } from "@/lib/types";

interface StudentDetailProps {
  student: Student;
  onClose: () => void;
}

const StudentDetail = ({ student, onClose }: StudentDetailProps) => {
  if (!student) return null;

  // Function to determine CSS class based on grade
  const getGradeClass = (grade: string) => {
    switch (grade) {
      case 'A':
        return 'bg-green-100 text-green-800';
      case 'B':
        return 'bg-blue-100 text-blue-800';
      case 'C':
        return 'bg-yellow-100 text-yellow-800';
      case 'S':
        return 'bg-orange-100 text-orange-800';
      case 'F':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="mt-8">
      <div className="bg-white shadow overflow-hidden rounded-lg">
        {/* Student Header */}
        <div className="px-4 py-5 sm:px-6 bg-primary-600 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg leading-6 font-medium">{student.Name}</h3>
              <p className="mt-1 max-w-2xl text-sm">Index Number: {student["Index Number"]}</p>
            </div>
            <button
              className="text-white hover:text-primary-100 p-1 rounded-full"
              onClick={onClose}
              aria-label="Close student details"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Student Information */}
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">NIC Number</dt>
              <dd className="mt-1 text-sm text-gray-900">{student["NIC Number"]}</dd>
            </div>

            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Z-Score</dt>
              <dd className="mt-1 text-sm text-gray-900 font-semibold">{student["Z-Score"]}</dd>
            </div>

            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">District Rank</dt>
              <dd className="mt-1 text-sm text-gray-900">{student["District Rank"]}</dd>
            </div>

            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Island Rank</dt>
              <dd className="mt-1 text-sm text-gray-900">{student["Island Rank"]}</dd>
            </div>
          </dl>
        </div>

        {/* Subjects and Grades */}
        <div className="border-t border-gray-200">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Subject Results</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Subject
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Grade
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Object.entries(student.Subjects).map(([subject, grade]) => (
                  <tr key={subject}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{subject}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-sm rounded-full ${getGradeClass(grade)}`}>
                        {grade}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;

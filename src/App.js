// src/App.js
import React, { useEffect, useState, useCallback } from "react";
import { initDb, getPatients, addPatient } from "./services/dbService";
import PatientForm from "./components/PatientForm/PatientForm";
import PatientList from "./components/PatientList/PatientList";
import QueryForm from "./components/QueryForm/QueryForm";
import ExcelUpload from "./components/ExcelUpload/ExcelUpload";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Users, Search, Plus, Upload } from "lucide-react";

// Section Component
const Section = ({ id, title, children, span = "md:col-span-1" }) => {
  const icons = {
    register: <Plus size={20} className="text-[#334EAC]" />,
    patients: <Users size={20} className="text-[#334EAC]" />,
    query: <Search size={20} className="text-[#334EAC]" />,
  };

  return (
    <section
      id={id}
      className={`${span} relative overflow-hidden bg-white p-6 rounded-lg shadow-sm border border-[#BAD6EB]/20`}
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-5 pb-2 border-b border-[#BAD6EB]/20">
          <div className="flex items-center gap-2">
            {icons[id]}
            <h2 className="text-lg font-medium text-[#081F5C]">{title}</h2>
          </div>
          {id === "patients" && children.patientCount}
        </div>
        {id === "patients" ? children.content : children}
      </div>
    </section>
  );
};

// Navigation Items
const navItems = [
  { id: "register", label: "Register", icon: Plus },
  { id: "patients", label: "Patients", icon: Users },
  { id: "query", label: "Query", icon: Search },
];

// Navigation Component
const Navigation = () => (
  <nav className="mt-4 md:mt-0">
    <ul className="flex flex-wrap gap-4">
      {navItems.map((item) => {
        const IconComponent = item.icon;
        return (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-white/40 hover:bg-white/60 border border-[#BAD6EB]/30 transition-all duration-200 text-[#081F5C] hover:text-[#334EAC] font-medium text-sm"
            >
              <IconComponent size={16} />
              {item.label}
            </a>
          </li>
        );
      })}
    </ul>
  </nav>
);

// Main App Component
const App = () => {
  const [patients, setPatients] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      await initDb();
      const data = await getPatients();
      setPatients(data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAddPatient = useCallback(async (patient) => {
    try {
      await addPatient(patient);
      await fetchData();
    } catch (error) {
      console.error("Error adding patient:", error);
    }
  }, [fetchData]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#D0E3FF] via-[#F7F2EB] to-[#BAD6EB]"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7096D1]/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#BAD6EB]/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-[#334EAC]/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="relative z-10">
        <Header />

        {/* Main Content */}
        <main className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Section id="register" title="Register New Patient">
              <div className="space-y-4">
                <PatientForm onAddPatient={handleAddPatient} />
              </div>

              <div className="mt-6 pt-4 border-t border-[#BAD6EB]/20">
                <div className="flex items-center gap-2 mb-3">
                  <Upload size={16} className="text-[#334EAC]" />
                  <h3 className="text-sm font-medium text-[#081F5C]">
                    Bulk Upload via Excel
                  </h3>
                </div>
                <div className="bg-[#FFFFFF] p-4 rounded-md border border-[#BAD6EB]/20">
                  <ExcelUpload onPatientsAdded={fetchData} />
                </div>
              </div>
            </Section>

            <Section id="patients" title="Patient List" span="md:col-span-2">
              {{
                patientCount: (
                  <div className="w-48 bg-gradient-to-r from-[#334EAC] to-[#7096D1] p-4 rounded-xl text-white shadow-lg flex items-center gap-4">
                    <Users size={24} className="text-[#D0E3FF]" />
                    <div>
                      <p className="text-[#BAD6EB] text-sm">Total Patients</p>
                      <p className="text-xl font-bold">{patients.length}</p>
                    </div>
                  </div>
                ),

                content: (
                  <div className="bg-gradient-to-br from-[#D0E3FF]/30 to-[#BAD6EB]/30 p-4 rounded-2xl">
                    <PatientList patients={patients} />
                  </div>
                ),
              }}
            </Section>

            <Section
              id="query"
              title="Search / Query Patients"
              span="md:col-span-3"
            >
              <div className="bg-gradient-to-br from-[#D0E3FF]/30 to-[#7096D1]/30 p-4 rounded-2xl">
                <QueryForm onQueryExecuted={fetchData} />
              </div>
            </Section>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default App;

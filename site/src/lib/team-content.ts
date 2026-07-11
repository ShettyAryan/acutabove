export type TeamMember = {
  id: string;
  name: string;
  designation: string;
  image: string | null;
};

export type TeamTab = "leadership" | "surgery" | "cut-above";

export const TEAM_HERO = {
  eyebrow: "The People",
  title: "Meet the Team",
  subtitle:
    "Faculty mentors and academic leaders who guide the craft of surgery at KMC Mangalore — and the student society that carries it forward.",
};

export const TEAM_TABS: { id: TeamTab; label: string }[] = [
  { id: "leadership", label: "Leadership" },
  { id: "surgery", label: "Department of Surgery" },
  { id: "cut-above", label: "A Cut Above Team" },
];

export const LEADERSHIP: TeamMember[] = [
  {
    id: "dean",
    name: "Dr. B Unnikrishnan",
    designation: "Dean",
    image: "/images/dean1.jpg",
  },
  {
    id: "associate-dean",
    name: "Dr. Sheetal Dinkar Ullal",
    designation: "Associate Dean",
    image: "/images/associatedean.jpg",
  },
  {
    id: "associate-dean-2",
    name: "Dr. Ashfaque Mohammed",
    designation: "Associate Dean",
    image: "/images/associatedean2.jpg",
  },
  {
    id: "associate-dean-3",
    name: "Dr. Mangala M Pai",
    designation: "Associate Dean",
    image: "/images/associatedean3.jpg",
  },
  {
    id: "medical-superintendent",
    name: "Dr. Chakrapani M",
    designation: "Medical Superintendent",
    image: "/images/medicalsuperintendent.jpg",
  },
];

export const DEPARTMENT_OF_SURGERY: TeamMember[] = [
  // HOD
  {
    id: "unit-head",
    name: "Dr. Yogesh Kumar",
    designation: "Professor and Unit Head",
    image: "/images/ProfessorandUnithead.jpg",
  },
  // Professors
  {
    id: "prof-1",
    name: "Dr. B K Shivprasad Rai",
    designation: "Professor",
    image: "/images/Professor.jpg",
  },
  {
    id: "prof-2",
    name: "Dr. Harish Rao K",
    designation: "Professor",
    image: "/images/Professor2.jpg",
  },
  {
    id: "prof-3",
    name: "Dr. K Jayarama Shenoy",
    designation: "Professor",
    image: "/images/Professor3.jpg",
  },
  {
    id: "prof-4",
    name: "Dr. M Shrirama Bhat",
    designation: "Professor",
    image: "/images/Professor4.jpg",
  },
  {
    id: "prof-5",
    name: "Dr. Manohar V Pai",
    designation: "Professor",
    image: "/images/Professor5.jpg",
  },
  {
    id: "addl-prof",
    name: "Dr. Poorna Chandra Thejeswi D S",
    designation: "Additional Professor",
    image: null,
  },
  {
    id: "prof-rahul",
    name: "Dr. Rahul R Bhat",
    designation: "Professor",
    image: null,
  },
  {
    id: "prof-6",
    name: "Dr. Sunil Kumar Shetty",
    designation: "Professor",
    image: "/images/Professor6.jpg",
  },
  {
    id: "prof-suresh",
    name: "Dr. Suresh Pai M",
    designation: "Professor",
    image: null,
  },
  // Assistant Professors
  {
    id: "asst-1",
    name: "Dr. Archana C S",
    designation: "Assistant Professor",
    image: "/images/assistantprofessor.jpg",
  },
  {
    id: "asst-2",
    name: "Dr. Christopher Sam Thomas",
    designation: "Assistant Professor",
    image: "/images/assistantprofessor2.jpg",
  },
  {
    id: "asst-3",
    name: "Dr. Dishitha Shetty",
    designation: "Assistant Professor",
    image: "/images/assistantprofessor3.jpg",
  },
  {
    id: "asst-4",
    name: "Dr. Iresh Shetty",
    designation: "Assistant Professor",
    image: "/images/assistantprofessor4.jpg",
  },
  {
    id: "asst-6",
    name: "Dr. Madhava Shenoy",
    designation: "Assistant Professor",
    image: "/images/assistantprofessor6.jpg",
  },
  {
    id: "asst-7",
    name: "Dr. Sadhan G",
    designation: "Assistant Professor",
    image: "/images/assistantprofessor7.jpg",
  },
  {
    id: "asst-8",
    name: "Dr. Shrikiran K",
    designation: "Assistant Professor",
    image: "/images/assistantprofessor8.jpg",
  },
  {
    id: "asst-9",
    name: "Dr. Veeramachaneni Shanmukha Seshendra",
    designation: "Assistant Professor",
    image: "/images/assistantprofessor9.jpg",
  },
  {
    id: "asst-10",
    name: "Dr. Venkat Tarun Dungigalla",
    designation: "Assistant Professor",
    image: "/images/assistantprofessor10.jpg",
  },
  // Associate Professors
  {
    id: "assoc-1",
    name: "Dr. Ahris V F",
    designation: "Associate Professor",
    image: "/images/associateprofessor.jpg",
  },
  {
    id: "assoc-madhav",
    name: "Dr. Madhav Kamath M",
    designation: "Associate Professor",
    image: "/images/associateprofessor05.jpg",
  },
  {
    id: "assoc-2",
    name: "Dr. Rohan",
    designation: "Associate Professor",
    image: "/images/associateprofessor2.jpg",
  },
  {
    id: "assoc-3",
    name: "Dr. Rupa Merlyn Mascarenhas",
    designation: "Associate Professor",
    image: "/images/associateprofessor3.jpg",
  },
  {
    id: "assoc-4",
    name: "Dr. Shibumon MM",
    designation: "Associate Professor",
    image: "/images/associateprofessor4.jpg",
  },
  {
    id: "assoc-shri",
    name: "Dr. Shri Krishna Prasad Shetty",
    designation: "Associate Professor",
    image: "/images/associateprofessor7.jpg",
  },
  {
    id: "assoc-6",
    name: "Dr. Suraj Pai M",
    designation: "Associate Professor",
    image: "/images/associateprofessor6.jpg",
  },
  // Senior Residents
  {
    id: "sr-1",
    name: "Dr. Abhishek Balaji R",
    designation: "Senior Resident",
    image: "/images/seniorresident.jpg",
  },
  {
    id: "sr-2",
    name: "Dr. Akshit Srivastav",
    designation: "Senior Resident",
    image: "/images/seniorresident2.jpg",
  },
  {
    id: "sr-3",
    name: "Dr. Bandi Chandrakanth Reddy",
    designation: "Senior Resident",
    image: "/images/seniorresident3.jpg",
  },
  {
    id: "sr-4",
    name: "Dr. Devesvar M V",
    designation: "Senior Resident",
    image: "/images/seniorresident4.jpg",
  },
  {
    id: "sr-5",
    name: "Dr. Govardhan G M",
    designation: "Senior Resident",
    image: "/images/seniorresident5.jpg",
  },
  {
    id: "sr-6",
    name: "Dr. Mahima Kodgi",
    designation: "Senior Resident",
    image: "/images/seniorresident6.jpg",
  },
  {
    id: "sr-7",
    name: "Dr. N Ganesh Nandan Verma",
    designation: "Senior Resident",
    image: "/images/seniorresident7.jpg",
  },
  {
    id: "sr-8",
    name: "Dr. Noel Rayen",
    designation: "Senior Resident",
    image: "/images/seniorresident8.jpg",
  },
  {
    id: "sr-9",
    name: "Dr. Sindhu M",
    designation: "Senior Resident",
    image: "/images/seniorresident9.jpg",
  },
  {
    id: "sr-10",
    name: "Dr. Vishwas H M",
    designation: "Senior Resident",
    image: "/images/seniorresident10.jpg",
  },
];

export const CUT_ABOVE_TEAM: TeamMember[] = [
  {
    id: "vp",
    name: "Tarunika Iyer",
    designation: "Vice President",
    image: "/images/vicepresident.jpeg",
  },
  {
    id: "treasurer",
    name: "Vivek Kesharwani",
    designation: "Treasurer",
    image: "/images/treasurer.jpeg",
  },
  {
    id: "gen-sec",
    name: "Samyuktha Alva",
    designation: "General Secretary",
    image: "/images/generalsecretary1.jpeg",
  },
  {
    id: "media-head",
    name: "Uma Murali",
    designation: "Media Head",
    image: "/images/mediahead.jpeg",
  },
];

export function getTeamMembers(tab: TeamTab): TeamMember[] {
  switch (tab) {
    case "leadership":
      return LEADERSHIP;
    case "surgery":
      return DEPARTMENT_OF_SURGERY;
    case "cut-above":
      return CUT_ABOVE_TEAM;
  }
}
